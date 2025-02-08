import React, { useEffect, useState } from "react";
import "boxicons";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Avatar, Badge, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../../services/apiJson";

import { getgroupData } from "../App";
import { setGroupId } from "../reduxStore/slices/socketInfo";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserChat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth.userinfo);
  const [Email, setEmail] = useState("")

  const [groupdata ,setGroupData] = useState([])
  const retriveGroupData = useSelector((state) => state.group.groupinfo);
  
  
  

  useEffect(()=>{
    // console.log("retrive data ",retriveGroupData);
    if(retriveGroupData){
      setGroupData(retriveGroupData)

    }
  }, [retriveGroupData])
  

  

const handleChange = (event) => {
  setEmail(event.target.value);
};

const socket = useSelector((state)=> state.socket.socketRef)
const handleSubmit = async()=>{
  const res = await axios.post(`${apiUrl}/api/v1/newChat`, {
    groupId:`${Date.now()}`,
    userId:userdata.userId,
    Email:Email
  } )

  // dispatch(setGroupinfo(res.data.data));
  socket.emit("newChat",Email);
  getgroupData(userdata.userId, dispatch , socket)
  
}

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const openGroup =(groupId)=>{
    dispatch(setGroupId(groupId))
    
  }

  const logout = ()=>{
    localStorage.clear()
    navigate("/auth")
    socket.emit('logout', groupIds)
    dispatch(setGroupId(null))
  }
  return (
    <div className="flex flex-col h-full ">
      <div className="py-10 px-8 w-full h-9 text-slate-200 flex justify-between items-center">
        <h1 className="font-bold text-2xl">Chats</h1>
        <AddIcon
          className="transition-all ease-in-out duration-400 theme-hover h-9 p-1 w-9 rounded-md "
          onClick={handleOpen}
        />
      </div>
      <div className="flex flex-col justify-center items-center mb-4 ">
        <input
          type="text"
          className="h-8 w-11/12 theme-sm border-b-2 p-3 border-slate-200 outline-none "
        />
       
      </div>



      <div className="flex flex-col justify-between items-center overflow-auto h-full ">
      <div className="w-full flex flex-col justify-center items-center">
      {groupdata && 
        groupdata.map((group)=>{

          return (
          <div key={group.groupId} className="w-11/12 cursor-pointer theme-sm rounded-xl mt-2 p-3 flex items-center theme-hover transition-all ease-in-out duration-200 "
          onClick={()=>{openGroup(group.groupId)}}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                className="h-7 w-7  ring-2 ring-slate-300"
                alt={`${group.groupName}`}
                src={`${group.groupDP}`}
              />
            </StyledBadge>
            <h2 className="text-slate-200 mx-4">{group.groupName}</h2>
          </div>)
        })
      }
      </div>
      <div className="h-9 w-full flex justify-center items-center rounded-lg text-white theme-lg hover:bg-red-500 cursor-pointer transition-all ease-in-out " onClick={logout}><LogoutRoundedIcon/></div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className=" flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 shadow-lg p-4 rounded-lg theme-md text-white">
          <h2 className="text-2xl font-bold">New Chat</h2>
          <TextField
          onChange={handleChange}
            fullWidth
            variant="outlined"
            className="text-white theme-sm rounded-md outline-none shadow-sm"
            label="Email"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
              },
              "& .MuiInputLabel-outlined": {
                color: "white",
                fontWeight: "bold",
              },
            }}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"

            onClick={()=>{
              handleSubmit()
            
              handleClose()
            }}
            className="mt-2 theme-sm theme-hover shadow-md"
          >
            Chat
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserChat;
