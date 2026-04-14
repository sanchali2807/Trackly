const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Label = sequelize.define("Label", {
  name: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
});

module.exports = Label;