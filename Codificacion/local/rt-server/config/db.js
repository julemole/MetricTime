require("dotenv").config();

module.exports = function setConfigDB(extraConfig) {
  const config = {
    database: process.env.DB_NAME || "metrictime",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    setup: false,
    ...extraConfig,
  };
  return config;
};
