

import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Profile from "./pages/Profile"
import Chat from "./pages/Chat"
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserinfo } from "./reduxStore/slices/auth-slice"


function App() {

  //way to get the userinfo from redux store
  // const userdata = useSelector((state) => state.auth.userinfo);
  //   console.log(userdata);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const gettingData = async()=>{
    if(localStorage.getItem("token")){
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/getUserInfo`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if(response.data.data.profileSetup){
          dispatch(setUserinfo(response.data.data))
          navigate("/chat")


        }else{
          navigate("/profile")
        }

    }else{
      navigate("/auth")
    }
  }

  useEffect(()=>{
    gettingData()
  },[])
  

  return (
    <>
      <Routes path="/">
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </>
  )
}

export default App
