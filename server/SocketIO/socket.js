const { Server } = require('socket.io');


const initializeSocket = (server) => {

const io = new Server(server, {
    cors:{
        origin:"*",
        credentials:true
        
    }
})

io.on('connection',  (socket)=>{
    console.log("New User connected to server ",socket.id);
    
    socket.on("join-group", (groupId) => {
        if (socket.currentGroup) {
            socket.leave(socket.currentGroup);
            console.log(`User ${socket.id} left group ${socket.currentGroup}`);
          }
        socket.join(groupId);
       
        socket.currentGroup = groupId;
        console.log(`User ${socket.id} joined group ${groupId}`);
    })

    socket.on("message",async (message)=>{
        console.log("message received",message);
        if (socket.currentGroup) {
            socket.broadcast.to(socket.currentGroup).emit("Recived-message", message);
            // console.log(result);
            
        }
    })

    socket.on("deletedFromEveryOne", ()=>{
        socket.broadcast.to(socket.currentGroup).emit("deleteMessage")
    })

    socket.on('logout', ()=>{
        socket.leave(socket.currentGroup)
        console.log(`User ${socket.id} leaves the group ${socket.currentGroup}`);
        
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected from server",socket.id);
    })
    
})
}


module.exports  = initializeSocket