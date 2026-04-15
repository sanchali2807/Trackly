const sequelize = require("../config/db");

const CardMember = sequelize.define("CardMember", {},
{
    tableName: "CardMembers",       // ✅ FIXED
    freezeTableName: true,    // ✅ prevents pluralization
  })

module.exports = CardMember;