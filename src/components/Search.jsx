import { SearchIcon, SearchXIcon } from 'lucide-react'
import React, { useState } from 'react'
import UsersList from './UsersList'

const Search = () => {

  const [ search,setSearch] = useState("")

  const handleSearch =async(e)=>{
    e.preventDefault()
  }
  return (
    <div className='w-11/12 mx-auto flex flex-col gap-2'>
        <span className='w-full flex justify-center'>
            <form onSubmit={handleSearch} action="" className='bg-white w-11/12 border border-gray-800 flex  justify-between rounded-full px-2 py-1'>
                <input value={search} onChange={(e)=>setSearch(e.target.value)}  type="text" className=' w-full focus:outline-0' />
                <i className='self-start'><SearchIcon className='size-5'/></i>
            </form>
        </span>

        <UsersList search={search}/>
    </div>
    
  )
}

export default Search
