import React from "react";

import { Bell, Sun } from "lucide-react";

function Header() {
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

      <div className="flex  gap-5">
        <div className="hidden sm:flex items-center justify-center h-10 w-10 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-2xl bg-white shadow">
          <Sun className="w-5 h-5 text-gray-700 hover:text-teal-600 transition" />
        </div>

        <div className="hidden sm:flex items-center justify-center h-10 w-10 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-2xl bg-white shadow">
          <Bell className="w-5 h-5 text-gray-700 hover:text-teal-600 transition" />
        </div>
      </div>

      {/* Doctor Info Card */}
    </div>
  );
}

export default Header;
