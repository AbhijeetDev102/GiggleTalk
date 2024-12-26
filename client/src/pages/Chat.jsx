import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import UserChat from "../components/UserChat";
import Messages from "../components/Messages";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";


const Chat = () => {

  const dispatch = useDispatch();

  const data = useSelector((messageState) => messageState.message.messageValue);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const socket = useRef(null); // Use useRef to store the socket instance

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BASE_URL); // Initialize socket connection

    socket.current.on("connect", () => {
      console.log("Connected to server");
      setLoading(false)
    });

    socket.current.on("Recived-message", (message) => {
      console.log("Message Recived", message);
    });

    return () => {
      socket.current.disconnect(() => {
        console.log("Disconnected from server");
      });
    };
  }, []);

  useEffect(() => {
    if (socket.current && data != null) {
      socket.current.emit("message", data);
    }
  }, [data]);

  // const auth = async () => {
  //   try {
  //     // const response = await axios.post(
  //     //   `${import.meta.env.VITE_BASE_URL}/api/v1/chat`,
  //     //   {},
  //     //   {
  //     //     headers: {
  //     //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     //     },
  //     //   }
  //     // );
    
  //     //  dispatch(setUserinfo(response.data.data))
      
      

      

  //     if (!response.data.status) {
  //       navigate("/auth");
  //     } else {
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     navigate("/auth");
  //   }
  // };

  // useEffect(() => {
  //   auth();
  // }, []);

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
        <div className="h-screen w-full bg-slate-950 flex justify-center items-center">
          <div className="h-[98vh] w-[98vw] rounded-xl bg-slate-900 flex justify-around items-center">
            <div className="h-[98%] w-[23%] bg-slate-800 rounded-xl">
              <UserChat />
            </div>
            <div className="h-[98%] w-[75%] bg-slate-800 rounded-xl">
              <Messages />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Chat;
