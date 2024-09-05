import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Auth from './components/auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </>
  )
}

export default App
