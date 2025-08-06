import React, { useState } from "react";

import { Bell, User } from "lucide-react";

function Header() {
  const [open, setOpen] = useState(false);

  const userData = {
    name: "Amar",
    role: "Admin",
    email: "amar@trunetic.com",
    status: "Active",
  };

  return (
    <div className="flex flex-row sm:flex-row items-center justify-between gap-6 sm:gap-4 p-4 sm:p-2 md:p-6 lg:p-10 w-full">
      {/* Search + Icons */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="py-2 px-4 sm:px-3 rounded-xl border border-gray-300 focus:outline-none w-full sm:w-[200px] md:w-[250px] lg:w-[350px]"
        />
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
          <div className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-xl z-50 p-6 text-sm ">
            <div className="mb-3">
              <p className="text-gray-800 font-bold text-base">
                {userData.name}
              </p>
              <p className="text-gray-500 text-md">{userData.role}</p>
            </div>
            <div className="border-t border-black  pt-4">
              <p>
                <span className="font-bold text-lg">Email:</span>
                <span className="text-lg pl-2">{userData.email}</span>
              </p>
              <p>
                <span className="font-bold text-lg">Status:</span>{" "}
                <span
                  className={`text-${
                    userData.status === "Active" ? "green" : "red"
                  }-600 text-lg font-semibold`}
                >
                  {userData.status}
                </span>
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="text-md px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-200">
                View
              </button>
             
            </div>
          </div>
        )}

        {/* Bell Icon */}
        <div className=" flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-2xl bg-white shadow cursor-pointer">
          <Bell className="w-5 h-5 text-gray-700 hover:text-teal-600 transition" />
        </div>

       
      </div>
    </div>
  );
}

export default Header;
