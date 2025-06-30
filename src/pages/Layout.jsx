import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // new layout CSS

export default function Layout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
