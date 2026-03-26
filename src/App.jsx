import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { ProtectedRoutes } from "./components/ProtectedRoutes"
import {Toaster} from "react-hot-toast"
import Loading from "./components/Loading"

import './App.css';
import { useSelector } from "react-redux"
import loaderReducer from "./redux/store"

function App() {
   const loader = useSelector(state => state.loaderReducer.loader)
  return (
    < >
        <Toaster
      position="top-center"
      reverseOrder={false}
      />    
    {loader && <Loading className=""/>}

     <BrowserRouter>
     <Routes>
      
        <Route path="/" element={
          <ProtectedRoutes><Home/></ProtectedRoutes>
          }></Route>
      
      
      <Route path="/signUp" element={<SignUp/>}></Route>
      <Route path="/signIn" element={<SignIn/>}></Route>
     </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
