const { DataTypes } = require("sequelize");

module.exports = {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
  },
  agentId: {
    allowNull: false,
    field: "agent_id",
    references: {
      model: "agents",
    },
    type: DataTypes.INTEGER,
  },
};
