const { List } = require("../models");

exports.createList = async (req, res) => {
  const { title, boardId, position } = req.body;
  const list = await List.create({ title, boardId, position });
  res.json(list);
};

exports.updateList = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  await List.update({ title }, { where: { id } });
  res.json({ message: "Updated" });
};

exports.deleteList = async (req, res) => {
  const { id } = req.params;
  await List.destroy({ where: { id } });
  res.json({ message: "Deleted" });
};

exports.reorderLists = async (req, res) => {
  try {
    const { lists, boardId } = req.body;

    if (!lists || !Array.isArray(lists)) {
      return res.status(400).json({ message: "Invalid lists array" });
    }

    const updates = lists.map((list, index) => {
      return List.update(
        { position: index },
        {
          where: {
            id: list.id,
            boardId: boardId   // VERY IMPORTANT
          }
        }
      );
    });

    await Promise.all(updates);

    res.json({ message: "Lists reordered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error reordering lists" });
  }
};