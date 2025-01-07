import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserinfo } from "./reduxStore/slices/auth-slice";
import { apiJson, apiUrl } from "../services/apiJson";
import { setGroupIds, setGroupinfo } from "./reduxStore/slices/group-slice";
import axios from "axios";
import Video from "./components/Video";
import { setSocketRef } from "./reduxStore/slices/socketInfo";
import { io } from "socket.io-client";

export const getgroupData = async(userId, dispatch, socketRef)=>{
  
  const groupdata = await axios.post(`${apiUrl}/api/v1/getGroupinfo`, { userId: userId });

        if (groupdata.data && groupdata.data.data) {
          dispatch(setGroupinfo(groupdata.data.data));
        } else {
          console.error("Failed to fetch group data");
        }

        const groupIds = [];
        groupdata.data.data.forEach(group => {
          groupIds.push(group.groupId);
        });
        dispatch(setGroupIds(groupIds))
        // console.log(socket);
        socketRef.current.emit("join-groups", groupIds)
        
        
        
}


function App() {
  //way to get the userinfo from redux store
  // const userdata = useSelector((state) => state.auth.userinfo);
  //   console.log(userdata);
  
  const socket = useRef(null); // Use useRef to store the socket instance
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 

  const gettingData = async () => {
    if (localStorage.getItem("token")) {
      const response = await apiJson.get(`${apiUrl}/api/v1/getUserInfo`, {});

      if (response.data.data.profileSetup) {
         dispatch(setUserinfo(response.data.data));
        console.log(response.data.data);
        
        // console.log(response);
        // await getgroupData(response.data.data.userId)
        await getgroupData(response.data.data.userId, dispatch, socket)
        if (location.pathname === '/') {
          navigate("/chat");
        } else {
          navigate(location.pathname);
        }
      } else {
        navigate("/profile");
      }
    } else {
      navigate("/auth");
    }
  };


  useEffect(() => {
    gettingData();
    socket.current = io(import.meta.env.VITE_BASE_URL); // Initialize socket connection
    dispatch(setSocketRef(socket.current))
    return ()=>{
      socket.current.disconnect(() => {
        console.log("Disconnected from server");
      });
    }

  }, []);

  return (
    <>
      <Routes path="/">
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/video" element={<Video />} />
    
      </Routes>
    </>
  );
}

export default App;
