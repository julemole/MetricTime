const Sequelize = require("sequelize");
const Model = require("../models/Model");
const setupAgent = require("../db/Agent");
const setupUser = require("../db/User");
const setupMetric = require("../db/Metric");
class Database {
  constructor(config) {
    this.config = config;
    this.db = null;
  }
  connect() {
    if (!this.db) {
      this.db = new Sequelize(this.config);
    }
  }
  async initialize() {
    this.connect();
    const models = this.setupModels();
    await this.db.authenticate();
    if (this.config.setup) {
      await this.db.sync({ force: true });
    }
    const actions = this.setActions(models);
    return actions;
  }
  setupModels() {
    this.connect();
    const Models = new Model(this.db);
    const AgentModel = Models.defineAgent();
    const MetricModel = Models.defineMetric();
    const UserModel = Models.defineUser();

    const models = this.setRelations({ AgentModel, MetricModel, UserModel });
    return models;
  }

  setRelations({ AgentModel, MetricModel, UserModel }) {
    AgentModel.hasMany(MetricModel);
    MetricModel.belongsTo(AgentModel);

    UserModel.hasOne(AgentModel);
    AgentModel.belongsTo(UserModel);

    return { AgentModel, MetricModel, UserModel };
  }

  setActions({ AgentModel, MetricModel, UserModel }) {
    const Agent = setupAgent(AgentModel);
    const User = setupUser(UserModel);
    const Metric = setupMetric(MetricModel, AgentModel);
    return {
      Agent,
      User,
      Metric,
    };
  }
}

module.exports = Database;
