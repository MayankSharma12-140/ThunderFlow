const express = require("express");
const router = express.Router();

const {registerUser,loginUser}= require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");
const {
    registerValidation,
    loginValidation,
} = require("../validations/authValidation");

const validate = require("../middleware/validationMiddleware");


router.post("/register",registerValidation,validate,registerUser);
router.post("/login", loginValidation,validate, loginUser);

router.get("/profile",verifyToken,(req,res)=>{
    res.status(200).json({
        message: "Welcome to your profile!",
        user:req.user,
    });
});

module.exports = router;

