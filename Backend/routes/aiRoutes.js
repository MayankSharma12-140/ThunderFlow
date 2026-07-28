const express = require("express");
const router = express.Router();

const { generateUI , regenerateUI} = require("../controllers/aiController");
const verifyToken = require("../middleware/authMiddleware");

const {
    generateValidation,
    regenerateValidation,
} = require("../validations/aiValidation");

const validate = require("../middleware/validationMiddleware");

router.post("/generate", verifyToken, generateValidation,validate, generateUI);
router.put("/regenerate/:id", verifyToken,  regenerateValidation,validate,regenerateUI);

module.exports = router;