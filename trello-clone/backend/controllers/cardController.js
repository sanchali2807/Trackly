const { Card, ChecklistItem, Member, Label, List } = require("../models"); // ✅ add List
const { Op } = require("sequelize");
exports.createCard = async (req, res) => {
  try {
    let { title, listId, position } = req.body;

    // 🔒 VALIDATION
    if (!title || listId === undefined) {
      return res.status(400).json({ message: "title and listId are required" });
    }

    // 🔢 TYPE SAFETY
    listId = Number(listId);
    position = position !== undefined ? Number(position) : 0;

    // ✅ 👉 ADD THIS BLOCK HERE (IMPORTANT)
    const list = await List.findByPk(listId);
    if (!list) {
      return res.status(404).json({ message: "List does not exist" });
    }

    // ✅ NOW SAFE TO CREATE
    const card = await Card.create({ title, listId, position });

    res.status(201).json(card);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE CARD
exports.updateCard = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { title, description, dueDate, completed } = req.body;

    const card = await Card.findByPk(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // ✅ allow updating ANY field independently
    const updatedData = {};

    if (title !== undefined) updatedData.title = title;
    if (description !== undefined) updatedData.description = description;
    if (dueDate !== undefined) updatedData.dueDate = dueDate;
    if (completed !== undefined) updatedData.completed = completed;

    await card.update(updatedData);

    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// ✅ DELETE CARD
exports.deleteCard = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const card = await Card.findByPk(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    await card.destroy();

    res.json({ message: "Card Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// ✅ MOVE CARD (FULLY FIXED)
exports.moveCard = async (req, res) => {
  try {
    let { cardId, sourceListId, destinationListId, newPosition } = req.body;

    // 🔒 VALIDATION
    if (
      cardId === undefined ||
      sourceListId === undefined ||
      destinationListId === undefined ||
      newPosition === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔢 TYPE SAFETY
    cardId = Number(cardId);
    sourceListId = Number(sourceListId);
    destinationListId = Number(destinationListId);
    newPosition = Number(newPosition);

    // 🔍 CHECK CARD EXISTS
    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // 🔍 CHECK LISTS EXIST
    // 🔍 CHECK LISTS EXIST (CORRECT WAY)
const sourceList = await List.findByPk(sourceListId);
if (!sourceList) {
  return res.status(404).json({ message: "Source list does not exist" });
}

const destinationList = await List.findByPk(destinationListId);
if (!destinationList) {
  return res.status(404).json({ message: "Destination list does not exist" });
}
    const oldPosition = card.position;

    // 🚫 NO-OP CHECK (VERY IMPORTANT)
if (
  card.listId === destinationListId &&
  oldPosition === newPosition
) {
  return res.status(400).json({
    message: "Card is already at the given position in this list",
  });
}
    // 🔁 SAME LIST REORDER
    if (sourceListId === destinationListId) {
      if (newPosition > oldPosition) {
        await Card.increment(
          { position: -1 },
          {
            where: {
              listId: sourceListId,
              position: { [Op.gt]: oldPosition, [Op.lte]: newPosition },
            },
          }
        );
      } else {
        await Card.increment(
          { position: 1 },
          {
            where: {
              listId: sourceListId,
              position: { [Op.gte]: newPosition, [Op.lt]: oldPosition },
            },
          }
        );
      }
    } else {
      // 🔄 MOVE BETWEEN LISTS

      // decrease positions in source list
      await Card.increment(
        { position: -1 },
        {
          where: {
            listId: sourceListId,
            position: { [Op.gt]: oldPosition },
          },
        }
      );

      // increase positions in destination list
      await Card.increment(
        { position: 1 },
        {
          where: {
            listId: destinationListId,
            position: { [Op.gte]: newPosition },
          },
        }
      );
    }

    // 🔄 UPDATE CARD
    await card.update({
      listId: destinationListId,
      position: newPosition,
    });

    res.json({ message: "Card moved successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// ✅ GET CARD DETAILS
exports.getCardDetails = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const card = await Card.findByPk(id, {
      include: [ChecklistItem, Member, Label],
    });

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// ✅ ADD MEMBER
exports.addMemberToCard = async (req, res) => {
  try {
    let { cardId, memberId } = req.body;

    if (!cardId || !memberId) {
      return res.status(400).json({ message: "cardId and memberId required" });
    }

    cardId = Number(cardId);
    memberId = Number(memberId);

    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    await card.addMember(memberId);

    res.json({ message: "Member added" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// ✅ REMOVE MEMBER
exports.removeMemberFromCard = async (req, res) => {
  try {
    let { cardId, memberId } = req.body;

    if (!cardId || !memberId) {
      return res.status(400).json({ message: "cardId and memberId required" });
    }

    cardId = Number(cardId);
    memberId = Number(memberId);

    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    await card.removeMember(memberId);

    res.json({ message: "Member removed" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


exports.addLabelToCard = async (req, res) => {
  try {
    const { cardId, labelId } = req.params;

    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    const label = await Label.findByPk(labelId);
    if (!label) {
      return res.status(404).json({ error: "Label not found" });
    }

    // 🔗 Attach label
    await card.addLabel(label);

    res.json({ message: "Label added to card" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.removeLabelFromCard = async (req, res) => {
  try {
    const { cardId, labelId } = req.params;

    const card = await Card.findByPk(cardId);
    const label = await Label.findByPk(labelId);

    if (!card || !label) {
      return res.status(404).json({ error: "Card or Label not found" });
    }

    await card.removeLabel(label);

    res.json({ message: "Label removed from card" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};