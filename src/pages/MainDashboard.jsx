import React from 'react';

// Get token from sessionStorage
const token = sessionStorage.getItem("token");
console.log("Session Token:", token);

function MainDashboard() {
  return (
    <div className="w-350 min-h-screen bg-gray-100 py-10 px-4 mt-[80px] ml-[-40]">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8 ml-[-1px]">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Main Dashboard</h1>

        {token ? (
          <p className="text-gray-700 text-lg">
            🔐 Authenticated with token: <span className="font-mono text-sm text-green-600">{token}</span>
          </p>
        ) : (
          <p className="text-red-500 text-lg">⚠️ No token found. Please login first.</p>
        )}

        {/* Example dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ">
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-800">Total Users</h3>
            <p className="text-2xl font-bold mt-2">1,042</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-800">Active Sessions</h3>
            <p className="text-2xl font-bold mt-2">79</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-yellow-800">New Messages</h3>
            <p className="text-2xl font-bold mt-2">23</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
