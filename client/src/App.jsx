

import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Profile from "./pages/Profile"
import Chat from "./pages/Chat"


function App() {
  
  

  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </>
  )
}

export default App
