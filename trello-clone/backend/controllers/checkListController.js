const { ChecklistItem } = require("../models");

exports.addItem = async (req, res) => {
  const { cardId, text } = req.body;
  const item = await ChecklistItem.create({ cardId, text });
  res.json(item);
};

exports.toggleItem = async (req, res) => {
  const { id } = req.params;

  const item = await ChecklistItem.findByPk(id);
  item.completed = !item.completed;
  await item.save();

  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  await ChecklistItem.destroy({ where: { id } });
  res.json({ message: "Deleted" });
};