const express = require("express");

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("ThunderFlow BackEnd is Running...");
});

module.exports = router;