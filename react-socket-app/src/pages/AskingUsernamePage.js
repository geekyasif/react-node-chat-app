import React from 'react'

function AskingUsernamePage({username, setUsername, handleJoinTheChat}) {

  return (
    <div className='container mx-auto bg-gray-100 p-4 '>
        
        <div className='flex flex-col justify-center align-center w-1/2 mx-auto h-screen'>
        <p className='text-center my-4 font-bold text-indigo-500 text-2xl '>Chatttyyy</p>
        <input
            placeholder='Enter your name'
            className="100 p-4 outline-gray-100"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <button className='bg-indigo-500 text-white p-2'  onClick={ () => handleJoinTheChat()}>Join the chat</button>
        </div>
    </div>
  )
}

export default AskingUsernamePage