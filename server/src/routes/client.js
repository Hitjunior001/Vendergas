const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middlewares/auth");
const enterprise = require("../middlewares/enterprise");
const clientController = require("../controllers/clientController");

router.post("/:enterpriseId/", auth, enterprise,  clientController.createClient);
router.get("/:enterpriseId/", auth, enterprise,  clientController.getClients);
router.get("/:enterpriseId/:id", auth, enterprise,  clientController.getClientById);
router.put("/:enterpriseId/:id", auth, enterprise,  clientController.updateClient);
router.delete("/:enterpriseId/:id", auth, enterprise,  clientController.deleteClient);

module.exports = router;
