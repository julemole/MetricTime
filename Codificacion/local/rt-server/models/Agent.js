const { DataTypes } = require("sequelize");

module.exports = {
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hostname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  connected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "updated_at",
  },
  userId: {
    allowNull: false,
    field: "user_id",
    references: {
      model: "users",
    },
    type: DataTypes.INTEGER,
  },
};
