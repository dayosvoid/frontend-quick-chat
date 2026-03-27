import { useDispatch, useSelector } from "react-redux"
import { setAllChat, setName, setOtherUser } from "../redux/userSlice"
import { handleCreatNewChat} from "../apiCalls/chat"
import toast from "react-hot-toast"
import { hideLoader, showLoader } from "../redux/loaderSlice"

const UsersList = ({search}) => {
    const dispatch = useDispatch() 
    const otherUsers = useSelector(state => state.userReducer.otherUsers)
    const allChat = useSelector(state => state.userReducer.allChat) 
    const currentUser = useSelector(state => state.userReducer.user)

  const createNewChat = async (members)=>{
        try {
            dispatch(showLoader())
            const response = await handleCreatNewChat(members)
            console.log(response)
            dispatch(hideLoader())

            if(response.success){
                dispatch(setAllChat([...allChat, response.result]))
                toast.success(response.message)
            }
        } catch (error) {
            dispatch(hideLoader())
            toast.error()
        }
    }

    // this is to filter using the search-bar or return users that has started a chat with 
    // our current user
    const userDetail = otherUsers.filter((user) => {
        const hasExistingChat = allChat.some(chat => chat.members.includes(user._id))
        const matchesSearch = 
            user.firstname.toLowerCase().includes(search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(search.toLowerCase())

        // ✅ only show users with existing chats when search is empty
        if (!search) return hasExistingChat

        // ✅ when searching, show matching users
        return matchesSearch
    })

    return (
        <div className=''>
            <div className='flex flex-col items-center gap-3 px-2 text-nowrap'>
                {userDetail?.map((user) => {

                    const fName = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1).toLowerCase()
                    const lName = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1).toLowerCase()
                    const initials = fName[0] + lName[0]

                    // this logic return our searched or other logged user id
                    const existingChat = allChat?.find(chat => chat.members.includes(user._id))

                    return (
                        <div key={user._id} className='bg-white flex p-1 gap-1 w-full md:w-[80%] rounded-sm text-center font-semibold justify-between'>

                            <div className='flex size-10 rounded-full bg-red-500 items-center justify-center overflow-hidden'>
                                {user.profilePicture ? (
                                    <img
                                        src={user.profilePicture}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className='text-white text-xl font-bold mb-0.5'>
                                        {initials}
                                    </span>
                                )}
                            </div>

                            <div className='w-[50%] overflow-hidden'>
                                <p>{fName} {lName}</p>
                                <p>{user.email}</p>
                            </div>

                            {/* ✅ shows correct button based on chat existence */}
                            {existingChat ? (
                                <button className='bg-green-500 text-white p-1 rounded-md'>
                                    Open Chat
                                </button>
                            ) : (
                                <button onClick={(e) => {createNewChat([currentUser._id, user._id])}} className='bg-red-500 text-white p-1 rounded-md'>
                                    Start Chat
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UsersList