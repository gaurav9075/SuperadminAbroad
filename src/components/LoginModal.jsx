import React, { useState } from "react";
import {
  FaUserShield,
  FaCodeBranch,
  FaUserFriends,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import Branch from "../pages/Branch";
import logo from "../assets/logo.png";
import { registerSuperAdmin, loginSuperAdmin, loginBranch } from "../api/api";
import { useNavigate } from "react-router-dom";

const roles = [
  { name: "Super Admin", icon: <FaUserShield /> },
  { name: "Branch", icon: <FaCodeBranch /> },
  { name: "Staff", icon: <FaUserFriends /> },
];

export default function LoginModal() {
  const [selectedRole, setSelectedRole] = useState("Super Admin");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-gray-900 flex items-center justify-center p-4 relative">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl flex overflow-hidden z-10">
        {/* Sidebar */}
        <div className="w-1/3 bg-white border-r">
          <div className="flex flex-col items-center py-8">
            <img src={logo} alt="Logo" className="h-20 mb-8" />
            <div className="w-full">
              {roles.map((role) => (
                <div
                  key={role.name}
                  onClick={() => setSelectedRole(role.name)}
                  className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${
                    selectedRole === role.name
                      ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="text-lg">{role.icon}</div>
                  <span>{role.name}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-auto pb-4">
            © 2025 PJSOFTTECH PVT. LTD.
          </p>
        </div>

        {/* Form Area */}
        <div className="w-2/3 p-10">
          {selectedRole === "Branch" ? (
            <Branch />
          ) : (
            <>
              <div className="border-t-4 border-blue-500 w-16 mb-4"></div>
              <h2 className="text-2xl font-bold mb-1">{selectedRole} Access</h2>
              <p className="text-gray-600 mb-6">
                Access the institute management portal
              </p>

              <form
                className="space-y-5"
                onSubmit={async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    let response;

    if (selectedRole === "Super Admin") {
      response = await loginSuperAdmin({ email, password });
    } else if (selectedRole === "Branch") {
      response = await loginBranch({ email, password });
    } else {
      alert("Login for Staff not implemented yet.");
      return;
    }

    if (response.message === "successful" && response.data?.token) {
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("superAdminEmail", response.data.email); // ✅ email for createBranch API
      sessionStorage.setItem("userRole", selectedRole);

      alert("Login successful!");

      if (selectedRole === "Super Admin") {
        navigate("/enquiry/Dashboard"); // ✅ navigate to Admin Dashboard
      } else if (selectedRole === "Branch") {
        navigate("/branch/dashboard");
      }
    } else {
      alert(response.message || "Login failed");
    }
  } catch (err) {
    alert("Server error during login");
    console.error(err);
  }
}}

              >
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <div className="flex items-center border rounded px-3 mt-1">
                    <FaEnvelope className="text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
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
                      name="password"
                      type="password"
                      placeholder="Password"
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
              </form>

              <div className="flex justify-between text-sm mt-4 text-gray-500">
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="hover:underline"
                >
                  Forgot Password?
                </button>
                <button
                  onClick={() => setShowCreateAccount(true)}
                  className="hover:underline"
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Register Modal */}
      {showCreateAccount && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Create Account</h3>
             <form
                className="space-y-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  const password = e.target.password.value;
                  try {
                    let response;
                    if (selectedRole === "Super Admin") {
                      response = await registerSuperAdmin({ email, password }); // /login
                    } else if (selectedRole === "Branch") {
                      response = await loginBranch({ email, password }); // /branchlogin
                    }

                  if (response?.message === "successful" && response.data?.tokenOrMessage) {
                      sessionStorage.setItem("token", response.data.tokenOrMessage);
                  alert("Login successful!");
                  navigate("/enquiry/Dashboard");
                  
                } else {
                  alert(response.message || "Login failed");
                }

                  } catch (err) {
                    alert("Server error during login");
                    console.error(err);
                  }
                }}
              >

              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <div className="flex items-center border rounded px-3 mt-1">
                  <FaUser className="text-gray-400" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full py-2 px-2 outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <div className="flex items-center border rounded px-3 mt-1">
                  <FaPhone className="text-gray-400" />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full py-2 px-2 outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <div className="flex items-center border rounded px-3 mt-1">
                  <FaEnvelope className="text-gray-400" />
                  <input
                    name="email"
                    type="email"
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
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    className="w-full py-2 px-2 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateAccount(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
