import React, { useState } from "react";
import { FaCodeBranch, FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginBranch, getPermissionForBranch } from "../api/api";

export default function Branch() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    branchCode: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginBranch(formData);
      console.log("Branch Login Response:", response);

      if (response?.message === "successful" && response.data?.token) {
        alert("Branch login successful!");

        // Save token and email to sessionStorage
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("superAdminEmail", response.data.email);
        sessionStorage.setItem("userRole", "Branch");

        // Get and save permissions to localStorage
        const permissions = await getPermissionForBranch(formData.email);
        localStorage.setItem("branchPermissions", JSON.stringify(permissions));

        navigate("/branch/dashboard");
      } else {
        alert(response.message || "Branch login failed.");
      }
    } catch (error) {
      console.error("Branch login error:", error);
      alert("Server error during branch login.");
    }
  };

  return (
    <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl flex overflow-hidden z-10">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8">
        <div className="border-t-4 border-blue-500 w-16 mb-4"></div>
        <h2 className="text-2xl font-bold mb-1 text-blue-700">Branch Login</h2>
        <p className="text-gray-600 mb-6">Enter your branch credentials</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-600">Branch Code</label>
            <div className="flex items-center border rounded px-3 mt-1">
              <FaKey className="text-gray-400" />
              <input
                type="text"
                name="branchCode"
                value={formData.branchCode}
                onChange={handleChange}
                placeholder="Enter branch code"
                className="w-full py-2 px-2 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Branch Email</label>
            <div className="flex items-center border rounded px-3 mt-1">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full py-2 px-2 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded px-3 mt-1">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full py-2 px-2 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          <div className="text-right text-sm mt-2 text-gray-500">
            <a href="/forgot-password" className="hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
