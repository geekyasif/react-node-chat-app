import React, { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../socket";

function HomePage() {
  const [username, setUsername] = useState("");
  const [roomId, setroomId] = useState("");
  const navigate = useNavigate();

  const generateNewRoomId = () => {
    setroomId(uuidv4(4));
  };

  const handleJoinTheRoom = (e) => {
    e.preventDefault();
    socket.emit("join-new-room", username, roomId);
    navigate(`/${roomId}`, {state: username})


  };

  return (
    <div className="container mx-auto bg-gray-100 p-4 ">
      <div className="flex flex-col justify-center align-center w-1/2 mx-auto h-screen">
        <p className="text-center my-4 font-bold text-indigo-500 text-2xl ">
          Chatttyyy
        </p>
        <form onSubmit={handleJoinTheRoom}>
          <input
            placeholder="Room ID"
            className="100 p-4 outline-gray-100 w-full"
            value={roomId}
            onChange={(e) => setroomId(e.target.value)}
          />
          <br />
          <input
            placeholder="Username"
            className="100 p-4 outline-gray-100 w-full my-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <button
            className="bg-indigo-500 text-white p-2 w-full"
            type="submit"
          >
            Join the room
          </button>
        </form>
        <p className="text-center my-2">
          If you don't have to invite then create a{" "}
          <button
            className="text-indigo-500"
            onClick={() => generateNewRoomId()}
          >
            new room
          </button>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
