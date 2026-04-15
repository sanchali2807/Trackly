const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Board = sequelize.define("Board", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "My Board",
  },
},
{
    tableName: "Boards",       // ✅ FIXED
    freezeTableName: true,    // ✅ prevents pluralization
  });

module.exports = Board;