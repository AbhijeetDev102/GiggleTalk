import {Box, Button, Modal, Radio } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetMessage } from "../reduxStore/slices/message-slice";
import TelegramIcon from "@mui/icons-material/Telegram";
import { apiUrl } from "../../services/apiJson";
import axios from "axios";


import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import UserBar from "./userBar";

const Messages = ({ upcomingM, setUM, socket }) => {
  const userdata = useSelector((state) => state.auth.userinfo);
  const groupData = useSelector((state) => state.group.groupinfo);
  const groupId = useSelector((state) => state.socket.groupId);
  
  const [messages, setMessages] = useState({
    content: "",
    senderUserId: null,
    groupId: null,
  });

  const [messageId, setMessageId] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (userdata) {
      setMessages((prev) => ({
        ...prev,
        senderUserId: userdata.userId,
        groupId: groupId,
      }));
    }
  }, [userdata, groupId]);

  const [recivedmessages, setRecivedMessage] = useState([]);

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
  const handleSend = async () => {
    if (messages.content.trim()) {
      const response = await axios.post(`${apiUrl}/api/v1/createMessage`, {
        message: messages,
      });
       setRecivedMessage((prev) => [...prev, response.data.messageData]);
       dispatch(SetMessage(response.data.messageData));

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

  //modal for delete messages handelling
  const [deleteStatus, setDeleteStatus] = useState("");
  const handleChange = (event) => {
    setDeleteStatus(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const [notMine, setNotMine] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDeleteStatus("");
    setNotMine(false);
  };

  const handleMessageDelete = async (id) => {
    if (deleteStatus) {
      if (deleteStatus == "deleteForMe") {
        const response = await axios.post(`${apiUrl}/api/v1/deleteMessage`, {
          deleteFromUserId: userdata.userId,
          messageId: id,
        });
        setNotMine(false);
      } else if (deleteStatus == "deleteForEveryone") {
        const response = await axios.post(`${apiUrl}/api/v1/deleteMessage`, {
          deleteFromEveryOne: true,
          messageId: id,
        });

        socket.emit("deletedFromEveryOne", groupId);
      }
      previousMessage();
    }
  };

  const previousMessage = async () => {
    setRecivedMessage([]);
    if (groupId) {
      const response = await axios.post(`${apiUrl}/api/v1/getPrevPrivateChat`, {
        groupId: groupId,
      });
      const data = response.data.data;
      // setRecivedMessage([])
      setRecivedMessage([...data]);
    }
  };

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    previousMessage();
  }, [groupId, refresh]);

  useEffect(() => {
    socket.on("deleteMessage", () => {
      setRefresh(!refresh);
    });
  });



   
  
  



 //menu for delete message
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const openMenu = Boolean(anchorElMenu);
  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };


  ;

  return groupId ? (
    <div className="h-full w-full">
      <div className="flex flex-col h-full justify-between items-center md:py-2 gap-3">
        <div className="rounded-2xl w-[97%] h-[4rem] theme-sm flex items-center  p-5">
          {groupData &&
            groupData
              .filter((group) => group.groupId === groupId)
              .map((group, index) => {
                return (
                  <div key={index} className=" w-full flex justify-between">
                    <UserBar group={group}  />
                  </div>
                );
              })}
        </div>

        <div className="rounded-2xl flex-grow flex flex-col justify-end w-[97%] theme-sm overflow-auto">
          <div className="max-h-full overflow-y-auto">
            {recivedmessages.map((recivedmessage, index) => {
              if (
                recivedmessage &&
                recivedmessage.deleteFromEveryOne !== true &&
                recivedmessage.deleteFromUserId != userdata.userId
              ) {
                return userdata &&
                  recivedmessage.senderUserId === userdata.userId ? (
                  <div key={index}>
                    <div className="w-full text-end px-5 text-white">
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={openMenu ? "long-menu" : undefined}
                        aria-expanded={openMenu ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(e) => {
                          setMessageId(recivedmessage.id);
                          handleClickMenu(e);
                        
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>

                      <p className="inline-block rounded-t-lg rounded-bl-lg theme-lg px-5 py-1 mb-3">
                        {recivedmessage.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="w-full my-3 px-5 text-white">
                    <p className="rounded-t-lg rounded-br-lg theme-lg inline-block px-5 py-1">
                      {recivedmessage.content}
                    </p>

                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={openMenu ? "long-menu" : undefined}
                      aria-expanded={openMenu ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(e) => {
                        setMessageId(recivedmessage.id);
                        setNotMine(true);
                        handleClickMenu(e);
                       
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                );
              }
              return null;
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

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorElMenu}
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            border: "1px solid rgb(199, 58, 58)",
            backgroundColor: "#333",
            color: "white",
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={(e) => {
            handleCloseMenu(e);
            handleOpen();

            // console.log(notMine);
          }}
          style={{
            color: "lightcoral",
            fontWeight: "bold",

            textAlign: "center",
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <Modal open={open} onClose={handleClose}>
        <Box className="flex flex-col justify-center  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 shadow-lg p-4 rounded-lg bg-red-400/30 border border-red-300">
          <h2 className="text-xl  text-slate-100 mb-4">Delete message?</h2>
          <div className="text-slate-100 flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <Radio
                value="deleteForMe"
                color="danger"
                className="text-red-500"
                checked={deleteStatus === "deleteForMe"}
                onChange={handleChange}
              />
              <h2>Delete for me</h2>
            </div>

            {notMine != true && (
              <div className="flex items-center gap-2">
                <Radio
                  value="deleteForEveryone"
                  color="danger"
                  className="text-red-500"
                  checked={deleteStatus === "deleteForEveryone"}
                  onChange={handleChange}
                />
                <h2>Delete for everyone</h2>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center gap-2 mt-4 w-full">
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
              }}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                handleMessageDelete(messageId);
                // setNotMine(false);
                // console.log(notMine);

                handleClose();
              }}
            >
              Ok
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  ) : (
    <div className="" />
  );
};

export default Messages;
