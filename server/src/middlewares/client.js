const { Client } = require("../models/client");

module.exports = async (req, res, next) => {
  try {
    const client = await Client.findOne({
      _id: req.params.clientId,
      enterpriseId: req.params.enterpriseId,
    });

    if (!client) return res.status(404).send("Client not found.");

    req.client = client;
    next();
  } catch (err) {
    res.status(400).send("Invalid client ID.");
  }
};