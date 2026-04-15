const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ChecklistItem = sequelize.define("ChecklistItem", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},
  {
    tableName: "CheckListItems",       // ✅ FIXED
    freezeTableName: true,    // ✅ prevents pluralization
  }
);

module.exports = ChecklistItem;