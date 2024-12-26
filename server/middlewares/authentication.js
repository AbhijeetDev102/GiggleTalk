const jwt = require("jsonwebtoken")

const User = require("../models/Schema");
const { where } = require("sequelize");
exports.authentication = async (req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({
            success: false,
            message: "Login First",
        });
    }

    const token = authHeader.split(' ')[1];
        if(!token){
            return res.json({
                "success":false,
                "Message":"Token is not available please signup/login first"
            })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRETE)
        // console.log(decode);

      
        req.body.data = decode
        
    } catch (error) {
        return res.json({
            "success":false,
            "message":error.message
        })
        
    }
    
    
    next()
}