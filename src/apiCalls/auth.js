import {axiosInstance} from "./index"

export const SignUpUser = async(user)=>{
    try {
        const response = await axiosInstance.post("/api/auth/register",user)
         return response.data
    } catch (error) {
        return error
    }
}

export const loginUser = async (user) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", user)
            return response.data
    } catch (error) {
        return { success: false, message: error.message }
    }
}