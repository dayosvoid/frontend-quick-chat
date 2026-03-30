import {axiosInstance} from "./index"

export const handleSendMessage = async(message)=>{
    try {
        const response = await axiosInstance.post("/api/message/send-message",message)
         return response.data
    } catch (error) {
        return error
    }
}

export const handleGetAllMessage = async(chatId) => {
    try {
        const response = await axiosInstance(`/api/message/get-all-messages/${chatId}`)
        return response.data
    } catch (error) {
        console.log(error.message)
        return error    
    }
}