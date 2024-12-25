const express = require("express")

const router = express.Router()
const { Signup,Login } = require("../controllers/Auth")
const {authentication} = require("../middlewares/authentication")
const {profileSetuped} = require("../middlewares/ProfileSetuped")
const { createProfile } = require("../controllers/ProfileSetup")

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/createProfile", createProfile)

router.post("/chat",authentication,profileSetuped, (req,res)=>{
    return res.json({
        "status":true
    })
})


module.exports = router;