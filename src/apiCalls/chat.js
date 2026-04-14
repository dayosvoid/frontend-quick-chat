import { axiosInstance } from "."

export const handleAllChat = async ()=>{
    try {
        const response = await axiosInstance.get("/api/chat/getAllChats")
        return response.data
    } catch (error) {
         return { success: false, message: error.message }
    }
}

export const handleCreatNewChat = async(members)=>{
    try {
        console.log("sending members:", members) 
        const response = await axiosInstance.post("/api/chat/createChat",{
            user1: members[0],
            user2: members[1]})
        return response.data
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const handleChatUpdate = async (chatId) => {
    try {
        console.log(chatId)
        const response = await axiosInstance.post("/api/chat/updateChat", { chatId }) 
        console.log(response.data)
        return response.data 
    } catch (error) {
        return { success: false, message: error.message }
    }
}