const { body } = require("express-validator");

const projectValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

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

module.exports = {
    projectValidation,
};