import React from 'react';
import { FaUsers, FaChartBar, FaCog } from 'react-icons/fa';

export default function AdminSidebar() {
  return (
    <aside className="bg-gray-800 text-white w-60 h-full p-5 space-y-4  min-h-screen">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <nav className="space-y-2">
        <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <FaChartBar /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <FaUsers /> Users
        </a>
        <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> Settings
        </a>
      </nav>
    </aside>
  );
}
