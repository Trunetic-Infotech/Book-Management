import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import AdminRoute from "./routes/AdminRoute";
import ForgotPassword from "./pages/admin/ForgotPassword";

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
