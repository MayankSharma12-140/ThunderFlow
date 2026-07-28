const { body } = require("express-validator");

const generateValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("prompt")
        .trim()
        .notEmpty()
        .withMessage("Prompt is required")
        .isLength({ min: 10 })
        .withMessage("Prompt must be at least 10 characters"),

    body("framework")
        .trim()
        .notEmpty()
        .withMessage("Framework is required")
        .isIn([
            "React",
            "Next.js",
            "HTML",
            "CSS",
            "JavaScript",
            "Tailwind CSS"
        ])
        .withMessage("Invalid framework"),
];

const regenerateValidation = [
    body("instruction")
        .trim()
        .notEmpty()
        .withMessage("Instruction is required")
        .isLength({ min: 5 })
        .withMessage("Instruction must be at least 5 characters"),
];

module.exports = {
    generateValidation,
    regenerateValidation,
};