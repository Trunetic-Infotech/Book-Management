import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import BookCatalog from "../pages/admin/BookCatalog";

import Logout from "../pages/admin/Logout";
import AddBook from "../pages/admin/AddBook";


function AdminRoute() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookcatalog" element={<BookCatalog />} />
  
        <Route path="logout" element={<Logout />} />
        <Route path="addbook" element={<AddBook />} />
     
      </Routes>
    </AdminLayout>
  );
}

export default AdminRoute;
