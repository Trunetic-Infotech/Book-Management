import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import BookCatalog from "../pages/admin/BookCatalog";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";
import Logout from "../pages/admin/Logout";

function AdminRoute() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookcatalog" element={<BookCatalog />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminRoute;
