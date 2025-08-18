import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import AdminRoute from './routes/AdminRoute'
import ForgotPassword from './pages/admin/ForgotPassword'
import Logout from './pages/admin/Logout'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { setUser } from './redux/features/authSlice'
import Swal from 'sweetalert2'


function App() {

  const dispatch = useDispatch();

  const getUser = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/admin/get-user`, {
        withCredentials: true,
      })

      if(response.data.success){
        dispatch(setUser(response.data.user[0]))
      }

      
    } catch (error) {
      console.error(error);
      Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error?.response?.data?.message || "Something went wrong while Fetching data",
                  });
    }
  }

  useEffect(()=>{
    getUser();
  },[])
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        
        <Route path="forgotpassword" element={<ForgotPassword />} />
         <Route path="logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
