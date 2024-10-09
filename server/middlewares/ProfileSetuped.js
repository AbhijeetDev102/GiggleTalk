exports.profileSetuped = async (req, res, next)=>{
    const decode = req.body
    
    if (!decode.profileSetup){
        return res.json({
            "success":false,
            "message":"Profile is not setuped"
        })
    }
    next()
}