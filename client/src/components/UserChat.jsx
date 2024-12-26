import React from "react";
import "boxicons";
import { Avatar, Badge, styled} from "@mui/material"

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));


const UserChat = () => {
    
      
  return (
    <div className="flex flex-col h-full">
      <div className="md:py-10 md:px-8 w-full h-9 text-slate-200 flex justify-between items-center">
        <h1 className="font-bold text-2xl">Chats</h1>
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <input
          type="text"
          className="h-[2rem] w-[93%] bg-slate-700 border-b-2 p-3 border-slate-200 outline-none"
        />
      </div>
      <div className="flex flex-col  items-center overflow-auto h-full">
        <div className="w-[95%] cursor-pointer bg-slate-700 rounded-xl mt-2 p-[0.8rem] flex  items-center hover:bg-slate-500 transition-all ease-in-out duration-200">
        <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        
      >
        <Avatar className="h-7 w-7 " alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </StyledBadge>

        <h2 className="text-slate-200 mx-4">Rahul Verma</h2>
        </div>
      </div>
    </div>
  );
};

export default UserChat;


