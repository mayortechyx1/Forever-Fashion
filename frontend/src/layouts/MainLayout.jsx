import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
