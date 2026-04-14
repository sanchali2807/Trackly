const { Member, Label } = require("../models");

exports.getMembers = async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
};

exports.getLabels = async (req, res) => {
  const labels = await Label.findAll();
  res.json(labels);
};