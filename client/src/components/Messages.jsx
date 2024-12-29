import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetMessage } from "../reduxStore/slices/message-slice";
import TelegramIcon from "@mui/icons-material/Telegram";
import { apiUrl } from "../../services/apiJson";
import axios from "axios";

const Messages = ({ upcomingM, setUM }) => {
  const userdata = useSelector((state) => state.auth.userinfo);
  const groupData = useSelector((state) => state.group.groupinfo);
  const groupId = useSelector((state) => state.socket.groupId);

  const [messages, setMessages] = useState({
    content: "",
    senderUserId: null,
    groupId:null
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (userdata) {
      setMessages((prev) => ({ ...prev, senderUserId: userdata.userId , groupId:groupId}));
    }
  }, [userdata, groupId]);

  const [recivedmessages, setRecivedMessage] = useState([
    
  ]);

  const dispatch = useDispatch();

  /// upcomming messages from other person
  const handleUpcomingM = () => {
    if (upcomingM.content.trim()) {
      setRecivedMessage((prev) => [...prev, upcomingM]);
      setUM((prev) => ({ ...prev, content: "" }));
    }
  };
  useEffect(() => {
    handleUpcomingM();
  }, [upcomingM]);

  // *******************************

  //message sender
  const handleSend = () => {
    if (messages.content.trim()) {
      setRecivedMessage((prev) => [...prev, messages]);
      dispatch(SetMessage(messages));
      setMessages((prev) => ({ ...prev, content: "" }));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  /// for scroll back to bottom when new message comes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recivedmessages]);


const previousMessage = async ()=>{
  setRecivedMessage([])
  if(groupId){
    const response = await axios.post(`${apiUrl}/api/v1/getPrevPrivateChat`, {groupId:groupId})
    const data = response.data.data
    console.log(data);
    
    setRecivedMessage([...data])
  }
}

  useEffect(()=>{
    previousMessage()
  },[groupId])

  return (
    groupId ? (
      <div className="h-full w-full">
      <div className="flex flex-col h-full justify-between items-center md:py-2 gap-3">
        <div className="rounded-2xl w-[97%] h-[4rem] theme-sm flex items-center p-5">
          {groupData &&
            groupData
              .filter((group) => group.groupId === groupId)
              .map((group, index) => {
                return (
                  <div  key={index} className="flex">
                    <div className="flex items-center gap-4">
                    <Avatar
                      className="h-10 w-10 "
                      alt={`${group.groupName}`}
                      src={`${group.groupDP}`}
                    />
                    <h2 className="text-slate-300 text-xl">{group.groupName}</h2>
                    </div>
                    <div></div>
                  </div>
                );
              })}
        </div>

        <div className="rounded-2xl flex-grow flex flex-col justify-end  w-[97%] theme-sm overflow-auto">
          <div className="max-h-full overflow-y-auto ">
          {recivedmessages.map((recivedmessages, index) => {
            return userdata &&
              recivedmessages.senderUserId === userdata.userId ? (
              <div key={index} className="w-full text-end px-5 text-white">
                <p className="inline-block rounded-t-lg rounded-bl-lg theme-lg px-5 py-1 mb-3">
                  {recivedmessages.content}
                </p>
              </div>
            ) : (
              <div key={index} className="w-full my-3 px-5 text-white">
                <p className="rounded-t-lg rounded-br-lg theme-lg inline-block px-5 py-1">
                  {recivedmessages.content}
                </p>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        </div> 

        <div className="w-[97%] h-[2.5rem] flex justify-between items-center">
          <input
            type="text"
            className="outline-none rounded-2xl p-4 text-slate-200 h-full w-[94%] theme-sm"
            value={messages.content}
            onChange={(e) =>
              setMessages((prev) => ({ ...prev, content: e.target.value }))
            }
            onKeyDown={handleKeyPress}
          />
          <button
            className="theme-sm text-white rounded-2xl p-2 h-full w-[5%] flex justify-center items-center theme-hover"
            onClick={handleSend}
          >
            <TelegramIcon />
          </button>
        </div>
      </div>
    </div>
    ):
    (
      <div className=""/>
    )
    
  );
};

export default Messages;
