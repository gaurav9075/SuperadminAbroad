// Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="navbar">
        <button className="menu-toggle" onClick={toggleSidebar}>☰</button>

        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="navbar-center desktop-only">
          <span className="navbar-title">Welcome Demo</span>
        </div>

        <div className="navbar-right desktop-only">
          <div className="icon-wrapper" onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
            <span className="icon">👤</span>
            <span className="tooltip">Admin Account</span>
          </div>
        </div>
      </div>

      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-icon" onClick={handleLoginClick}>
          👤 Admin Account
        </div>
      </div>
    </>
  );
}
