const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middlewares/auth");
const productController = require("../controllers/productController");
const enterprise = require("../middlewares/enterprise");


router.post("/:enterpriseId/", auth, enterprise, productController.createProduct);
router.get("/:enterpriseId/", auth, enterprise, productController.getProducts);
router.get("/:enterpriseId/:id", auth, enterprise, productController.getProductById);
router.put("/:enterpriseId/:id", auth, enterprise, productController.updateProduct);
router.delete("/:enterpriseId/:id", auth, enterprise, productController.deleteProduct);

module.exports = router;
