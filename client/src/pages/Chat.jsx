import React, { useEffect } from 'react'

const Chat = () => {
  useEffect(async ()=>{
    await axios.get(`${import.meta.env.VITE_BASE_URL}/chat`)
  },[])
  return (
    <div>Chat</div>
  )
}

export default Chat