const { ChecklistItem, Card } = require("../models");

exports.addItem = async (req, res) => {
  try {
    const { cardId, text } = req.body;

    console.log("BODY:", req.body);
    console.log("TYPES:", typeof cardId, typeof text);

    // 🔥 ADD THIS CHECK
    const card = await Card.findByPk(cardId);
    console.log("CARD FOUND:", card);

    if (!cardId || !text) {
      return res.status(400).json({ error: "cardId and text required" });
    }

    if (!card) {
      return res.status(400).json({ error: "Card does not exist in DB" });
    }

    const item = await ChecklistItem.create({ cardId, text });

    res.json(item);
  } catch (error) {
    console.error("CHECKLIST ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
exports.toggleItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ChecklistItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.completed = !item.completed;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ChecklistItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    await item.destroy();

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};