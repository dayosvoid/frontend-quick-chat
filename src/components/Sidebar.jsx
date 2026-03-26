import React from 'react'
import Search from './Search'
import { useSelector } from 'react-redux'

const Sidebar = () => {
   
    return (
        <div className='w-full'>
            <div className=' flex flex-col gap-2 h-screen sm:max-w-[40%] bg-red-200'>
                    <div>
                        <Search />
                    </div>
                {/* <UsersList /> */}
            </div>

            
        </div>
    )
}

export default Sidebar
