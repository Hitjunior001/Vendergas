const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middlewares/auth");
const orderController = require("../controllers/orderController");
const enterprise = require("../middlewares/enterprise");
const client = require("../middlewares/client");


router.post("/:enterpriseId/:clientId/", auth, enterprise, client, orderController.createOrder);
router.get("/:enterpriseId", auth, enterprise, orderController.getOrders);
router.get("/id/:id", auth, orderController.getOrderById);
router.put("/:enterpriseId/:clientId/:id", auth, enterprise, client, orderController.updateOrder);
router.delete("/:enterpriseId/:clientId/:id", auth, enterprise, client, orderController.deleteOrder);

router.post("/:enterpriseId/:clientId/:orderId/products", auth, enterprise, client, orderController.addProductToOrder);
router.get("/:enterpriseId/:clientId/:orderId/products", auth, enterprise, client, orderController.getOrderProducts);
router.delete("/products/:id", auth, orderController.deleteOrderProduct);

module.exports = router;
