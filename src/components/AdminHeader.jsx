import React from 'react';

export default function AdminHeader() {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm">Welcome, Admin</p>
      </div>
    </header>
  );
}
