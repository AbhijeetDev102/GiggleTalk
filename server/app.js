
const express = require("express")
const cors = require("cors")
const app = express()
const cloudinary = require("./config/cloudinary")
const fileUpload = require("express-fileupload");

require("dotenv").config()
app.use(express.json())

//cors setup for comuniction with frontend
app.use(cors())

//file upload setup for cloudinary
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


const colors = require("colors");
// configs , dbconnect , cookieparser , environment variables
const cookieParser = require("cookie-parser")
app.use(cookieParser())


cloudinary.cloudinaryConnect();


//router setup 
const router = require("./routers/router")
app.use("/api/v1", router)





// Creating server using socket.io 
const {createServer}=require("http")

const sequelize = require("./config/dbConnect");
const initializeSocket = require("./SocketIO/socket");

// socket io server
const server = createServer(app)
initializeSocket(server)



server.listen(process.env.PORT, ()=>{console.log('server is running at port 8000'.bgGreen.bold);
})

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull".bgBlue)
    }).catch((err)=>{
        throw err
    })