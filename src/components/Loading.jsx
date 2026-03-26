import React from 'react'
import {MoonLoader} from "react-spinners"

const Loading = () => {
  return (
    <div className=' w-full min-h-full '>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <MoonLoader/>
      </div>
    </div>
  )
}

export default Loading
