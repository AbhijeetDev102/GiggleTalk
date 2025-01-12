import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Peer from "peerjs"
import { setCallMade, setIncommingCall } from '../reduxStore/slices/call-slice';
const Video = () => {
  const dispatch = useDispatch()
  const myVideoRef = useSelector((state)=>state.call.myVideoRef)
  const otherVideoRef = useSelector((state)=>state.call.otherVideoRef)
  const incommingCall = useSelector((state)=>state.call.incommingCall)
  const callMade = useSelector((state)=>state.call.callMade)

  useEffect(() => {
    console.log("callmade",callMade)
  }, [callMade])

  //function to accept the call using webrtc adn send the answer and stream 
  const acceptCall = (incomingCall) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
       .then((stream) => {
         myVideoRef.current.srcObject = stream;
         if (myVideoRef.current.paused || myVideoRef.current.ended) {
           myVideoRef.current.play();
         }
         incomingCall.answer(stream);
         incomingCall.on("stream", (remoteStream) => {
           otherVideoRef.current.srcObject = remoteStream;
           if (otherVideoRef.current.paused || otherVideoRef.current.ended) {
             otherVideoRef.current.play();
           }
           
         });
       })
       .catch((err) => {
         console.log("Failed to get local stream", err);
       });
     }
// function to end the call and stop the tracks
     const endCall = () => {
       setCallAccepted(false)
       dispatch(setCallMade(false))
       if (myVideoRef.current && myVideoRef.current.srcObject) {
         myVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
         myVideoRef.current.srcObject = null;
       }
       if (otherVideoRef.current && otherVideoRef.current.srcObject) {
         otherVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
         otherVideoRef.current.srcObject = null;
       }
     } 


  return (
    <>
      
      {/* || callAccepted==true */}
      {/* {(callMade==true) && <div style={{ display: "flex", alignItems: "center" }}> */}
        <div className='h-[95%] w-[90%] border-2 border-red-400 relative'>
          <h2>Other person videos</h2>
          <video
            ref={otherVideoRef}
            
           
          ></video>
        </div>
        <div className='absolute z-1 bottom-6 right-6 h-[20%] w-[20%] border-2 border-red-400'>
          <h2>My video </h2>
          <video
            
            ref={myVideoRef}
            muted
          ></video>
        </div>
      {/* </div>} */}
      {/* {incommingCall==true&&<div><button onClick={()=>{
        setCallAccepted(true);
        acceptCall(incommingStream);
        dispatch(setIncommingCall(false));
      }}>Accept Call</button></div>}
      {(callMade==true || callAccepted==true) &&  <div><button onClick={()=>{
        
        
        
      }}>End Call</button></div>} */}
    
    </>
  );
};

export default Video;