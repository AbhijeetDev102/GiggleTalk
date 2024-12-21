import axios from 'axios'
import React, { useEffect } from 'react'

const Chat = () => {
  
  const auth = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/chat`, { token: localStorage.getItem("token") })
  } catch (error) {
    console.log(error.message);
    
    
  }
  }

  useEffect(() => {
  auth()
  }, [])

  return (
  <div>Chat</div>
  )
}

export default Chat