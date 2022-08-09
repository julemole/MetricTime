// cargamos express e iniciamos una aplicación
const app = require("express")();
// creamos un servidor HTTP desde de nuestra aplicación de Express
// creamos una aplicación de socket.io desde nuestro servidor HTTP
const socket = require("socket.io");
// cargamos Next.js
const next = require("next");
const pipe = require("./utils/pipe");
const RtAgent = require("rt-agent");
const agent = new RtAgent();
// verificamos si estamos corriendo en desarrollo o producción
const dev = process.env.NODE_ENV !== "production";
// iniciamos nuestra aplicación de Next.js
const nextApp = next({ dev });
// obtenemos el manejador de Next.js
const nextHandler = nextApp.getRequestHandler();

// iniciamos nuestra aplicación de Next.js
nextApp.prepare().then(() => {
  // para cualquier otra ruta de la aplicación
  app.get("*", (req, res) => {
    // dejamos que el manejador de Next se encargue y responda con el HTML o un 404
    return nextHandler(req, res);
  });
  // iniciamos el servidor HTTP en el puerto 4000
  const PORT = process.env.PORT;
  server = app.listen(PORT || 4000, (err) => {
    // si ocurre un error matamos el proceso
    if (err) process.exit(0);
    // si todo está bien dejamos un log en consola
    agent.connect();
  });

  let io = socket(server);
  // cuando un usuario se conecte al servidor de sockets
  io.on("connect", (socket) => {
    console.log("socket client", socket.id);
    // guardamos el mensaje en nuestra "DB"
    pipe(agent, socket);
  });
});
