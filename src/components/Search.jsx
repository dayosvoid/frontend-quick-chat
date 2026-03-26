import { SearchIcon, SearchXIcon } from 'lucide-react'
import React, { useState } from 'react'
import UsersList from './UsersList'

const Search = () => {

  const [ search,setSearch] = useState("")

  const handleSearch =async(e)=>{
    e.preventDefault()
  }
  return (
    <div className='w-full flex flex-col gap-2 pt-2'>
        <span className='w-full flex justify-center'>
            <form onSubmit={handleSearch} action="" className='bg-white w-[80%] border border-gray-800 flex  justify-between rounded-full p-2'>
                <input value={search} onChange={(e)=>setSearch(e.target.value)}  type="text" className=' w-full focus:outline-0' />
                <i className='self-start'><SearchIcon/></i>
            </form>
        </span>

        <UsersList search={search} />
    </div>
    
  )
}

export default Search
