import React from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate= useNavigate();


  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-700 via-teal-500 to-white">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();

        
                navigate("/admin/dashboard");
            
              // if (role === "user") {
              //   navigate("/user/userdashboard");
              // }
              // if (role === "hr") {
              //   navigate("/hr/hrdashboard");
              // }
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                // required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                // required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              Submit
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don't have an account?{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
