module.exports = function setupAgent(AgentModel) {
  async function createOrUpdate(agent) {
    const cond = {
      where: {
        uuid: agent.uuid,
      },
    };

    const existAgent = await AgentModel.findOne(cond);

    if (existAgent) {
      const updated = await AgentModel.update(agent, cond);
      return updated ? AgentModel.findOne(cond) : existAgent;
    }

    const result = await AgentModel.create(agent);
    return result.toJSON();
  }

  return {
    createOrUpdate,
  };
};
