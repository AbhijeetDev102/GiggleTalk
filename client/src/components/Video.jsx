import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CallEndIcon from '@mui/icons-material/CallEnd';
import DuoIcon from '@mui/icons-material/Duo';
import { setCallEnd, setCallMade, setIncommingCall } from '../reduxStore/slices/call-slice';
import { Avatar } from '@mui/material';
const Video = ({callData}) => {
  const dispatch = useDispatch()
  const myVideoRef = useRef(null);
  const myVideoStream = useSelector((state)=>state.call.myVideoStream)
  const otherVideoRef = useRef(null);
  const otherVideoStream = useSelector((state)=>state.call.otherVideoStream)
  const incommingPeerInstance = useSelector((state)=>state.call.incommingPeerInstance)
  const remoteConnectionInstance = useSelector((state)=>state.call.remoteConnectionInstance)
  const incommingCall = useSelector((state)=>state.call.incommingCall)
  const callMade = useSelector((state)=>state.call.callMade)
  const [incommingStream, setIncommingStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const callEnd = useSelector((state)=>state.call.callEnd)
  // const callData = useSelector((state)=>state.call.callData)
  useEffect(() => {
    if(incommingPeerInstance){
      setIncommingStream(incommingPeerInstance)
    }
  }, [incommingPeerInstance])


  useEffect(() => {
    console.log("callmade",callMade)
    console.log("my video ref ",myVideoRef);
    
  }, [callMade, myVideoRef])

const setupMyVideo = ()=>{
  if(myVideoStream){
  if (myVideoRef.current) {
    myVideoRef.current.srcObject = myVideoStream;
    if (myVideoRef.current.paused || myVideoRef.current.ended) {
      myVideoRef.current.play();
    }}
  }
  
}

useEffect(() => {
  setupMyVideo()
}, [myVideoStream])

const setupIncommingVideo = ()=>{
  if(otherVideoStream){
    if (otherVideoRef.current) {
      otherVideoRef.current.srcObject = otherVideoStream;
      if (otherVideoRef.current.paused || otherVideoRef.current.ended) {
        otherVideoRef.current.play();
      }
      
    }}
  }

  useEffect(() => {
    setupIncommingVideo()
  }, [otherVideoStream])


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
      
       
      if (remoteConnectionInstance) {
        remoteConnectionInstance.send('call-ended');
        dispatch(setCallEnd(true))
      }
     } 

     useEffect(() => {
      if(callEnd==true){
        endCall()
      }
      },[callEnd])

  return (
    <>
      {(callMade || callAccepted) && (
        <div className="min-h-[30rem] min-w-[50rem] flex items-center justify-center">
          <div className="h-[95%] w-[97%] border-2 border-red-400 relative rounded-3xl flex items-center justify-center">
            
            <video
              ref={otherVideoRef}
              className="h-full w-full object-cover rounded-3xl"
            ></video>
          </div>
          <div className="absolute z-10 bottom-6 right-6 h-[20%] w-[20%] border-2 border-red-400 rounded-3xl overflow-hidden flex items-center justify-center">
            <video
              ref={myVideoRef}
              muted
              className="h-full w-full object-cover rounded-3xl"
            ></video>
          </div>
        </div>
      )}
      {incommingCall && (
        <div  className=' flex flex-col justify-center items-center min-h-[23rem] min-w-56'>

          <div className='flex flex-col justify-center items-center gap-5 m-6'>
          <Avatar
                className="h-36 w-36 text-4xl ring-8 ring-slate-300 "
                
                src={`${callData?.groupDP}`}
                alt={`${callData?.groupName}`}
              />
              <h2 className='text-3xl'>{`${callData?.groupName}`}</h2>
          </div>

        <div className="flex justify-center gap-9 w-full   mt-4  bottom-8">
          <button
            onClick={() => {
              setCallAccepted(true);
              acceptCall(incommingStream);
              dispatch(setIncommingCall(false));
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-emerald-600 transition-all"
          >
          <DuoIcon/>
          </button>
          <button
            onClick={() => {
              endCall();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
          >
            <CallEndIcon/>
          </button>
  
        </div>
        </div>
      )}
      {(callMade || callAccepted) && (
        <div className="flex justify-center mt-4 absolute bottom-8">
          <button
            onClick={() => {
              endCall();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            <CallEndIcon/>
          </button>
        </div>
      )}
    </>
  );
};

export default Video;