import { useState } from "react"
import { loginUser } from "../apiCalls/auth.js"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { hideLoader, showLoader } from "../redux/loaderSlice.js"

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loadingToast = toast.loading("Authenticating...")

        try {
            dispatch(showLoader())
            const response = await loginUser(user) // ✅ moved inside try
            if (response.success) {
                localStorage.setItem("token", response.token)
                toast.success(response.message)
                navigate("/")
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            dispatch(hideLoader())        // ✅ always hides loader
            toast.dismiss(loadingToast)  // ✅ always dismisses toast
        }
    }

    return (
        <div className="container mx-auto w-11/12">
            <div className="container-back-img"></div>
            <div className="container-back-color"></div>
            <div className="card">
                <div className="card_title">
                    <h1>Login Here</h1>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <button>Login</button>
                    </form>
                </div>
                <div className="card_terms">
                    <span>
                        Don't have an account yet?{" "}
                        <a onClick={() => navigate("/signUp")}>Signup Here</a> {/* ✅ navigates */}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignIn