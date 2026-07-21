const bcrypt = require("bcryptjs");
const { createUser } = require("../models/userModel");

const registerUser = async(req,res)=>{
   const{username,email,password} = req.body;

   const hashedPassword = await bcrypt.hash(password,10);

   res.json({username,email,password,hashedPassword});
};

module.exports = {registerUser,};