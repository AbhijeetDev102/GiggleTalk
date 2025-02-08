
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import UserChat from "../components/UserChat";
import Messages from "../components/Messages";
import { useDispatch, useSelector } from "react-redux";


import {setCallEnd, setIncommingCall, setIncommingPeerInstance, setPeer, setRemotePeerIdList} from "../reduxStore/slices/call-slice"; 

import Peer from "peerjs"
import Video from "../components/Video";
import { gettingData } from "../App";


const Chat = () => {



  
  // const [incomming, setincomming] = useState(false);
  const [myPeerId, setMyPeerId] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState([]);
  const [peer, setpeer] = useState(null);
  
  


  
const dispatch = useDispatch()
  const data = useSelector((messageState) => messageState.message.messageValue);
  const groupIds = useSelector((state) => state.group.groupIds);
  const location = useLocation();
  const groupinfo = useSelector((state) => state.group.groupinfo);
  const [Groupinfo, setGroupInfo] = useState(null)
  const groupId = useSelector((state)=>state.socket.groupId)
  const incommingCall = useSelector((state)=>state.call.incommingCall)
  const callMade = useSelector((state)=>state.call.callMade)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [sendId, setSendId] = useState(false);
  const [recivedId, setRecivedId] = useState(null);
  const [display, setDisplay] = useState("hidden")
  const [upcomingM , setUM] = useState({
    content:"",
    senderUserId:null
  })
    const callEnd = useSelector((state)=>state.call.callEnd)
  

  const socket =  useSelector((state)=>state.socket.socketRef)
  const userinfo = useSelector((state)=> state.auth.userinfo)

  
  const [callData,setCallData] = useState(null)


const sendPeerId = useCallback((id, online) => {

  // if(socket){
  if (Array.isArray(groupIds)) {
    socket.emit("sendPeerId", { peerId: id, groupIds: groupIds, status: online });
    console.log("peerid is send", id);
  } else {
    console.error("groupIds is not an array or is null/undefined");
  }
// }
  
  
}, [socket, groupIds]);



useEffect(() => {
  
  if(groupIds){
  if(status==true && sendId==false){
    sendPeerId(myPeerId, true);
  }else if(status==false && sendId==true){
    sendPeerId(myPeerId, false);
    setSendId(false)
  }
}
}, [myPeerId, groupIds, status, sendId]);



useEffect(()=>{
  if(remotePeerId){
    dispatch(setRemotePeerIdList(remotePeerId))
    
  }
},[remotePeerId, dispatch])

const setPeerId = (data) => {
  if(data.peerId!=null && data.groupId!=null){
    if(!remotePeerId.some(peerObj => peerObj.peerId == data.peerId)){
      if(remotePeerId.some(peerObj => peerObj.groupId == data.groupId)){
        remotePeerId.map((peerObj, index) => {
          if (peerObj.groupId === data.groupId) {
            const updatedPeerObj = { ...peerObj, peerId: data.peerId };
            setRemotePeerId(prevRemotePeerId => [
              ...prevRemotePeerId.slice(0, index),
              updatedPeerObj,
              ...prevRemotePeerId.slice(index + 1)
            ]);
          }
      })
      }else{
        setRemotePeerId(prevRemotePeerId => [...prevRemotePeerId, { peerId:data.peerId , groupId:data.groupId}])
       

      }

}

  if(data.status==true){
    setSendId(true)
    setStatus(false)
  }else if(data.status==false){
    setStatus(false)
    setSendId(false)
  }
}
}

useEffect(() => {
  if(recivedId!=null){
  setPeerId(recivedId)
}
}, [recivedId])

const wait =async ()=>{
  await gettingData(dispatch, navigate, location, socket);
  setLoading(false)
}

//useeffect for socket and peerconnection to server
  useEffect(() => {
   
    const peer =  new Peer();
  
  
    peer.on("open", (id) => {
      console.log(id);
      setMyPeerId(id);
      setpeer(peer)
 
      dispatch(setPeer(peer))
    });  
    

    if(socket){
      socket.on("connect", () => {
        console.log("Connected to server");


      });
      socket.on("Received-message", (data) => {      
        setUM(data)
      });

      socket.on("receivePeerId", (data)=>{
        
        // console.log("groupdata", Groupdata);
        setRecivedId(data)
    
      })

      socket.on("newUCChat", (data) => {
        gettingData(dispatch, navigate, location, socket);

      })

      wait()
  
      return () => {
        socket.off('connect')
        socket.off('Recived-message')
        socket.off("receiveCallData")
        socket.off("newUCChat")
        
        
    }

    };
    

  }, [socket]);

  useEffect(() => {
    if(socket && userinfo!=null){
    socket.emit("join-group", userinfo.Email);
    }
  },[socket, userinfo])

  useEffect(() => {
    if (groupinfo && socket) {
      
      socket.on("receiveCallData", (data) => {
        console.log("call data received", data);
        const Groupdata= groupinfo?.find((group)=> group?.groupId ===data?.groupId)
        setCallData(Groupdata)
      })
      return ()=>{
        socket.off("receiveCallData")
      }
    }
  }, [groupinfo , socket]);

  


  //useeffect for incommingcall listner
useEffect(() => {
    if (peer) {
      peer.on("call", (call) => {
        if (call) {
          // setincomming(true);
          dispatch(setIncommingCall(true))
          // setDisplay("block")
          dispatch(setIncommingPeerInstance(call));
          call.on("close",()=>{
            dispatch(setCallEnd(true))
          })
        }
      });
    }
  }, [peer]);


  useEffect(() => {
    if (incommingCall) {
      setDisplay("block")
    }} , [incommingCall]);
  useEffect(() => {
    if (callMade) {
      setDisplay("block")
    }} , [callMade]);

  //useeffect for sending the message to server
  useEffect(() => {
    if (socket && data != null) {
      socket.emit("message", {data, groupId});
    
    }

  }, [data, socket, groupId ]);




  useEffect(() => {
    if (callEnd==true) {
      setDisplay("hidden")
    }
   
  }, [callEnd]);
    
  

      //function to logout and clear the localstorage and navigate to auth page


  const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      // Set offset to the difference between the mouse position and the div's top-left corner
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    };
  
    const handleMouseMove = (e) => {
      if (isDragging) {
        // Update position based on mouse movement
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    return (
      <>
      <div className={`flex justify-center items-center h-screen w-full ${loading? "block" : "hidden"}`} >
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>



      <div 
      className={`relative overflow-hidden ${loading? "hidden" : "block"}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp} 
      >
              

      <div
        className={`absolute bg-gray-800  text-white rounded-3xl border border-gray-400 flex items-center justify-center cursor-move z-50 ${display} resize` }
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <Video callData={callData}/>
      </div>



        <div className="h-screen w-full theme-xl flex justify-center items-center">
          <div className="h-[98vh] w-[99vw] rounded-xl flex justify-around items-center">
            
            <div className="h-[98%] w-[33%] theme-md rounded-xl">
              <UserChat
              
          
                />
                
            </div>
            <div className="h-[98%] w-[64%] py-2 theme-md rounded-xl  md:block">
              <Messages upcomingM={upcomingM} setUM={setUM} socket={socket} />
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }


export default Chat;
