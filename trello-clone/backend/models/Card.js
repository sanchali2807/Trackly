const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Card = sequelize.define("Card", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
  },
  completed :{
    type : DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull:true
  }
});

module.exports = Card;