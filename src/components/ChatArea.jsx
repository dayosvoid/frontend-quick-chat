import { Send } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, showLoader } from '../redux/loaderSlice'
import { handleGetAllMessage, handleSendMessage } from '../apiCalls/message'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { setAllMessage } from '../redux/userSlice'
// import { Send } from 'lucide-react'

const ChatArea = () => {
    const dispatch = useDispatch()
    const selectedChat = useSelector(state => state.userReducer.selectedChat)
    const currentUser = useSelector(state => state.userReducer.user)
    const allMessage = useSelector(state => state.userReducer.allMessage)
    
    // stores the immdiatiate text from the text input field
    const [message,setMessage] = useState("")


    // handle get all message with a particular chat-id from the database and store them 
    // in redux all message
    const getAllMessages = async(chatId)=>{
        try {
            dispatch(showLoader())
            const response = await handleGetAllMessage(chatId)
             if (response.success){
                dispatch(hideLoader())
                toast.success(response.message)
                console.log(response.data)
                dispatch(setAllMessage(response.data))
             }
        } catch (error) {
            dispatch(hideLoader())
            toast.error(error.message)
            console.log(error)
        }
    } 
    
    // to run the getAllMessage on everytime the seletedChat data changes
    useEffect(()=>{
        if(selectedChat){
            // console.log(selectedChat)
            getAllMessages(selectedChat._id)
        }
    },[selectedChat])
// the handle message creation in the database and store and added the created message 
// to the allMessage state
    const sendMessage =async(e)=>{
        e.preventDefault()
        const messageObject = {
            chatId:selectedChat._id.toString(),
            sender:currentUser._id,
            text:message
        }
        try {
            dispatch(showLoader())
            const response =await handleSendMessage(messageObject)
            console.log({response})
            dispatch(hideLoader())

            if(response.success){
                setMessage("")
                dispatch(setAllMessage([...allMessage, response.data])) 
                // console.log(123 + messageObject)
            }

        } catch (error) {
            toast.error(error.message)
            dispatch(hideLoader())     
        }
    }
    return (
        <div className='bg-red-400 m-2 rounded-2xl p-4 w-full h-screen flex flex-col'>
            
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
            <div className='flex-1 overflow-y-auto py-2'>
                {
                    allMessage.map((text)=> {

                        const isCurrentUser = text.sender === currentUser._id

                        return (<div key={text._id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                            <div className={`p-2 rounded-lg max-w-[60%] ${isCurrentUser ? "bg-white text-black" : "bg-red-600 text-white"}`}>
                                {text.text}
                            </div>
                        </div>)
                    })
                }
            </div>

            {/* input — pushed to bottom */}
            <div className='mt-auto'>
                <form onSubmit={sendMessage} className='flex justify-between w-full border rounded-full py-1 px-2'>
                    <input
                        type="text"
                        placeholder='Type a message'
                        className='w-full bg-transparent focus:outline-none px-2'
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    />
                    <button type='submit'><Send /></button>
                </form>
            </div>

        </div>
    )
}

export default ChatArea