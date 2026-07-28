const express = require("express");
const router = express.Router();

const { addProject ,getProjects,getProject, getFilteredProjects,
editProject,removeProject,} = require("../controllers/projectController");
const verifyToken = require("../middleware/authMiddleware");

const { projectValidation } = require("../validations/projectValidation");
const validate = require("../middleware/validationMiddleware");

router.post("/", verifyToken, projectValidation, validate, addProject); 

router.get("/", verifyToken, getProjects);

router.get("/filter", verifyToken, getFilteredProjects);

router.get("/:id", verifyToken, getProject);

router.put("/:id", projectValidation,validate, verifyToken, editProject);

router.delete("/:id", verifyToken, removeProject);


module.exports = router;