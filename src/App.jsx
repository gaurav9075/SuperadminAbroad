// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EnquirySubmenu from './components/EnquirySubmenu';
import LoginDialog from './components/LoginModal';
import ForgotPassword from './components/ForgotPassword';

import AddEnquiry from './pages/AddEnquiry';
import EnquiryList from './pages/EnquiryList';
import Dashboard from './pages/Dashboard';
import TodoList from './pages/TodoList';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import CreateBranch from './pages/CreateBranch';
import PartnerDetails from './pages/PartnerDetails';
import CreateContinental from './pages/CreateContinental';
import CreateCountry from './pages/CreateCountry';
import Createuniversity from './pages/Createuniversity';
// import BranchAdd from './pages/BranchAdd';
import CourseAdd from './pages/CourseAdd';
import MainDashboard from './pages/MainDashboard';
import BlogManagement from './pages/BlogManagement';
import Admission from './pages/Admission';
import AdminDashboard from './components/AdminDashboard';
import IncomeExpense from './pages/IncomeExpense';

// ✅ Import EnquiryProvider
import { EnquiryProvider } from './context/EnquiryContext';

function Layout() {
  const location = useLocation();
  const isLoginOrForgotPage =
    location.pathname === '/login' || location.pathname === '/forgot-password';
  const isEnquiryRoute = location.pathname.startsWith('/enquiry');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="app-container">
      {!isLoginOrForgotPage && (
        <Sidebar onToggle={(expanded) => setSidebarExpanded(expanded)} />
      )}
      {isEnquiryRoute && (
        <EnquirySubmenu sidebarExpanded={sidebarExpanded} />
      )}
      <div
        className={`ml-16 transition-all duration-300 ${
          sidebarExpanded ? 'ml-64' : 'ml-16'
        } ${isEnquiryRoute ? 'ml-[16rem]' : ''}`}
        style={{
          paddingLeft: isEnquiryRoute
            ? sidebarExpanded
              ? '32rem'
              : '16rem'
            : sidebarExpanded
            ? '16rem'
            : '4rem',
        }}
      >
        {!isLoginOrForgotPage && <Navbar />}
        <Routes>
          {/* 🔹 Super Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/admission-system" element={<Admission />} />
          <Route path="/income-expense" element={<IncomeExpense />} />
          <Route path="/CreateBranch" element={<CreateBranch />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/PartnerDetails" element={<PartnerDetails />} />
          <Route path="/create-continental" element={<CreateContinental />} />
          <Route path="/create-country" element={<CreateCountry />} />
          <Route path="/create-University" element={<Createuniversity />} />
          {/* <Route path="/create-branch" element={<BranchAdd />} /> */}
          <Route path="/course-add" element={<CourseAdd />} />
          <Route path="/blogs" element={<BlogManagement />} />

          {/* 🔹 Enquiry Submodule Routes */}
          <Route path="/enquiry/Dashboard" element={<Dashboard />} />
          <Route path="/enquiry/AddEnquiry" element={<AddEnquiry />} />
          <Route path="/enquiry/EnquiryList" element={<EnquiryList />} />
          <Route path="/enquiry/TodoList" element={<TodoList />} />
          <Route path="/enquiry/Feedback" element={<Feedback />} />
          <Route path="/enquiry/Settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    // ✅ Wrap entire app in EnquiryProvider
    <EnquiryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginDialog />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Layout />} />
        </Routes>
      </Router>
    </EnquiryProvider>
  );
}
