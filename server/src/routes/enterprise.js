const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const enterpriseController = require("../controllers/enterpriseController");

router.post("/", auth, enterpriseController.createEnterprise);
router.get("/", auth, enterpriseController.getEnterprises);
router.get("/:id", auth, enterpriseController.getEnterpriseById);
router.put("/:id", auth, enterpriseController.updateEnterprise);
router.delete("/:id", auth, enterpriseController.deleteEnterprise);

module.exports = router;
