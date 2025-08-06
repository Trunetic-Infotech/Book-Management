import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import AdminRoute from './routes/AdminRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        
      </Routes>
    </>
  );
}

export default App;
