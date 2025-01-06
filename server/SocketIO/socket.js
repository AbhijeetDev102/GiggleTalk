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
    
    socket.on("join-group", (groupIds) => {
        groupIds.forEach(groupId => {
            socket.join(groupId);
            console.log(`User ${socket.id} joined group ${groupId}`);
        });
    })

    socket.on("message",async ({data, groupId})=>{
        console.log("message received",data);
        if (groupId) {
            socket.broadcast.to(groupId).emit("Recived-message", data);
            
            
        }
    })

    socket.on("deletedFromEveryOne", (groupId)=>{
        socket.broadcast.to(groupId).emit("deleteMessage")
    })

    socket.on('logout', (groupIds)=>{
        groupIds.forEach(groupId => {
            socket.leave(groupId)
            console.log(`User ${socket.id} leaves the group ${groupId}`);
        });
        
    })


    socket.on("incomming-call", (data)=>{
        socket.broadcast.to(socket.currentGroup).emit('receive-call', data)
        console.log(data);
        
    })
    socket.on("accept-call", (data)=>{
        socket.broadcast.to(socket.currentGroup).emit('callAccepted', data)
        console.log(data);

    })  

    socket.on("disconnect",()=>{
        console.log("User disconnected from server",socket.id);
    })
    
})
}


module.exports  = initializeSocket