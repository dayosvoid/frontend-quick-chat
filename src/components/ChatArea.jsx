import { Send } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, showLoader } from '../redux/loaderSlice'
import { handleSendMessage } from '../apiCalls/message'
import toast from 'react-hot-toast'
import { useState } from 'react'
// import { Send } from 'lucide-react'

const ChatArea = () => {
    const dispatch = useDispatch()
    const selectedChat = useSelector(state => state.userReducer.selectedChat)
    const currentUser = useSelector(state => state.userReducer.user)
    
    const [message,setMessage] = useState("")
    

    const sendMessage =async(e)=>{
        e.preventDefault()
        const messageObject = {
            chatId:selectedChat._id,
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
            <div className='flex-1 overflow-y-auto'>Chat area</div>

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