import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import UserChat from "../components/UserChat";
import Messages from "../components/Messages";
import { useDispatch, useSelector } from "react-redux";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { setGroupId, setSocketRef } from "../reduxStore/slices/socketInfo";
import { apiUrl } from "../../services/apiJson";
 


const Chat = () => {

  
const dispatch = useDispatch()
  const data = useSelector((messageState) => messageState.message.messageValue);
  const groupIds = useSelector((state) => state.group.groupIds);

  const groupId = useSelector((state)=>state.socket.groupId)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  

  
  const [upcomingM , setUM] = useState({
    content:"",
    senderUserId:null
  })

const socket =  useSelector((state)=>state.socket.socketRef)

  useEffect(() => {
    
    if(socket){
      

      socket.on("connect", () => {
        console.log("Connected to server");
      setLoading(false)

      });
  
      socket.on("user-joined", (data)=>{
        
      })
  
  
      socket.on("Received-message", (data) => {
       
        setUM(data)
      });
  
      return () => {
        socket.off('connect')
        socket.off('Recived-message')
        
        
    }
    };
  }, [socket]);



  useEffect(() => {
    if (socket && data != null) {
      socket.emit("message", {data, groupId});
    
    }
  }, [data]);


  // useEffect(()=>{
  //   if(groupId!=null){
  //     socket.emit("join-group", groupId)
  //   }

  // }, [groupId])
 
  
  const logout = ()=>{
    localStorage.clear()
    navigate("/auth")
    socket.emit('logout', groupIds)
    dispatch(setGroupId(null))
  }

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
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
    );
  } else {
    return (
      <div>
        <div className="h-screen w-full theme-xl flex justify-center items-center">
          <div className="h-[98vh] w-[99vw] rounded-xl flex justify-around items-center">
            <div className="h-[98%] w-[5%] theme-md rounded-3xl flex flex-col justify-between p-3 py-7 items-center ">
              <div></div>
              <div className="h-9 w-full flex justify-center items-center rounded-lg text-white theme-lg hover:bg-red-500 cursor-pointer transition-all ease-in-out " onClick={logout}><LogoutRoundedIcon/></div>
            </div>
            <div className="h-[98%] w-[28%] theme-md rounded-xl">
              <UserChat setLoading={setLoading}/>
            </div>
            <div className="h-[98%] w-[64%] py-2 theme-md rounded-xl  md:block">
              <Messages upcomingM={upcomingM} setUM={setUM} socket={socket}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Chat;
