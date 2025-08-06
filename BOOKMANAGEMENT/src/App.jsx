import { useState } from 'react'
import SignUp from './SignUp'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import AdminRoute from './routes/AdminRoute'
import ForgotPassword from './pages/admin/ForgotPassword'
import Logout from './pages/admin/Logout'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
         <Route path="logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
