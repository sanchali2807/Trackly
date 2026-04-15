const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const List = sequelize.define("List", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
    tableName: "Lists",       // ✅ FIXED
    freezeTableName: true,    // ✅ prevents pluralization
  });

module.exports = List;