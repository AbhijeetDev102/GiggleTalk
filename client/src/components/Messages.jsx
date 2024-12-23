import { Avatar } from "@mui/material";
import React from "react";

const Messages = () => {
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
        <div className="w-[97%] h-[2.5rem]">
          <input
            type="text"
            className="rounded-2xl p-4 text-slate-200 h-full w-full bg-slate-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
