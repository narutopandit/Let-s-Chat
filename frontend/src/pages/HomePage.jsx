import React, { useState } from 'react'
import LeftSidebar from '../components/Home/LeftSidebar'
import ChatContainer from '../components/Home/ChatContainer'
import RightSide from '../components/Home/RightSide'

const HomePage = () => {
    const [selectUser, SetSelectUser] = useState(false);
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
        <div className = {`border-2 border-gray-600 backdrop-blur-xl h-[100%] overflow-hidden rounded-2xl grid grid-cols-1 relative ${selectUser?'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'grid-cols-2'}`} >
        <LeftSidebar selectedUser={selectUser} SetSelectedUser={SetSelectUser}/>
        <ChatContainer selectedUser={selectUser} setSelectedUser={SetSelectUser}/>
        <RightSide/>
        </div>
    </div>
  )
}

export default HomePage