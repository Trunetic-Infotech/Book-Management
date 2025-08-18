import React, { useState } from "react";

import { Bell, Menu, User, X } from "lucide-react";
import bookstore from "../assets/book1234.png";

import { Moon, Sun } from "lucide-react";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const [open, setOpen] = useState(false);
  console.log(isSidebarOpen);
  const user = useSelector((state) => state.auth.user);

  const userData = {
    name: user?.full_name,
    role: "Admin",
    email: user?.email,
    Joined: new Date(user?.created_at).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
  };

  return (
    <div className="flex flex-row sm:flex-row items-center justify-between gap-6 sm:gap-4 p-4 sm:p-2 md:p-6 lg:p-10 w-full">
      {/* Search + Icons */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {!isSidebarOpen ? (
          <Menu
            onClick={() => {
              setIsSidebarOpen(true);
            }}
            className="w-6 h-6 text-gray-700 block lg:hidden"
          />
        ) : (
          ""
        )}

        {/*        
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="py-2 px-4 sm:px-3 rounded-xl border border-gray-300 focus:outline-none w-full sm:w-[200px] md:w-[250px] lg:w-[350px]"
        /> */}

        <div className="bg-white h-[80px] w-[140px]  rounded-xl  flex items-center justify-center p-2">
          <img src={bookstore} alt="Bookstore" className=" object-cover" />
        </div>
      </div>

      <div className="flex gap-5 items-center relative">
        {/* User Icon */}
        <div
          onClick={() => setOpen(!open)}
          className=" flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-2xl bg-white shadow cursor-pointer "
        >
          <User className="w-5 h-5 text-gray-700 hover:text-teal-600 transition " />
        </div>

        {/* Profile Popover */}
        {open && (
          <div className="absolute top-14 right-0 w-72 bg-white shadow-xl rounded-2xl z-50 p-6 text-sm">
  {/* User Info Header */}
  <div className="mb-4 flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
      {userData.name?.charAt(0).toUpperCase()}
    </div>
    <div>
      <p className="text-gray-800 font-semibold text-lg">{userData.name}</p>
      <p className="text-gray-500 text-sm">{userData.role}</p>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t border-gray-200 pt-4 space-y-2">
    <div className="flex justify-between">
      <span className="font-medium text-gray-700">Email:</span>
      <span className="text-gray-900">{userData.email}</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium text-gray-700">Joined:</span>
      <span className="text-gray-900 font-semibold">{userData.Joined}</span>
    </div>
    {/* Optional Status Badge */}
    <div className="flex justify-between">
      <span className="font-medium text-gray-700">Status:</span>
      <span className="px-2 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
        Active
      </span>
    </div>
  </div>
</div>

        )}

        {/* Bell Icon */}
        {/* <div className=" flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-2xl bg-white shadow cursor-pointer">
          <Bell className="w-5 h-5 text-gray-700 hover:text-teal-600 transition" />
        </div> */}
      </div>
    </div>
  );
}

export default Header;
