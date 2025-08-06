import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function ForgotPassword() {

    const navigate= useNavigate();


  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-700 via-teal-500 to-white">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Forgot Your Password
          </h2>

          <form
            
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

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              ResetPassword
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link to="/" className="text-indigo-600 hover:underline">
                Back To Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
