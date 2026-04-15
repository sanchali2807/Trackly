const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Member = sequelize.define("Member", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
    tableName: "Members",       // ✅ FIXED
    freezeTableName: true,    // ✅ prevents pluralization
  });

module.exports = Member;