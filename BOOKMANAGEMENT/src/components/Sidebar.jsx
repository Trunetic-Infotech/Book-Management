import React, { useState } from "react";

import { NavLink } from "react-router-dom";

function Sidebar({sidebarItems}) {
  // console.log(sidebarItems)

  return (
    <div>
      <div className="h-full overflow-y-auto   my-20">
        <ul className="  space-y-4  p-2  items-center gap-4 px-4 py-3 rounded-xl ">
          {sidebarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="flex items-center gap-4 bg-gray-200 hover:text-black p-3 rounded-xl transition cursor-pointer"
            >
              <item.icon size={20}  className="text-gray-600 " />
              <span className="hidden  lg:block text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
