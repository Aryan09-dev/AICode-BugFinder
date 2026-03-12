import { User, Palette } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Get user info from token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setName(decoded.username);
      setEmail(decoded.email);
    } catch (error) {
      console.error("Invalid token");
    }
  }, []);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Apply theme globally
  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <DashboardLayout currentPage="settings">
      <div className="max-w-6xl mx-auto mb-8 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-primaryText font-montserrat mb-1">
            Settings
          </h2>
          <p className="text-gray-600 font-robotoCondensed text-sm">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 flex-wrap">
          {[
            {
              id: "profile",
              label: "Profile",
              icon: <User className="w-4 h-4" />,
            },
            {
              id: "appearance",
              label: "Appearance",
              icon: <Palette className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-brandBlue text-brandBlue"
                  : "text-gray-600 hover:text-brandBlue"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-gray-900 shadow-sm p-6 rounded-xl space-y-6">
            <h3 className="text-lg text-primaryText dark:text-white mb-4">
              Profile Information
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-primaryText dark:text-gray-300">
                  Full Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 
                  bg-white dark:bg-gray-800
                  text-primaryText dark:text-white
                  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-primaryText dark:text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-800
                  text-primaryText dark:text-white
                  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                />
              </div>

              <button
                type="submit"
                className="bg-brandBlue text-white px-5 py-2 rounded-lg hover:bg-blue-900"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* APPEARANCE TAB */}
        {activeTab === "appearance" && (
          <div className="bg-white dark:bg-gray-900 shadow-sm p-6 rounded-md space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-800 dark:text-gray-200">
                Dark Mode
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />

                <span
                  className="
                  relative w-14 h-8
                  bg-white border border-gray-400
                  rounded-full transition-colors duration-300
                  peer-checked:bg-brandBlue peer-checked:border-brandBlue

                  after:content-['']
                  after:absolute after:top-1 after:left-1
                  after:w-5 after:h-5
                  after:bg-gray-400 after:rounded-full
                  after:transition-all after:duration-300

                  peer-checked:after:translate-x-6
                  peer-checked:after:bg-white
                  "
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
