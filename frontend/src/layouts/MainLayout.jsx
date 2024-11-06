import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import {ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"

const MainLayout = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar/>
      <Outlet/>
      <ToastContainer/>
    </div>
  )
}

export default MainLayout