const Board = require("./Board");
const List = require("./List");
const Card = require("./Card");
const Member = require("./Member");
const Label = require("./Label");
const ChecklistItem = require("./ChecklistItem");
const CardMember = require("./CardMember");
const CardLabel = require("./CardLabel");

// =======================
// BOARD → LIST
// =======================
Board.hasMany(List, { foreignKey: "boardId"});
List.belongsTo(Board, { foreignKey: "boardId" });

// =======================
// LIST → CARD
// =======================
List.hasMany(Card, { foreignKey: "listId", onDelete: "CASCADE" });
Card.belongsTo(List, { foreignKey: "listId" });

// =======================
// CARD → CHECKLIST
// =======================
Card.hasMany(ChecklistItem, { foreignKey: "cardId", onDelete: "CASCADE" });
ChecklistItem.belongsTo(Card, { foreignKey: "cardId" });

// =======================
// CARD ↔ MEMBER (MANY-TO-MANY)
// =======================
Card.belongsToMany(Member, { through: CardMember, foreignKey: "cardId", otherKey:"memberId" });
Member.belongsToMany(Card, { through: CardMember, foreignKey: "memberId", otherKey: "cardId" });

// =======================
// CARD ↔ LABEL (MANY-TO-MANY)
// =======================
Card.belongsToMany(Label, { through: CardLabel, foreignKey: "cardId" });
Label.belongsToMany(Card, { through: CardLabel, foreignKey: "labelId" });

console.log(Card.associations);

module.exports = {
  Board,
  List,
  Card,
  Member,
  Label,
  ChecklistItem,
  CardMember,
  CardLabel,
};