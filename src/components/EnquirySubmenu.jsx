// EnquirySubmenu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaPlus,
  FaList,
  FaCheck,
  FaComments,
  FaCog,
} from 'react-icons/fa';

export default function EnquirySubmenu({ sidebarExpanded }) {
  return (
    <div
      className={`fixed top-[70px] ${
        sidebarExpanded ? 'left-64' : 'left-16'
      } right-0 h-16 bg-blue-600 text-white flex items-center px-4 z-40 transition-all duration-300`}
    >
      <div className="flex flex-row space-x-6 overflow-x-auto w-full">
        <NavLink to="/enquiry/Dashboard" className="flex items-center gap-2 hover:text-yellow-300">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/enquiry/AddEnquiry" className="flex items-center gap-2 hover:text-yellow-300">
          <FaPlus />
          <span>Add Enquiry</span>
        </NavLink>
        <NavLink to="/enquiry/EnquiryList" className="flex items-center gap-2 hover:text-yellow-300">
          <FaList />
          <span>Enquiry List</span>
        </NavLink>
        <NavLink to="/enquiry/TodoList" className="flex items-center gap-2 hover:text-yellow-300">
          <FaCheck />
          <span>Todo List</span>
        </NavLink>
        <NavLink to="/enquiry/Feedback" className="flex items-center gap-2 hover:text-yellow-300">
          <FaComments />
          <span>Feedback</span>
        </NavLink>
        {/* <NavLink to="/enquiry/Settings" className="flex items-center gap-2 hover:text-yellow-300">
          <FaCog />
          <span>Settings</span>
        </NavLink> */}
      </div>
    </div>
  );
}
