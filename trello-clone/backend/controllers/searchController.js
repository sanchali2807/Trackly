const { Card, Label, Member } = require("../models");
const { Op } = require("sequelize");

exports.searchCards = async (req, res) => {
  const { query } = req.query;

  const cards = await Card.findAll({
    where: {
      title: {
        [Op.like]: `%${query}%`,
      },
    },
    include: [Label, Member],
  });

  res.json(cards);
};