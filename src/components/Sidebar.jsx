import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdGroupAdd } from "react-icons/md";
import { FaMicroblog } from "react-icons/fa";
import {
  FaCodeBranch,
  FaHome,
  FaUser,
  FaUniversity,
  FaMoneyBill,
  FaCog, // <-- Import Settings Icon
} from 'react-icons/fa';

//import './Sidebar.css';

const menuItems = [
      
  { icon: <FaHome />, label: 'Main Dashboard', path: '/dashboard' },
  { icon: <FaUser />, label: 'Enquiry System', path: '/enquiry' },
  { icon: <FaUniversity />, label: 'Admission System', path: '/admission-system' },
  { icon: <FaMoneyBill />, label: 'Income & Expense', path: '/income-expense' },
  { icon: <FaCodeBranch />, label: 'Add Branch', path: '/CreateBranch' },
  { icon: <FaCog />, label: 'Settings', path: '/settings' },
  { icon: <MdGroupAdd />, label: 'PartnerDetails', path: '/PartnerDetails' },
  { icon: <FaMicroblog />, label: 'BlogDetail', path: '/blogs' },
];


export default function Sidebar({ onToggle }) {
  const [expanded, setExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const sidebarRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const current = menuItems.find(item =>
      location.pathname.startsWith(item.path)
    );
    if (current) setActiveMenu(current.label);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setExpanded(false);
        onToggle?.(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onToggle]);

  const handleMouseEnter = () => {
    setExpanded(true);
    onToggle?.(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
    onToggle?.(false);
  };

  return (

    
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen bg-blue-900 text-white transition-all duration-300 z-50 ${
        expanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-start p-4 space-y-4 mt-[80px]">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2 p-2 rounded-md w-full transition-colors duration-200 cursor-pointer hover:bg-blue-700 ${
              activeMenu === item.label ? 'bg-blue-800' : ''
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {expanded && <span className="text-sm">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
