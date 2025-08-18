import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/admin/login`,
      { email, password },
      { withCredentials: true } // ✅ Enables sending/receiving cookies
    );

    if (res.data.success) {
      dispatch(setUser(res.data.user))
      Swal.fire({
        title: "Success!",
        text: "Login successful 🎉",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        // position: "top-end",
      });

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } else {
      Swal.fire({
        title: "Oops!",
        text: res.data.message || "Invalid credentials",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text:
        err.response?.data?.message ||
        "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-700 via-teal-500 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* <Link
            to="/forgotpassword"
            className="text-indigo-600 hover:underline"
          >
            Forgot Password?
          </Link> */}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Submit
          </button>

          {/* <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <span
              onClick={handleSignUpClick}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
