import React from 'react'
import Search from './Search'
import { useSelector } from 'react-redux'

const Sidebar = () => {
   
    return (
        <div className='h-screen w-full md:max-w-[40%] bg-red-200 '>
            <div className='w-full flex flex-col gap-2 py-1 '>
                    <div className='w-full'>
                        <Search />
                    </div>
                {/* <UsersList /> */}
            </div> 
        </div>
    )
}

export default Sidebar
