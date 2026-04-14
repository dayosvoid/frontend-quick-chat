import Search from './Search'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const selectedChat = useSelector(state => state.userReducer.selectedChat)

    // the userlist is call and displayed as props in the search component
    return (
        <div className={`h-screen w-full md:max-w-[40%] bg-red-200 
            ${selectedChat ? "hidden md:block" : "block"}`}> 
            <div className='w-full flex flex-col gap-2 py-1'>
                <div className='w-full'>
                    <Search />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
