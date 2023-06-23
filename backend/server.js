import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: "*",
      },
});


app.get("/", (req, res) => {
    res.send("This is from server");
})

const users = {}
const rooms = {}

io.on('connection', (socket) => {

    // connecting through a room
    socket.on("join-new-room", (username, roomId) => {
        socket.join(roomId);
        console.log("new room created", username, roomId)
        socket.to(roomId).emit("new-user-joined-the-room", {username, roomId})
    })

    
    // receiving message from the room and broadcasting into the room
    socket.on("send-message-in-room", (roomId, username, message) => {
        console.log(roomId, message)
        socket.to(roomId).emit("room-messages", {roomId, username, message})
    })

})

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

