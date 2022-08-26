const { Board, Led, Thermometer, Sensor } = require("johnny-five");
const Agent = require("./agent-connection");

// Configuracion Agente
const agent = new Agent({
  name: "Nombre del Agente",
  username: "Nombre del usuario",
  interval: 1000, // tiempo en milisegundos de ciclo de metricas
  token: "token de usuario",
});

let myBoard, myLed;

myBoard = new Board();

myBoard.on("ready", function () {
  // Valores metricas
  let temp = 0; // metrica temperatura
  let ir = 0; //  metrica infrarrojo
  let poten = 0; // metrica potenciometro

  // Especificar pines de acceso
  const sensorTemperature = new Thermometer({
    controller: "LM35",
    pin: "A0",
  });
  const sensorIr = new Sensor("A1");
  const potentiometer = new Sensor("A2");

  // Añadir metricas al agente , ("nombre" , funcion proceso)
  agent.addMetric("temperatura", function () {
    // Devolver temperatura
    return temp;
  });

  agent.addMetric("proximidad", function () {
    // Devolver temperatura
    return ir;
  });

  agent.addMetric("potenciometro 2k", function () {
    // Devolver Potenciometro
    return poten;
  });

  // Detectar cambios de sensores o dispositivos
  sensorTemperature.on("change", function () {
    temp = this.celsius;
  });

  sensorIr.on("change", function () {
    // con this.value se obtiene el valor actual de la metrica al cambiar
    ir = this.value;
  });

  potentiometer.on("change", function () {
    if (!this.value) {
      poten = 0;
      return;
    }
    poten = this.value;
  });

  // conectar agente
  agent.connect();
});

// Si ocurre un error , detectarlo
myBoard.on("error", function (error) {
  console.log(error);
});
