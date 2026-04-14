const { Board, List, Card } = require("../models");

exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      include: [
        {
          model: List,
          include: [Card],
        },
      ],
      order: [
        [List, "position", "ASC"],
        [List, Card, "position", "ASC"],
      ],
    });

    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;

    // Basic validation
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const board = await Board.create({
      title,
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};