const express = require("express")

const router = express.Router()
const { Signup,Login, Userinfo } = require("../controllers/Auth")
const {authentication} = require("../middlewares/authentication")
const {profileSetuped} = require("../middlewares/ProfileSetuped")
const { createProfile } = require("../controllers/ProfileSetup")

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/createProfile",authentication, createProfile)
router.post("/getUserInfo",authentication, Userinfo)



module.exports = router;