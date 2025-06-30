import React, { useState } from "react";
import { FaBookOpen, FaGraduationCap, FaClipboardList, FaFolderPlus, FaGlobe, FaFlag } from "react-icons/fa";
import { BiCategory, BiQrScan } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { LuUniversity } from "react-icons/lu";
import { FcDepartment } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const menuItems = [
  // { icon: <FaFlag />, label: "Add Country", path: "/create-country" },
  // { icon: <LuUniversity />, label: "Add University",  path: "/create-University"  },
  // { icon: <FaClipboardList />, label: "Add Branch", path: "/create-branch" },
  // { icon: <FaBookOpen />, label: "Course", path: "/course-add" },
  { icon: <FaFolderPlus />, label: "Add Source" },
  { icon: <FcDepartment />, label: "Enquiry Department" },
  { icon: <BsThreeDots />, label: "Todo Status" },
];

export default function Settings() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`settings-sidebar ${isExpanded ? "settings-sidebar-expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* ✅ Add Continental Navigation */}
      <div
        className="settings-sidebar-item settings-sidebar-top-item"
        onClick={() => navigate("/create-continental")}
      >
        <span className="settings-sidebar-icon"><FaGlobe /></span>
        {isExpanded && <span className="settings-sidebar-label">Add Continental</span>}
      </div>

      {/* Other Items */}
      {menuItems.map((item, index) => (
        <div
          className="settings-sidebar-item"
          key={index}
          onClick={() => item.path && navigate(item.path)} // ✅ Only navigate if path exists
        >
          <span className="settings-sidebar-icon">{item.icon}</span>
          {isExpanded && <span className="settings-sidebar-label">{item.label}</span>}
        </div>
      ))}

    </div>
  );
}
