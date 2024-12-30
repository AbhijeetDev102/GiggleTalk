const express = require("express")

const router = express.Router()
const { Signup,Login, Userinfo } = require("../controllers/Auth")
const {authentication} = require("../middlewares/authentication")

const { createProfile } = require("../controllers/ProfileSetup")
const { SingleChat, getGroupinfo, getPrevPrivateChat, deleteMessage, createMessage } = require("../controllers/SingleChatController")

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/createProfile",authentication, createProfile)
router.get("/getUserInfo",authentication, Userinfo)
router.post("/newChat",SingleChat)
router.post("/getGroupinfo",getGroupinfo)
router.post("/createMessage",createMessage)
router.post("/getPrevPrivateChat",getPrevPrivateChat)
router.post("/deleteMessage",deleteMessage)



module.exports = router;