import React from 'react'
import { useSelector } from 'react-redux'

const UsersList = ({search}) => {
     const otherUsers = useSelector(state => state.userReducer.otherUsers)
     
        const userDetail = otherUsers.filter((user)=>(
            user.firstname.toLowerCase().includes(search.toLowerCase()) ||
            user.lastname.toLowerCase().includes(search.toLowerCase())
        ))

  return (
    <div className=''>
      <div className='flex flex-col items-center gap-3 px-2 text-nowrap'>
                    {userDetail?.map((user) => {


                        const fName = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1).toLowerCase()
                        const lName = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1).toLowerCase()
                        
                        const initials = fName[0]+lName[0]


                        return (
                            <div key={user._id} className='bg-white flex p-1 gap-1 w-full md:w-[80%] rounded-sm text-center font-semibold justify-between'>
                                
                        <div className='flex size-10 rounded-full bg-red-500 items-center justify-center overflow-hidden'>
                        {user.profilePicture ? (
                            <img 
                            src={user.profilePicture} 
                            alt="Profile" 
                            className="h-full w-full object-cover" 
                            />
                        ) : (
                            <span className='text-white text-xl font-bold mb-0.5'>
                            {initials}
                            </span>
                        )}
                        </div>

                                <div className='w-[50%] overflow-hidden '>
                                    <p>{fName} {lName}</p>
                                    <p>{user.email}</p>
                                </div>
                                

                                <button className='bg-red-500 text-white p-1 rounded-md'>
                                    Start Chat
                                </button>
                            </div>
                        )
                    })}
                </div>
    </div>
  )
}

export default UsersList
