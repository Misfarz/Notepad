
import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Napp from './pages/Napp'


function App() {
  return (
   <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/app' element={<Napp/>}/>
   </Routes>
  )
}

export default App