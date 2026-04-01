import { Send } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, showLoader } from '../redux/loaderSlice'
import { handleGetAllMessage, handleSendMessage } from '../apiCalls/message'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { setAllMessage } from '../redux/userSlice'
import moment from "moment"

const ChatArea = () => {
    const dispatch = useDispatch()
    const selectedChat = useSelector(state => state.userReducer.selectedChat)
    const currentUser = useSelector(state => state.userReducer.user)
    const allMessage = useSelector(state => state.userReducer.allMessage)
    const [message, setMessage] = useState("")

    const getAllMessages = async (chatId) => {
        try {
            dispatch(showLoader())
            const response = await handleGetAllMessage(chatId)
            if (response.success) {
                dispatch(setAllMessage(response.data))
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            dispatch(hideLoader())
        }
    }

    useEffect(() => {
        if (selectedChat) {
            getAllMessages(selectedChat._id)
        }
    }, [selectedChat])

    const sendMessage = async (e) => {
        e.preventDefault()
        const messageObject = {
            chatId: selectedChat._id.toString(),
            sender: currentUser._id,
            text: message
        }
        try {
            dispatch(showLoader())
            const response = await handleSendMessage(messageObject)
            if (response.success) {
                setMessage("")
                dispatch(setAllMessage([...allMessage, response.data]))
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            dispatch(hideLoader()) 
        }
    }

    return (
        <div className='bg-red-400 m-2 rounded-2xl p-2 w-full h-[calc(100vh-1rem)] flex-col hidden md:flex'>

            {/* header */}
            <div className='flex justify-end h-10'>
                <h2 className='text-red-100 text-2xl font-bold'>
                    {selectedChat ?
                        selectedChat?.members[1]?.firstname + " " + selectedChat?.members[1]?.lastname
                        : null}
                </h2>
            </div>
            <div className='w-full border border-b-2'></div>

            {/* chat messages */}
            <div className='flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-red-300
            '> 
                {allMessage.map((text) => {
                    const isCurrentUser = text.sender.toString() === currentUser._id.toString()

                    return (
                        <div key={text._id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                            <div>
                                <div className={`p-2 my-1 rounded-lg ${isCurrentUser ? "bg-white text-black text-end mr-1 ml-25" : "bg-red-600 text-white mr-25"}`}>
                                    {text.text}
                                </div>
                                <div className={`text-xs ${isCurrentUser ? "text-end" : "text-start"}`}>
                                    {moment(text.createdAt).format("hh:mm A")}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* input */}
            <div className='mt-auto'>
                <form onSubmit={sendMessage} className='flex justify-between w-full border rounded-full py-1 px-2'>
                    <input
                        type="text"
                        placeholder='Type a message'
                        className='w-full bg-transparent focus:outline-none px-2'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type='submit'><Send /></button>
                </form>
               
            </div>

        </div>
    )
}

export default ChatArea