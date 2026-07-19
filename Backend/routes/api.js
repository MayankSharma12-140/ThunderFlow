const express = require("express");

const router = express.Router();

router.get("/status",(req,res)=>{
    res.json({
        success:true,
        message:"ThundeeFlow API is working"
    });
});

module.exports = router;