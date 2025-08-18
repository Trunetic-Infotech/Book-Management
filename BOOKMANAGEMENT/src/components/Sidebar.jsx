import { LogOut, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import axios from "axios";
import Swal from "sweetalert2";

function Sidebar({ sidebarItems, isSidebarOpen, setIsSidebarOpen }) {
  const [showConfirm, setShowConfirm] = useState(false);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(isSidebarOpen);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/admin/logout`,
        {}, // empty body
        { withCredentials: true } // Axios config
      );

      if (response.data.success) {
        localStorage.clear();
        dispatch(logout());

        // Show success Swal
        await Swal.fire({
          icon: "success",
          title: "Logged out",
          text: response.data.message || "You have logged out successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        // Navigate after Swal closes
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong while fetching data",
      });
    }
  };

  return (
    <div
      className={` top-0 left-0 lg:static h-screen  ${
        isSidebarOpen ? "block " : "hidden lg:block  "
      } `}
    >
      {/* Sidebar */}
      <div
        className={`  top-0 left-0 h-full     z-40  bg-gradient-to-b from-[#2E3A59] via-[#6A82C1] to-[#5A6FA7]   shadow-lg overflow-y-auto ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <X
          onClick={() => {
            setIsSidebarOpen(false);
          }}
          className="w-6 h-6 text-black absolute right-2 top-2 lg:hidden"
        />
        <div
          className="
         overflow-y-auto h-full p-4"
        >
          <div className="flex flex-col justify-between  ">
            <div className="h-32 "></div>
            <ul className="space-y-5 ">
              {sidebarItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className="flex items-center gap-4 bg-gray-200 hover:text-black p-3 rounded-xl transition cursor-pointer"
                >
                  <item.icon size={20} className="text-gray-600" />
                  <span className=" lg:block text-sm font-medium">
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </ul>
          </div>

          {/* Logout Button */}
          <div className="mt-4">
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full flex items-center gap-4 bg-gray-200 hover:text-black p-3 rounded-xl transition cursor-pointer"
            >
              <LogOut size={20} className="text-gray-600" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
