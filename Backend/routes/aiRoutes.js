const express = require("express");
const router = express.Router();

const { generateUI , regenerateUI} = require("../controllers/aiController");
const verifyToken = require("../middleware/authMiddleware");

const {
    generateValidation,
    regenerateValidation,
} = require("../validations/aiValidation");

const validate = require("../middleware/validationMiddleware");

/**
 * @swagger
 * /api/ai/generate:
 *   post:
 *     summary: Generate UI code using AI
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *               framework:
 *                 type: string
 *     responses:
 *       200:
 *         description: UI generated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

router.post("/generate", verifyToken, generateValidation,validate, generateUI);

/**
 * @swagger
 * /api/ai/regenerate/{id}:
 *   put:
 *     summary: Regenerate UI code
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               framework:
 *                 type: string
 *     responses:
 *       200:
 *         description: UI regenerated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.put("/regenerate/:id", verifyToken,  regenerateValidation,validate,regenerateUI);

module.exports = router;