const { Card, Label, Member } = require("../models");
const { Op } = require("sequelize");

exports.searchCards = async (req, res) => {
  try {
    const { query, labelId, memberId, dueDate } = req.query;

    let whereCondition = {};
    let include = [];

    // 🔍 SEARCH (only if query exists)
    if (query && query.trim() !== "") {
      whereCondition.title = {
        [Op.like]: `%${query.trim()}%`,
      };
    }
    // 📅 FILTER BY DUE DATE
if (dueDate) {
  whereCondition.dueDate = dueDate;
}

    // 🏷️ LABEL FILTER (only if labelId exists)
    if (labelId) {
      const parsedLabelId = parseInt(labelId);
      if (isNaN(parsedLabelId)) {
        return res.status(400).json({ error: "Invalid labelId" });
      }

      include.push({
        model: Label,
        where: { id: parsedLabelId },
      });
    } else {
      include.push({
        model: Label,
        required: false, // 👈 important
      });
    }

    // 👤 MEMBER FILTER (only if memberId exists)
    if (memberId) {
      const parsedMemberId = parseInt(memberId);
      if (isNaN(parsedMemberId)) {
        return res.status(400).json({ error: "Invalid memberId" });
      }

      include.push({
        model: Member,
        where: { id: parsedMemberId },
      });
    } else {
      include.push({
        model: Member,
        required: false, // 👈 important
      });
    }

    const cards = await Card.findAll({
      where: whereCondition,
      include,
    });

    res.json(cards);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};