const db = require("./db/Database");
const mosca = require("mosca");
const configDB = require("./config/db");
const parsePayload = require("./utils/parsePayload");
const configMqtt = require("./config/mqtt");
class MQTTServer {
  constructor(settings) {
    this.server = mosca.Server(settings);
    this.clients = new Map();
    this.entities = {};
    this.initializeEvents();
  }

  initializeEvents() {
    this.readyServer();
    this.connectClient();
    this.publishMessage();
    this.disconnectClient();
    this.handleErrors();
  }

  connectClient = () => {
    this.server.on("clientConnected", (client) => {
      console.log(`Client connected ${client.id}`);
      this.clients.set(client.id, null);
    });
  };

  disconnectClient = () => {
    this.server.on("clientDisconnected", async (client) => {
      const agent = this.clients.get(client.id);

      if (agent) {
        agent.connected = false;
        try {
          await this.Agent.createOrUpdate(agent);
        } catch (error) {
          return handleError(error);
        }

        this.clients.delete(client.id);

        this.server.publish({
          topic: "agent/disconnected",
          payload: JSON.stringify({
            agent: {
              uuid: agent.uuid,
            },
            token: agent.token,
          }),
        });
        console.log(
          `Client (${client.id}) associate to Agent (${agent.uuid}) marked as disconnected`
        );
      }
    });
  };

  publishMessage = () => {
    this.server.on("published", async (packet, client) => {
      switch (packet.topic) {
        case "agent/connected":
        case "agent/disconnected":
          console.log(`Payload : ${packet.payload}`);
          break;
        case "agent/message":
          console.log(`Payload : ${packet.payload}`);
          const payload = parsePayload(packet.payload);
          console.log(payload);
          if (payload) {
            payload.agent.connected = true;
            let agent;
            let user;
            try {
              user = await this.User.findByUsername(payload.agent.username);
              if (!user) {
                throw new Error("User not exist");
              }
              if (user.token !== payload.token) {
                throw new Error("invalid token");
              }
              payload.agent.userId = user.id;
              agent = await this.Agent.createOrUpdate(payload.agent);
            } catch (error) {
              return handleError(error);
            }

            if (!this.clients.get(client.id)) {
              this.clients.set(client.id, { ...agent, token: payload.token });
              this.server.publish({
                topic: "agent/connected",
                payload: JSON.stringify({
                  agent: {
                    uuid: agent.uuid,
                    name: agent.name,
                    hostname: agent.hostname,
                    pid: agent.pid,
                    connected: agent.connected,
                  },
                  token: payload.token,
                }),
              });
            }
            for (let metric of payload.metrics) {
              let met;
              try {
                met = await this.Metric.create(agent.uuid, metric);
              } catch (error) {
                return handleError(error);
              }
              console.log(`Metric ${met.id} saved on agent ${agent.uuid}`);
            }
          }
          break;
      }
    });
  };

  readyServer = () => {
    this.server.on("ready", async () => {
      let config = configDB();
      const services = await new db(config)
        .initialize()
        .catch(handleFatalError);

      this.Agent = services.Agent;
      this.Metric = services.Metric;
      this.User = services.User;
      console.log(`[rtverse-mqtt] server is running`);
    });
  };

  handleErrors = () => {
    this.server.on("error", handleFatalError);
  };
}

function handleFatalError(err) {
  console.error(`[fatal error] ${err.message}}`);
  console.error(err.stack);
  process.exit(1);
}
function handleError(err) {
  console.error(`[error] ${err.message}}`);
  console.error(err.stack);
}

process.on("uncaughtException", handleFatalError);
process.on("unhandledRejection", handleFatalError);

new MQTTServer(configMqtt);

module.exports = MQTTServer;
