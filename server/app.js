
const express = require("express")
const cors = require("cors")
const app = express()
const cloudinary = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const { PeerServer} = require("peer")
//cors setup for comuniction with frontend
require("dotenv").config()
app.use(cors({
    origin:  `${process.env.FRONT_END_BASEURL}`, // specify the allowed origin
    credentials: true 
}))

app.use(express.json())


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

const customGenerationFunction = () =>
	(Math.random().toString(36) + "0000000000000000000").substring(2, 18);

const peerServer = PeerServer({ 
    port: 9000, path: "/myapp",
    generateClientId: customGenerationFunction,
});



const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`.bgGreen.bold);
});

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull".bgBlue)
    }).catch((err)=>{
        throw err
    })