const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middlewares/auth");
const enterprise = require("../middlewares/enterprise");
const clientController = require("../controllers/clientController");

/**
 * @swagger
 * /api/clients/{enterpriseId}:
 *   post:
 *     summary: Cadastra um cliente para uma empresa específica
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: enterpriseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - clientEmail
 *               - clientPhone
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: João da Silva
 *               clientEmail:
 *                 type: string
 *                 format: email
 *                 example: joao@email.com
 *               clientPhone:
 *                 type: string
 *                 example: 61999999999
 *     responses:
 *       201:
 *         description: Cliente cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 clientName:
 *                   type: string
 *                 clientEmail:
 *                   type: string
 *                 clientPhone:
 *                   type: string
 *                 enterpriseId:
 *                   type: string
 *                   description: ID da empresa associada
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 */
router.post("/:enterpriseId/", auth, enterprise,  clientController.createClient);
router.get("/:enterpriseId/", auth, enterprise,  clientController.getClients);
router.get("/:enterpriseId/:id", auth, enterprise,  clientController.getClientById);
router.put("/:enterpriseId/:id", auth, enterprise,  clientController.updateClient);
router.delete("/:enterpriseId/:id", auth, enterprise,  clientController.deleteClient);

module.exports = router;
