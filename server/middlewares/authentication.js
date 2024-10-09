const jwt = require("jsonwebtoken")

exports.authentication = async (req,res,next)=>{
    try {
        const {token} = req.body;
        if(!token){
            return res.json({
                "success":false,
                "Message":"Token is not available please signup/login first"
            })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRETE)
        req.body = decode
        
    } catch (error) {
        return res.json({
            "success":false,
            "message":error.message
        })
        
    }
    
    
    next()
}