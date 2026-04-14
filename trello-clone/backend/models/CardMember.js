const sequelize = require("../config/db");

const CardMember = sequelize.define("CardMember", {},{
     tableName: "cardMembers",   // ✅ exact DB table name
  freezeTableName: true  
})

module.exports = CardMember;