// Dashboard.jsx

import { Bug, Code2, Shield, Award, TrendingUp, AlertTriangle } from "lucide-react";
import DashboardLayout from "./DashboardLayout"; // your layout
import { useNavigate } from "react-router-dom";

// Recharts
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";

// Fake Data
const scanHistoryData = [
    { date: "Jan", scans: 12 },
    { date: "Feb", scans: 19 },
    { date: "Mar", scans: 15 },
    { date: "Apr", scans: 25 },
    { date: "May", scans: 22 },
    { date: "Jun", scans: 30 },
];

const issueTypeData = [
    { name: "Bugs", value: 45, color: "#DC2626" },
    { name: "Security", value: 23, color: "#F59E0B" },
    { name: "Performance", value: 18, color: "#2563EB" },
    { name: "Code Quality", value: 34, color: "#16A34A" },
];

const recentScans = [
    { id: 1, url: "example.com", date: "2025-12-29", bugs: 12, score: 78 },
    { id: 2, url: "mywebsite.com", date: "2025-12-28", bugs: 8, score: 85 },
    { id: 3, url: "testsite.io", date: "2025-12-27", bugs: 15, score: 72 },
    { id: 4, url: "demo.app", date: "2025-12-26", bugs: 5, score: 92 },
];

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-6xl mx-auto mb-10">

                {/* ================= STATS CARDS ================= */}
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Total Scans */}
                    <div className="p-6 bg-white shadow-sm rounded-xl hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Total Scans</p>
                                <h2 className="text-3xl font-semibold text-gray-800">143</h2>
                                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                                    <TrendingUp size={16} /> +12% this month
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Code2 className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Bugs Found */}
                    <div className="p-6 bg-white shadow-sm rounded-xl hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Bugs Found</p>
                                <h2 className="text-3xl font-semibold text-gray-800">287</h2>
                                <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
                                    <AlertTriangle size={16} /> 45 critical
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <Bug className="text-red-600" />
                            </div>
                        </div>
                    </div>

                    {/* Security Issues */}
                    <div className="p-6 bg-white shadow-sm rounded-xl hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Security Issues</p>
                                <h2 className="text-3xl font-semibold text-gray-800">56</h2>
                                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                                    <TrendingUp size={16} /> -8% this month
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Shield className="text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    {/* Avg Score */}
                    <div className="p-6 bg-white shadow-sm rounded-xl hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Avg Quality Score</p>
                                <h2 className="text-3xl font-semibold text-gray-800">82</h2>
                                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                                    <Award size={16} /> Good
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Award className="text-green-600" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* ================= CHARTS ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Bar Chart */}
                    <div className="p-6 bg-white shadow-sm rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Scan Activity</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={scanHistoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="scans" fill="#2563EB" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    <div className="p-6 bg-white shadow-sm rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Issues by Type</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={issueTypeData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    label
                                >
                                    {issueTypeData.map((item, index) => (
                                        <Cell key={index} fill={item.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                {/* ================= RECENT SCANS TABLE ================= */}
                <div className="p-6 bg-white shadow-sm rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Recent Scans</h3>
                        <button
                            onClick={() => navigate("/scan-history")}
                            className="text-blue-600 text-sm hover:underline"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3">Website</th>
                                    <th className="text-left py-3">Date</th>
                                    <th className="text-left py-3">Bugs</th>
                                    <th className="text-left py-3">Score</th>
                                    <th className="text-left py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentScans.map((scan) => (
                                    <tr key={scan.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3">{scan.url}</td>
                                        <td className="py-3 text-gray-500">{scan.date}</td>
                                        <td className="py-3">
                                            <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                                                {scan.bugs} bugs
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs
                        ${scan.score >= 85 ? "bg-green-100 text-green-600" :
                                                    scan.score >= 70 ? "bg-yellow-100 text-yellow-600" :
                                                        "bg-red-100 text-red-600"}
                      `}>
                                                {scan.score}/100
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <button
                                                onClick={() => navigate("/scan-results")}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View Report
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
