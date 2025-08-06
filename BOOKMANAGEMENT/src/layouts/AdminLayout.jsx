import React, { useState } from "react";
import Header from "../components/Header";
import { adminMenu } from "../constants/SidebarMenu";
import Sidebar from "../components/Sidebar";

function AdminLayout({ children }) {
  console.log(adminMenu);

   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex  h-screen">
      <div className="lg:w-[20%] relative">
        <Sidebar sidebarItems={adminMenu} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      </div>

      <div className="flex flex-col gap-5 w-[100%] lg:w-[80%]">
        <div className="h-[10%]  bg-[#5A6FA7]  shadow-md p-2 flex items-center justify-between">
          <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        </div>
        <main className="flex-1 h-[70%]  bg-white rounded-2xl gap-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
