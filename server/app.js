
const express = require("express")
const app = express()





const cors = require("cors")
const colors = require("colors");
// configs , dbconnect , cookieparser , environment variables
const cookieParser = require("cookie-parser")
app.use(cookieParser())

require("dotenv").config()
app.use(express.json())



app.use(cors({
    origin:"http://localhost:5173",
    methods:["*"],
    credentials: true
}))
const router = require("./routers/router")
app.use("/api/v1", router)



// Creating server using socket.io 
const {createServer}=require("http")
const {Server}=require("socket.io")
const sequelize = require("./config/dbConnect")

// socket io server
const server = createServer(app)
const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["*"],
        credentials:true
        
    }
})

io.on('connection', (socket)=>{
    console.log("New User connected to server ",socket.id);
    socket.on("message",(message)=>{
        console.log("message received",message);
        io.emit("Recived-message",message)
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected from server",socket.id);
    })
    
})



server.listen(process.env.PORT, ()=>{console.log('server is running at port 8000'.bgGreen.bold);
})

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull".bgBlue)
    }).catch((err)=>{
        throw err
    })