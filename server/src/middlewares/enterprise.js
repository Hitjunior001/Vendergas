const { Enterprise } = require("../models/enterprise");

module.exports = async (req, res, next) => {
  try {
    const enterprise = await Enterprise.findOne({
      _id: req.params.enterpriseId,
      userId: req.user._id,
    });

    if (!enterprise) return res.status(404).send("Enterprise not found.");

    req.enterprise = enterprise;
    next();
  } catch (err) {
    res.status(400).send("Invalid enterprise ID.");
  }
};