import { axiosInstance } from "."

export const handleAllChat = async ()=>{
    try {
        const response = await axiosInstance.get("/api/chat/getAllChats")
        return response.data
    } catch (error) {
         return { success: false, message: error.message }
    }
}