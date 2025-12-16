import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Pad from './Pad'

function Napp() {

  const [open, setOpen] = useState(false)

  return (

    <div>

      <Header onMenuClick={() => setOpen(prev => !prev)}/>
      <Sidebar open={open}/>
      <Pad open={open}/>
      
    </div>
  )
}

export default Napp