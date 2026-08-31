const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const verifyToken = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 */

router.get("/", verifyToken, getDashboard);

module.exports = router;