
const express = require("express")
const app = express()


// configs , dbconnect , cookieparser , environment variables
const cookieParser = require("cookie-parser")
app.use(cookieParser())

require("dotenv").config()
app.use(express.json())

const dbConnect = require("./config/dbConnect")
dbConnect()

const router = require("./routers/router")
app.use("/api/v1", router)

// Creating server using socket.io 
const {createServer}=require("http")
const {Server}=require("socket.io")


 
const server = createServer(app)
const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["*"]
        
    }
})




server.listen(process.env.PORT, ()=>{console.log('server is running at port 8000');
})