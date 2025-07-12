const { Product, validateProduct } = require("../models/product");

exports.createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = new Product({
    ...req.body,
    enterpriseId: req.enterprise._id,
  });

  await product.save();
  res.status(201).send(product);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({ enterpriseId: req.enterprise._id });
  res.send(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    enterpriseId: req.enterprise._id,
  });

  if (!product) return res.status(404).send("Product not found.");
  res.send(product);
};

exports.updateProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, enterpriseId: req.enterprise._id },
    req.body,
    { new: true }
  );

  if (!product) return res.status(404).send("Product not found.");
  res.send(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    enterpriseId: req.enterprise._id,
  });

  if (!product) return res.status(404).send("Product not found.");
  res.send({ message: "Product deleted successfully." });
};
