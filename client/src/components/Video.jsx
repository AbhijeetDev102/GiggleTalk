import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const Video = () => {

  const [groupid, setgroupid] = useState(null)
  const handlechange = (e)=>{

    setgroupid(e.target.value)
  }

    const [offer, setOffer] = useState(null)
    const [call, setCall] = useState(false)
    const socket = useSelector((state)=> state.socket.socketRef)
    const pc = useRef(new RTCPeerConnection())
  const groupId = useSelector((state)=> state.group.groupId)
    const [stream, setStream] = useState(null);
    const getStream = useCallback( async() => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
       pc.current.addTrack(stream.getVideoTracks()[0]);
       pc.current.addTrack(stream.getAudioTracks()[0]);
      setStream(stream);
    })

    const joinGroup = ()=>{
      socket.emit("join-group", groupid)
    }



    const makeCall = (socket)=>{
      console.log(socket);
      console.log(groupId);
      
      
        pc.current.createOffer().then((offer)=>{
            pc.current.setLocalDescription(offer)
            if(socket){
              socket.emit('incomming-call',offer)

            }
            console.log(offer);
            
        })
        console.log("call made");
        setCall(true)

        
        
    }

    
    
    const receiveCall =async ()=>{
      await pc.current.setRemoteDescription(offer)
        pc.current.createAnswer().then((answer)=>{
            pc.current.setLocalDescription(answer)
            socket.emit('accept-call',answer)
            console.log(answer);
            
      })
      console.log("call accepted");
      
    }
    
    const clearPeerConnection = () => {
      pc.current.close();
      console.log("Peer connection closed");
  };
    useEffect(()=>{
      if(socket){
        socket.on("receive-call", (offer)=>{
          setOffer(offer)
          console.log("incomming call",offer);
          
      })
  
      socket.on("callAccepted", (answer)=>{
          pc.current.setRemoteDescription(answer)
          console.log("call accepted",answer);
      })
  
      return ()=>{
          socket.off("receive-call")
          socket.off("callAccepted")
          clearPeerConnection()
      }

      }
    },[socket])

    useEffect(() => {
      return () => {
          clearPeerConnection();
      };
  }, []);
    

  return (
    <div>
        <input type="text" onChange={handlechange}/>
        <button onClick={()=>{
         joinGroup()
        }}>Join group</button>
        <br />
        <input type="text" />
        <button onClick={()=>{
          // console.log(socket);
        console.log(pc.current);
        getStream()
        makeCall(socket)
        }}>Call</button>

        {call===true && (
          <video ref={(video) => { if (video) video.srcObject = stream }} autoPlay></video>
        )}
        {offer && (
        <div>
          
          <button onClick={receiveCall} >Accept call</button><br />
          <button onClick={()=>{
            clearPeerConnection()
            setCall(false)
            }}>end call</button>
        </div>
      )
        }
    </div>
  )
}

export default Video