const { Order, validateOrder } = require("../models/order");
const { OrderProduct, validateOrderProduct } = require("../models/order_product");

exports.createOrder = async (req, res) => {
  const { error } = validateOrder(req.body);
  if (!req.enterprise || !req.client) { return res.status(400).send("Enterprise or Client context missing.")}
  if (error) return res.status(400).send(error.details[0].message);

  const order = new Order({
    ...req.body,
    enterpriseId: req.enterprise._id,
    clientId: req.client._id,
  });

  await order.save();
  res.status(201).send(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ enterpriseId: req.enterprise._id });
  res.send(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
  });

  if (!order) return res.status(404).send("Order not found.");
  res.send(order);
};

exports.updateOrder = async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = await Order.findOneAndUpdate(
    { _id: req.params.id, enterpriseId: req.enterprise._id },
    req.body,
    { new: true }
  );

  if (!order) return res.status(404).send("Order not found.");
  res.send(order);
};

exports.deleteOrder = async (req, res) => {
  const order = await Order.findOneAndDelete({
    _id: req.params.id,
    enterpriseId: req.enterprise._id,
  });

  if (!order) return res.status(404).send("Order not found.");

  await OrderProduct.deleteMany({ orderId: order._id });

  res.send({ message: "Order and its products deleted successfully." });
};

exports.addProductToOrder = async (req, res) => {
  const { error } = validateOrderProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const orderProduct = new OrderProduct({
    ...req.body,
    orderId: req.params.orderId,
  });

  await orderProduct.save();
  res.status(201).send(orderProduct);
};

exports.getOrderProducts = async (req, res) => {
  const products = await OrderProduct.find({ orderId: req.params.orderId }).populate("productId");
  res.send(products);
};

exports.deleteOrderProduct = async (req, res) => {
  const orderProduct = await OrderProduct.findOneAndDelete({
    _id: req.params.id,
  });

  if (!orderProduct) return res.status(404).send("Order product not found.");
  res.send({ message: "Product removed from order." });
};
