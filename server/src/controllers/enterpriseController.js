const { Enterprise, validateEnterprise } = require("../models/enterprise");

exports.createEnterprise = async (req, res) => {
  const { error } = validateEnterprise(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const enterprise = new Enterprise({
    ...req.body,
    userId: req.user._id,
  });

  await enterprise.save();
  res.status(201).send(enterprise);
};

exports.getEnterprises = async (req, res) => {
  const enterprises = await Enterprise.find({ userId: req.user._id });
  res.send(enterprises);
};

exports.getEnterpriseById = async (req, res) => {
  const enterprise = await Enterprise.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!enterprise) return res.status(404).send("enterprise not found.");
  res.send(enterprise);
};

exports.updateEnterprise = async (req, res) => {
  const { error } = validateEnterprise(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const enterprise = await Enterprise.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );

  if (!enterprise) return res.status(404).send("enterprise not found.");
  res.send(enterprise);
};

exports.deleteEnterprise = async (req, res) => {
  const enterprise = await Enterprise.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!enterprise) return res.status(404).send("enterprise not found.");
  res.send({ message: "enterprise deleted successfully." });
};