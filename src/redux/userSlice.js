import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: "",
        otherUsers: [],
        allChat: [],
        selectedChat: null,
        allMessage:[]   
    },
    reducers: {
        setName: (state, action) => { state.user = action.payload },
        setOtherUser: (state, action) => { state.otherUsers = action.payload },
        setAllChat:(state,action) => {state.allChat = action.payload}, 
        setSelectedChat:(state,action) => {state.selectedChat = action.payload},
        setAllMessage:(state,action) => {state.allMessage = action.payload}   
    }
})

export const { setName, setOtherUser,setAllChat,setSelectedChat,setAllMessage } = userSlice.actions
export default userSlice.reducer