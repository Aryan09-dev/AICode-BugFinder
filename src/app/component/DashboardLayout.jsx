import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Search,
  History,
  Bug,
  FileText,
  Settings,
  User,
  LogOut,
  Menu,
  UserCircle,
  Code2,
  ArrowLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // sidebar toggle
  const [userMenuOpen, setUserMenuOpen] = useState(false); // user dropdown toggle
  const userMenuRef = useRef(null);
  const location = useLocation();

  // Sidebar Menu Items
  const menuItems = [
    { id: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "/new-scan", icon: Search, label: "New Scan" },
    { id: "/scan-history", icon: History, label: "Scan History" },
    { id: "/manual-bugs", icon: Bug, label: "Manual Bugs" },
    { id: "/reports", icon: FileText, label: "Reports" },
    { id: "/settings", icon: Settings, label: "Settings" },
  ];

  // Page Titles
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/new-scan": "New Scan",
    "/scan-results": "Scan Results",
    "/scan-history": "Scan History",
    "/manual-bugs": "Manual Bugs",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  // Logout Function
  const handleLogout = () => {
    navigate("/login");
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 w-64 sm:w-72 h-full bg-white border-r 
        transition-transform z-40 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="p-5 flex items-center gap-2 border-b border-gray-200 cursor-pointer"
        >
          <div className="w-8 h-8 bg-primaryText flex items-center justify-center rounded-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg font-montserrat">
            BugAnalyzer AI
          </span>
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  setSidebarOpen(false); // close sidebar on mobile click
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive ? "bg-brandBlue text-white" : "text-primaryText hover:bg-brandBlue hover:text-white"}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ============ MOBILE OVERLAY ============ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">

        {/* ============ HEADER ============ */}
        <header className="bg-white border-b border-gray-200 
        px-3 sm:px-6 py-2 sm:py-4 
        flex justify-between items-center sticky top-0 z-50 w-full">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Back Button */}
            <button
              onClick={() => {
                if (location.pathname === "/scan-results") {
                  navigate(-1);
                } else {
                  navigate("/");
                }
              }}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-6 sm:w-10 h-6 text-primaryText" />
            </button>

            {/* Page Title */}
            <h1 className="text-lg sm:text-2xl capitalize font-robotoCondensed">
              {pageTitles[location.pathname] ?? "Dashboard"}
            </h1>
          </div>

          {/* RIGHT SIDE USER ICON */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-brandBlue flex items-center justify-center"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            {/* User Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 sm:w-56 bg-white rounded-lg shadow-lg border z-50">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>

                <button
                  onClick={() => navigate("/settings")}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  My Profile
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>

                <div className="border-t my-1" />

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ============ PAGE CONTENT ============ */}
        <main className="p-3 sm:p-6 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
