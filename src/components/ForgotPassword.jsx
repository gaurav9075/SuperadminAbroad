import React, { useState } from "react";
import { sendOtp, resetPassword } from "../api/api";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) return alert("Please enter your email.");
    try {
      const response = await sendOtp(email);
      if (response) {
        alert("OTP sent to email!");
        setOtpSent(true);
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (error) {
      alert("Failed to send OTP. Please try again.");
      console.error(error);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) return alert("Please fill in all fields.");
    try {
      const response = await resetPassword(email, otp, newPassword);
      if (response && response.message?.toLowerCase().includes("success")) {
        alert("Password reset successful!");
        navigate("/");
      } else {
        alert(response.message || "Failed to reset password.");
      }
    } catch (error) {
      alert("Failed to reset password. Check OTP and try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Forgot Password
        </h2>

        {/* Email input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="flex items-center border rounded px-3 mt-1">
            <FaEnvelope className="text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-2 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        ) : (
          <>
            {/* OTP input */}
            <div className="mb-4 mt-4">
              <label className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <div className="flex items-center border rounded px-3 mt-1">
                <FaKey className="text-gray-400" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full py-2 px-2 outline-none"
                  placeholder="Enter OTP"
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="flex items-center border rounded px-3 mt-1">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full py-2 px-2 outline-none"
                  placeholder="Enter new password"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
