import React from 'react'
import { useSelector } from 'react-redux'

const ChatArea = () => {
    const selectedChat = useSelector(state => state.userReducer.selectedChat)
  return (
    <div>
      <div>
        <p>{selectedChat?._id}</p>
      </div>
    </div>
  )
}

export default ChatArea
