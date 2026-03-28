import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ChatArea from '../components/ChatArea'

const Home = () => {
  return (
    <div className='flex'>
      {/* <Header/> */}
      <Sidebar/>
      <ChatArea/>
      <div></div>
    </div>
  )
}

export default Home
