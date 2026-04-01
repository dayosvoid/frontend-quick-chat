import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { handleLoggedUser, handleOtherLoggedInUser } from "../apiCalls/users"
import Header from "./Header"
import { useDispatch, useSelector } from "react-redux"
import { setAllChat, setName, setOtherUser } from "../redux/userSlice"
import { handleAllChat } from "../apiCalls/chat"


export const ProtectedRoutes = ({ children }) => {
    const user = useSelector(state => state.userReducer.user)
    // const allChat = useSelector(state => state.userReducer.allChat)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLoggedInUser = async () => {
        try {
            const response = await handleLoggedUser()
            const otherUsersResponse = await handleOtherLoggedInUser()
            const chatResponse = await handleAllChat()

            if (response.success && otherUsersResponse.success && chatResponse.success) {
                dispatch(setName(response.result))
                dispatch(setOtherUser(otherUsersResponse.result))
                dispatch(setAllChat(chatResponse.result))

                console.log(chatResponse)
            } else {
                navigate("/signIn")
            }
        } catch (error) {
            console.log(error)
            navigate("/signIn")
        }
    }

    

    useEffect(() => {
        if (localStorage.getItem("token")) {
            handleLoggedInUser()
        } else {
            navigate("/signIn")
        }
    }, [])

    return (
        <div className="">
            <Header
                firstname={user?.firstname ?? "Guest"}
                lastname={user?.lastname ?? "User"}
            />
            {children}
        </div>
    )
}