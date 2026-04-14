import { useDispatch, useSelector } from "react-redux"
import { setAllChat, setSelectedChat } from "../redux/userSlice"
import { handleCreatNewChat } from "../apiCalls/chat"
import toast from "react-hot-toast"
import { hideLoader, showLoader } from "../redux/loaderSlice"
import moment from "moment"

const UsersList = ({ search }) => {
    const dispatch = useDispatch()
    const otherUsers = useSelector(state => state.userReducer.otherUsers)
    const allChat = useSelector(state => state.userReducer.allChat)
    const selectedChat = useSelector(state => state.userReducer.selectedChat)
    const currentUser = useSelector(state => state.userReducer.user)

    const createNewChat = async (members) => {
        try {
            dispatch(showLoader())
            const response = await handleCreatNewChat(members)
            if (response.success) {
                dispatch(setAllChat([...allChat, response.data]))
                dispatch(setSelectedChat(response.data))
                toast.success(response.message)
            }
        } catch (error) {
            toast.error(error.message) // ✅ passing error message
        } finally {
            dispatch(hideLoader())
        }
    }

    const userDetail = otherUsers.filter((user) => {
        const hasExistingChat = allChat.some(chat => chat.members.map(m => m._id).includes(user._id))
        const matchesSearch =
            user.firstname.toLowerCase().includes(search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(search.toLowerCase())

        if (!search) return hasExistingChat
        return matchesSearch
    })

    const currentlyOpenedChat = ({ currentUserId, userId }) => {
        const currentChat = allChat.find(chat =>
            chat.members.map(m => m._id).includes(currentUserId) &&
            chat.members.map(m => m._id).includes(userId)
        )
        if (currentChat) {
            dispatch(setSelectedChat(currentChat))
        } else {
            createNewChat([currentUserId, userId])
        }
    }

    // const getUnreadMessageNubmer = ()=>{
    //     const message = allChat.find(chat => chat.members.map(m => m._id).includes(currentUserId))
    // }
    return (
        <div className='w-full'>
            <div className='w-full flex flex-col items-center text-nowrap'>
                {userDetail?.map((user) => {
                    const fName = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1).toLowerCase()
                    const lName = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1).toLowerCase()
                    const initials = fName[0] + lName[0]

                    const existingChat = allChat?.find(chat => chat.members.map(m => m._id).includes(user._id))
                    const lastMessageText = existingChat?.lastMessage?.text // ✅ safe access

                    return (
                        <div
                            onClick={() => currentlyOpenedChat({ currentUserId: currentUser._id, userId: user._id })}
                            key={user._id}
                            className={`bg-red-200 cursor-pointer border-b-2 flex py-2 px-1 gap-1 w-full text-start font-semibold
                                ${existingChat?._id === selectedChat?._id ? "bg-red-300" : ""}
                            `}>

                            <div className='w-20 flex rounded-full bg-red-500 items-center justify-center overflow-hidden'>
                                {user.profilePicture ? (
                                    <img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <span className='text-white text-xl font-bold mb-0.5'>{initials}</span>
                                )}
                            </div>

                            <div className='w-full overflow-hidden'>
                                <p>{fName} {lName}</p>
                                {/* ✅ safe check before slicing */}
                                <p>{lastMessageText ? lastMessageText.slice(0, 25) + "..." : currentUser.email}</p>
                            </div>

                            <div className="w-25 text-end justify-end text-[12px] flex">
                                <p>{existingChat ? moment(existingChat.updatedAt).fromNow() : ""}</p> {/* ✅ updatedAt is more accurate than createdAt */}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UsersList