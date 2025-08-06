import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import BookCatalog from "../pages/admin/BookCatalog";

import OrderDetails from "../pages/admin/OrderDetails";
import Logout from "../pages/admin/Logout";


function AdminRoute() {
  return (
    <AdminLayout>
      <Routes>
      
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookcatalog" element={<BookCatalog />} />
        <Route path="orderDetails" element={<OrderDetails />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminRoute;
