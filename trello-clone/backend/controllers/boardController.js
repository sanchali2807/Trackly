const { Board, List, Card,Member,Label,ChecklistItem } = require("../models");

exports.getBoard = async (req, res) => {
  try {
    
    // console.log(JSON.stringify(board, null, 2));
    const board = await Board.findOne({
      include: [
        {
          model: List,
          include: [
            {
              model: Card,
              include: [
                {
                  model: Member,
                  through: { attributes: [] }, // hide junction table
                },
                {
                  model: Label,
                  through: { attributes: [] },
                },
                {
                  model: ChecklistItem
                },
              ],
            },
          ],
        },
      ],
      order: [
        [List, "position", "ASC"],
        [List, Card, "position", "ASC"],
      ],
    });
console.log(JSON.stringify(board, null, 2));
    res.json(board);
  } catch (err) {
    console.log(err);
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