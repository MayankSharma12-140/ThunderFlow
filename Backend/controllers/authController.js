const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail} = require("../models/userModel");



const registerUser = async(req,res)=>{
   const{username,email,password} = req.body;


  findUserByEmail(email,async(err,result) =>{
    if (err){
        return res.status(500).json({
            message: "Database error",
            error: err.message,
        });
    }

    if(result.length > 0){
        return res.status(400).json({
            message:"Email already registered",
        });
    }


   

   const hashedPassword = await bcrypt.hash(password,10);

   createUser(username, email, hashedPassword, (err, result) => {
   if(err){
    return res.status(500).json({
        message:"Error creating user",
        error:err.message,
    });
   }
   
   return res.status(201).json({
    message:"User Registered Successfully",
     });
   });
 });
};

 const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    findUserByEmail(email, async(err,result)=>{
        if(err){
            return res.status(500).json({
                message: "DataBase error",
                error:err.message,
            });
        }

        if(result.length === 0){
            return res.status(404).json({
                message:"User not Found",
            });
        }

      const isMatch = await bcrypt.compare(password, result[0].password);

      if(!isMatch){
        return res.status(401).json({
            message:"Invalid Password",
        });
      }

    
     const token = jwt.sign(
    {
        id: result[0].id,
        email: result[0].email,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h",
    }
);


    return res.status(200).json({
    message: "Login Successful",
    token,
    user: {
        id: result[0].id,
        username: result[0].username,
        email: result[0].email,
    },
  });

    });
};



module.exports = {registerUser, loginUser,};


