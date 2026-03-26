import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: "",
        otherUsers: [],
        allChat: []    
    },
    reducers: {
        setName: (state, action) => { state.user = action.payload },
        setOtherUser: (state, action) => { state.otherUsers = action.payload },
        setAllChat:(state,action) => {state.allChat = action.payload}  
    }
})

export const { setName, setOtherUser,setAllChat } = userSlice.actions
export default userSlice.reducer