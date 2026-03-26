import { axiosInstance } from "./index"

export const handleLoggedUser = async () => {
    try {
        const response = await axiosInstance.get("/api/user/logged-in")
        return response.data
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const handleOtherLoggedInUser = async () => {
    try {
        const response = await axiosInstance.get("/api/user/users")
        return response.data
    } catch (error) {
        return { success: false, message: error.message }
    }
}