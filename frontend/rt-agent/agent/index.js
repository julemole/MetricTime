const RtAgent = require("../");

const agent = new RtAgent({
  name: "Robococ",
  username: "darcdev",
  interval: 3000,
  token: "dViI8dL7ixbdrx0m",
});

agent.addMetric("Distancia", function getRss() {
  return Promise.resolve(Math.random() * 4);
});

agent.addMetric("Fuerza", function getRandomPromise() {
  return Promise.resolve(Math.random() * 2);
});

agent.addMetric("Proximidad", function getRandomCallbakc(callback) {
  setTimeout(() => {
    callback(null, Math.random() * 3);
  }, 1000);
});

agent.connect();

const handler = (payload) => {
  console.log(payload);
};

// agent.on("connected", handler);
// agent.on("disconnected", handler);
// agent.on("message", handler);

// agent.on("agent/connected", handler);
// agent.on("agent/disconnected", handler);
// agent.on("agent/message", (payload) => {
//   console.log(payload);
// });

// // setTimeout(() => agent.disconnect(), 10000);
