const sequelize = require("../config/db");

const CardLabel = sequelize.define("CardLabel", {},
    {
    tableName: "CardLabels",       // ✅ FIXED
    freezeTableName: true,    // ✅ prevents pluralization
  }
);

module.exports = CardLabel;