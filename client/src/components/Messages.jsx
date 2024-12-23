import { Avatar, Button } from "@mui/material";
// import {SendIcon} from "@mui/icons-material/Send"
import React, { useState } from "react";

const Messages = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full justify-between items-center md:py-4 gap-3">
        <div className="rounded-2xl w-[97%] h-[3rem] bg-slate-600 flex items-center px-5">
          <div>
            <Avatar
              className="h-7 w-7 "
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </div>
          <div></div>
        </div>
        <div className="rounded-2xl flex-grow  w-[97%]  bg-slate-600"></div>
        <div className="w-[97%] h-[2.5rem] flex justify-between items-center">
          <input
            type="text"
            className="outline-none rounded-2xl p-4 text-slate-200 h-full w-[88%] bg-slate-600"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-blue-500 text-white rounded-2xl p-2 h-full w-[10%] flex justify-center items-center hover:bg-blue-600"
            onClick={handleSend}
          >
            send
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default Messages;
