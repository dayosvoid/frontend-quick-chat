import React from 'react'
import { useState } from 'react'
import { SignUpUser } from '../apiCalls/auth.js'
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { showLoader } from '../redux/loaderSlice.js'

const SignUp = () => {

    const dispatch = useDispatch()

    const[user,setUser] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })

    const handleSubmit = async (e)=>{
        e.preventDefault()

        toast.loading("Authenticating...")
        // console.log(user)
        let response
        try {
            dispatch(showLoader())
           response =  await SignUpUser(user)
            dispatch(hideLoader())

           if(response.success){
                toast.success(response.message)
           }else{
                toast.error(response.message)
           }
        } catch (error) {
            dispatch(hideLoader())
            toast.error(error)
        }
    }
  return (
    <div className="container mx-auto w-11/12">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
            <div className="card_title">
                <h1>Create Account</h1>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="column">
                        <input type="text" placeholder="First Name" value={user.firstname} onChange={(e)=>{setUser({...user, firstname:e.target.value})}}/>
                        <input type="text" placeholder="Last Name" value={user.lastname} onChange={(e)=>{setUser({...user,lastname:e.target.value})}}/>
                    </div>
                    <input type="email" placeholder="Email" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
                    <input type="password" placeholder="Password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="card_terms">
                <span>Already have an account?
                    <a>Login Here</a>
                </span>
            </div>
        </div>
    </div>

  )
}

export default SignUp
