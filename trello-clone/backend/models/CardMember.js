const sequelize = require("../config/db");

const CardMember = sequelize.define("CardMember", {},{
     tableName: "cardMembers",   // ✅ exact DB table name
  freezeTableName: true  
},
{
    tableName: "CardMembers",       // ✅ FIXED
    freezeTableName: true,    // ✅ prevents pluralization
  })

module.exports = CardMember;