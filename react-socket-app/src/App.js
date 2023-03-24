import {useEffect, useState} from "react";
import { socket } from './socket';
import Chat from "./pages/Chat";
import AskingUsernamePage from "./pages/AskingUsernamePage";


function App() {  

  const [username, setUsername] = useState("");
  const [userJoined, setUserJoined] = useState("")
  const [recievedMessages, setRecievedMessages] = useState([]);

  const [allJoinedUsers, setAllJoinedUsers] = useState([]);

  
  
  
  // leaving the chat
    const handleLeaveChat = () => {

      setRecievedMessages([...recievedMessages, `${userJoined} left the chat `])
      console.log(recievedMessages)
      socket.emit("disconnected", userJoined)
      setUserJoined("")
      setUsername("")
      console.log(userJoined)

  }


  const handleJoinTheChat = () => {
    setUserJoined(username)
      console.log(userJoined)
      socket.emit("new-user-joined", username);
  }


  useEffect(()=>{
    socket.on("joined-the-chat", (newUser) => {
      setAllJoinedUsers([...allJoinedUsers, newUser])
    })

    socket.on("left-the-chat", (disconnectedUser) => {
      setAllJoinedUsers(allJoinedUsers.filter((user) => user !== disconnectedUser))
    })
  })

  if (!userJoined){
    return <AskingUsernamePage username={username} setUsername={setUsername} handleJoinTheChat={handleJoinTheChat}/>
  }



  return (
    <div >

      {userJoined && <Chat allJoinedUsers={allJoinedUsers} userJoined={userJoined} handleLeaveChat={handleLeaveChat} recievedMessages={recievedMessages} setRecievedMessages={setRecievedMessages}/>}
      
    </div>
  );
}

export default App;
