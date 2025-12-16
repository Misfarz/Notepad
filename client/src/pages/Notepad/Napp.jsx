import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Pad from './Pad'

function Napp() {

  const [open, setOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false);


  return (

    <div>

      <Header onMenuClick={() => setOpen(prev => !prev)} isFullScreen={isFullScreen}/>
      <Sidebar open={open} isFullScreen={isFullScreen}/>
      <Pad open={open} isFullScreen={isFullScreen} toggleFullScreen={() =>setIsFullScreen(prev => !prev)}/>
      
    </div>
  )
}

export default Napp