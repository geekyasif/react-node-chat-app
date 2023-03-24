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

io.on('connection', (socket) => {


    // connecting the user
    socket.on("new-user-joined", (username) => {
        users[socket.id] = username
        console.log(`${username} is connected !`)
        io.emit("joined-the-chat", username)
    })


    // recieving the message and brodcast to other user
    socket.on("send-message", (message) => {
            console.log(`message from backend:- ${message}`)
        io.emit("recieve-message", {message: message, username: users[socket.id]})
    })


    // disconnecting the user
    socket.on("disconnected", (username) => {
        io.emit("left-the-chat", username)
        console.log("user is disconnected!", username)
    })


})

server.listen(5000, () => {
    console.log("Server is listening on 3001");
})

