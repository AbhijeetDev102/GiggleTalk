import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserinfo } from "./reduxStore/slices/auth-slice";
import { apiJson, apiUrl } from "../services/apiJson";
import { setGroupinfo } from "./reduxStore/slices/group-slice";
import axios from "axios";

export const getgroupData = async(userId, dispatch)=>{
  const groupdata = await axios.post(`${apiUrl}/api/v1/getGroupinfo`, { userId: userId });
        if (groupdata.data && groupdata.data.data) {
          dispatch(setGroupinfo(groupdata.data.data));
        } else {
          console.error("Failed to fetch group data");
        }
}


function App() {
  //way to get the userinfo from redux store
  // const userdata = useSelector((state) => state.auth.userinfo);
  //   console.log(userdata);

  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const gettingData = async () => {
    if (localStorage.getItem("token")) {
      const response = await apiJson.get(`${apiUrl}/api/v1/getUserInfo`, {});

      if (response.data.data.profileSetup) {
         dispatch(setUserinfo(response.data.data));
        console.log(response.data.data);
        
        // console.log(response);
        // await getgroupData(response.data.data.userId)
        await getgroupData(response.data.data.userId, dispatch)
        navigate("/chat");
      } else {
        navigate("/profile");
      }
    } else {
      navigate("/auth");
    }
  };

  useEffect(() => {
    gettingData();
  }, []);

  return (
    <>
      <Routes path="/">
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
    
      </Routes>
    </>
  );
}

export default App;
