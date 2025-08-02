
import React from "react";
import Header from "../components/Header";
import { adminMenu } from "../constants/SidebarMenu";
import Sidebar from "../components/Sidebar";

function AdminLayout({children}) {
  console.log(adminMenu)
  return (
        <div className="flex h-screen ">
      <div className="w-[15%] bg-gradient-to-b from-[#2E3A59] via-[#6A82C1] to-[#5A6FA7]   shadow-lg overflow-y-auto ">
        <Sidebar sidebarItems={adminMenu} />
      </div>

      <div className="flex flex-col gap-5">
        <div className="h-[10%]  bg-[#5A6FA7]  shadow-md p-2 flex items-center justify-between">
          <Header />
        </div>
        <main className="flex-1 h-[70%] w-[85vw]  bg-white rounded-2xl gap-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
