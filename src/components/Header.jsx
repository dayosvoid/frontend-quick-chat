import { MessageSquare } from 'lucide-react'
import React from 'react'

const Header = ({firstname,lastname}) => {
    const fName = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase()
    const lName = lastname.charAt(0).toUpperCase()+ lastname.slice(1).toLowerCase()

    const initials = fName[0]+lName[0]
    
  return (
    <div className=' bg-red-200 border-b-2 border-red-900 text-nowrap w-full'>
      <div className='flex justify-between mx-auto w-11/12  py-2 h-full items-center '>
        <div className='flex gap-2 w-full'>
            <MessageSquare/>
            <h1 className='font-bold '>Quick Chat</h1>
        </div>
        
        <div className='flex items-center justify-end gap-2 w-full overflow-hidden'>
            <p className='font-semibold'>{fName +" "+ lName}</p>
            <div className='flex flex-col size-10 rounded-full bg-red-500 justify-center items-center'>
                <span className='flex mb-1 justify-center text-white text-xl font-bold'>
                    {initials}
                </span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Header
