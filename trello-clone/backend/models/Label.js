const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Label = sequelize.define("Label", {
  name: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
},
{
    tableName: "Labels",       // ✅ FIXED
    freezeTableName: true,    // ✅ prevents pluralization
  });

module.exports = Label;