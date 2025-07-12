const { Client, validateClient } = require("../models/client");

exports.createClient = async (req, res) => {
  const { error } = validateClient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const client = new Client({
    ...req.body,
    enterpriseId: req.enterprise._id,
  });

  await client.save();
  res.status(201).send(client);
};

exports.getClients = async (req, res) => {
  const clients = await Client.find({ enterpriseId: req.enterprise._id });
  res.send(clients);
};

exports.getClientById = async (req, res) => {
  const client = await Client.findOne({
    _id: req.params.id,
    enterpriseId: req.enterprise._id,
  });

  if (!client) return res.status(404).send("Client not found.");
  res.send(client);
};

exports.updateClient = async (req, res) => {
  const { error } = validateClient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const client = await Client.findOneAndUpdate(
    { _id: req.params.id, enterpriseId: req.enterprise._id },
    req.body,
    { new: true }
  );

  if (!client) return res.status(404).send("Client not found.");
  res.send(client);
};

exports.deleteClient = async (req, res) => {
  const client = await Client.findOneAndDelete({
    _id: req.params.id,
    enterpriseId: req.enterprise._id,
  });

  if (!client) return res.status(404).send("Client not found.");
  res.send({ message: "Client deleted successfully." });
};
