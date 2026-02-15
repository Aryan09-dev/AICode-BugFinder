import React, { useState } from "react";
import { User, Bell, Palette, Key, Save } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("profile");

    // Profile
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [company, setCompany] = useState("Tech Company Inc.");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Notifications
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [scanComplete, setScanComplete] = useState(true);
    const [weeklyReport, setWeeklyReport] = useState(false);
    const [securityAlerts, setSecurityAlerts] = useState(true);

    // Appearance
    const [darkMode, setDarkMode] = useState(false);
    const [themeColor, setThemeColor] = useState("#2563EB");
    const [fontSize, setFontSize] = useState("medium");

    // API
    const [apiKey, setApiKey] = useState("sk_test_••••••••••••••••••••••••");
    const [webhookUrl, setWebhookUrl] = useState("");

    const handleSaveProfile = (e) => {
        e.preventDefault();
        alert("Profile updated successfully!");
    };

    const handleGenerateApiKey = () => {
        const newKey = "sk_test_" + Math.random().toString(36).substring(2, 15);
        setApiKey(newKey);
    };

    return (
        <DashboardLayout currentPage="settings">
            <div className="max-w-6xl mx-auto mb-8 space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold text-primaryText font-montserrat  mb-1">Settings</h2>
                    <p className="text-gray-600 font-robotoCondensed text-sm">
                        Manage your account settings and preferences
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6 flex-wrap">
                    {[
                        { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
                        // {
                        //     id: "notifications",
                        //     label: "Notifications",
                        //     icon: <Bell className="w-4 h-4" />,
                        // },
                        { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
                        // { id: "api", label: "API", icon: <Key className="w-4 h-4" /> },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 font-medium ${activeTab === tab.id
                                ? "border-b-2 border-brandBlue text-brandBlue"
                                : "text-gray-600 hover:text-brandBlue"
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* PROFILE */}
                {activeTab === "profile" && (
                    <div className="bg-white shadow-sm p-6 rounded-xl space-y-6">
                        <h3 className="text-lg text-primaryText mb-4">Profile Information</h3>
                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div className="space-y-1">
                                <label htmlFor="name" className="block text-primaryText">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-300 text-primaryText rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText   "
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-primaryText">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="company" className="block text-primaryText">
                                    Company Name
                                </label>
                                <input
                                    id="company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                                />
                            </div>

                            {/* Change Password */}
                            <div className="pt-4 space-y-3">
                                <h4 className="text-primaryText font-montserrat">Change Password</h4>
                                <div className="space-y-2">
                                    <label htmlFor="currentPassword" className="text-primaryText">Current Password</label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        placeholder="••••••••"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="newPassword" className="text-primaryText">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        placeholder="••••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-primaryText">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryText"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-950 transition"
                                >
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* NOTIFICATIONS */}
                {/* {activeTab === "notifications" && (
                    <div className="bg-white shadow-sm p-6 rounded-md space-y-4">
                        {[
                            {
                                title: "Email Notifications",
                                desc: "Receive notifications via email",
                                state: emailNotifications,
                                setState: setEmailNotifications,
                            },
                            {
                                title: "Scan Complete",
                                desc: "Get notified when a scan finishes",
                                state: scanComplete,
                                setState: setScanComplete,
                                disabled: !emailNotifications,
                            },
                            {
                                title: "Weekly Summary Report",
                                desc: "Receive a weekly summary of all scans",
                                state: weeklyReport,
                                setState: setWeeklyReport,
                                disabled: !emailNotifications,
                            },
                            {
                                title: "Security Alerts",
                                desc: "Get alerts for critical security issues",
                                state: securityAlerts,
                                setState: setSecurityAlerts,
                                disabled: !emailNotifications,
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={item.state}
                                    disabled={item.disabled}
                                    onChange={(e) => item.setState(e.target.checked)}
                                    className="h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                        <div className="pt-4 flex justify-end">
                            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                <Save className="w-4 h-4" /> Save Preferences
                            </button>
                        </div>
                    </div>
                )} */}

                {/* APPEARANCE */}
                {activeTab === "appearance" && (
                    <div className="bg-white shadow-sm p-6 rounded-md space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-800 dark:text-gray-200">Dark Mode</span>

                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={(e) => setDarkMode(e.target.checked)}
                                    className="sr-only peer"
                                />

                                <span
                                    className="
        relative
        w-14 h-8
        bg-white
        border border-gray-400
        rounded-full
        transition-colors duration-300
        peer-checked:bg-brandBlue
        peer-checked:border-brandBlue

        after:content-['']
        after:absolute
        after:top-1 after:left-1
        after:w-5 after:h-5
        after:bg-gray-400
        after:rounded-full
        after:transition-all after:duration-300

        peer-checked:after:translate-x-6
        peer-checked:after:bg-white
      "
                                />
                            </label>
                        </div>


                        {/* themes  */}
                        {/* <div>
                            <p className="text-gray-800 mb-2">Theme Color</p>
                            <div className="flex gap-2">
                                {["#2563EB", "#4F46E5", "#16A34A", "#F59E0B", "#DC2626"].map(
                                    (color) => (
                                        <button
                                            key={color}
                                            className={`w-10 h-10 rounded ${themeColor === color ? "ring-2 ring-offset-2 ring-blue-600" : ""}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setThemeColor(color)}
                                        />
                                    )
                                )}
                            </div>
                        </div> */}

                        {/* font size small/mid/larges */}
                        {/* <div>
                            <p className="text-gray-800 mb-2">Font Size</p>
                            <div className="flex gap-2">
                                {["small", "medium", "large"].map((size) => (
                                    <button
                                        key={size}
                                        className={`px-3 py-1 rounded border ${fontSize === size
                                            ? "border-blue-600 text-blue-600"
                                            : "border-gray-300 text-primaryText"
                                            }`}
                                        onClick={() => setFontSize(size)}
                                    >
                                        {size.charAt(0).toUpperCase() + size.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div> */}
                    </div>
                )}

                {/* API
                {activeTab === "api" && (
                    <div className="bg-white shadow-sm p-6 rounded-md space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="api-key" className="block text-primaryText">
                                API Key
                            </label>
                            <div className="flex gap-2">
                                <input
                                    id="api-key"
                                    value={apiKey}
                                    readOnly
                                    className="font-mono text-sm border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleGenerateApiKey}
                                    className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 transition"
                                >
                                    Regenerate
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="webhook" className="block text-gray-700 mb-1">
                                Webhook URL
                            </label>
                            <input
                                id="webhook"
                                placeholder="https://your-domain.com/webhook"
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Receive real-time notifications when scans complete
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                <Save className="w-4 h-4" /> Save API Settings
                            </button>
                        </div>
                    </div>
                )} */}
            </div>
        </DashboardLayout>
    );
};

export default Settings;
