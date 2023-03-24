import React, { useEffect, useState } from "react";
import { socket } from "../socket";

function Chat({
  userJoined,
  allJoinedUsers,
  handleLeaveChat,
  recievedMessages,
  setRecievedMessages,
}) {
  const [chatMessage, setChatMessage] = useState("");
  const currentDate = new Date();
  // sending message
  const handleSendMessage = () => {
    socket.emit("send-message", chatMessage);
    setChatMessage("");
  };

  useEffect(() => {
    socket.on("new-user-joined", userJoined);
  });

  useEffect(() => {
    socket.on("recieve-message", (data) => {
      const _data = {
        message: data.message,
        username: data.username,
      };
      setRecievedMessages([...recievedMessages, _data]);
      console.log("fron fronte f", _data);
    });
  });

  // socket.on("recieve-message", (data) => {
  //     console.log(data)
  // })
  console.log(recievedMessages);

  return (
    <div className="container mx-auto bg-gray-100 flex flex-col-reverse  md:flex md:flex-row p-5 md:h-screen">
      
      {/* // active user  */}
      <div className="bg-white p-2 rounded md:w-80 w-full  md:relative">
        <p className="text-center text-green-600 font-semibold mb-4">
          Active Users
        </p>
        <ul>
          {allJoinedUsers.map((username) =>
            username === userJoined ? (
              <p className="flex flex-row justify-between bg-green-600 text-white p-1 rounded items-center text-sm">
                {userJoined}
                <span className="text-xs">me</span>
              </p>
            ) : (
              <p className="flex flex-row justify-between  p-1 rounded items-center my-2 text-sm">
                {username}{" "}
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
              </p>
            )
          )}
        </ul>
        <button
          className="bg-red-500 md:w-11/12 text-white rounded mt-5 p-2 md:absolute md:bottom-2 md:left-3 w-full"
          onClick={() => handleLeaveChat()}
        >
          Leave the chat
        </button>
      </div>

        {/* chat container  */}
      <div className="border-2 border-white p-1 rounded w-full md:ml-4 md:my-0 my-4 ">
        <div className="p-2 my-2 rounded md:h-[93%] h-[400px] overflow-y-scroll bg-white">
          {recievedMessages.map(({ message, username }) => (
            <div className="">
              {username === userJoined ? (
                <div className="w-1/2 float-right clear-both">
                  <div className="bg-gray-100 text-sm p-2 my-2 rounded inline-block float-right clear-both">
                    <p className="text-sm">
                      {message}
                      <span className="text-[10px] ml-4 pt-2 float-right clear-both text-gray-400">
                        {currentDate.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-1/2 float-left clear-both">
                  <div className="bg-gray-100 text-sm p-2 my-2 rounded inline-block float-left clear-both">
                    <p className="font-bold mb-2 text-indigo-600">{username}</p>
                    <p className="text-sm">
                      {message}
                      <span className="text-[10px] ml-4 pt-2 float-right clear-both text-gray-400">
                        {currentDate.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-row bg-gray-100 mb-2 rounded ">
          <input
            className="w-full p-2 focus:outline-gray-100 border border-gray-200"
            placeholder="enter a chat"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <button
            className="ml-2 bg-indigo-500 text-white px-4 rounded"
            onClick={() => handleSendMessage()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
