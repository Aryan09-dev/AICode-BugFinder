import React, { useState } from "react";
import { Download, Share2, Calendar, Filter } from "lucide-react";
import DashboardLayout from "./DashboardLayout";


const reportsData = [
    {
        id: 1,
        websiteName: "E-commerce Store",
        websiteUrl: "https://example-store.com",
        scanDate: "2025-12-29",
        totalIssues: 45,
        critical: 5,
        high: 12,
        medium: 18,
        low: 10,
        score: 72,
    },
    {
        id: 2,
        websiteName: "Corporate Website",
        websiteUrl: "https://company.io",
        scanDate: "2025-12-28",
        totalIssues: 28,
        critical: 2,
        high: 8,
        medium: 12,
        low: 6,
        score: 85,
    },
];

const Reports = ({ onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter reports by search
    const filteredReports = reportsData.filter((report) =>
        report.websiteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.websiteUrl.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Score Color Logic
    const getScoreColor = (score) => {
        if (score >= 85) return "text-green-600";
        if (score >= 70) return "text-yellow-500";
        return "text-red-600";
    };

    const getScoreBg = (score) => {
        if (score >= 85) return "bg-green-100";
        if (score >= 70) return "bg-yellow-100";
        return "bg-red-100";
    };



    return (
        <>

            <DashboardLayout>
                <div className="max-w-6xl mx-auto space-y-6 mb-10">

                    {/* ================= HEADER ================= */}
                    <div>
                        <h2 className="text-2xl font-bold text-pretty font-montserrat">Reports</h2>
                        <p className="text-gray-600 font-robotoCondensed text-sm">View, filter, and export scan reports</p>
                    </div>

                    {/* ================= FILTER SECTION ================= */}
                    <div className="bg-white p-10 rounded-lg shadow">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search website..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
                            />

                            {/* Issue Filter (UI only) */}
                            <select className="border p-2 rounded w-full">
                                <option>All Issues</option>
                                <option>Critical</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>

                            {/* Date Filter (UI only) */}
                            <select className="border p-2 rounded w-full">
                                <option>All Time</option>
                                <option>Today</option>
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>

                        </div>
                    </div>

                    {/* ================= REPORT CARDS ================= */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredReports.map((report) => (
                            <div key={report.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

                                {/* Top Section */}
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">{report.websiteName}</h3>
                                        <p className="text-sm text-gray-500">{report.websiteUrl}</p>
                                        <p className="text-xs text-gray-400">Scanned on {report.scanDate}</p>
                                    </div>

                                    {/* Score Circle */}
                                    <div className={`w-16 h-16 flex items-center justify-center rounded-full ${getScoreBg(report.score)}`}>
                                        <span className={`text-xl font-bold ${getScoreColor(report.score)}`}>
                                            {report.score}
                                        </span>
                                    </div>
                                </div>

                                {/* Issues Summary */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600">Total Issues:
                                        <span className="font-bold text-gray-800"> {report.totalIssues}</span>
                                    </p>

                                    {/* Severity Grid */}
                                    <div className="grid grid-cols-4 gap-2 mt-3 text-center">
                                        <div className="bg-red-100 p-2 rounded">
                                            <p className="text-xs">Critical</p>
                                            <p className="text-lg font-bold text-red-600">{report.critical}</p>
                                        </div>
                                        <div className="bg-yellow-100 p-2 rounded">
                                            <p className="text-xs">High</p>
                                            <p className="text-lg font-bold text-yellow-600">{report.high}</p>
                                        </div>
                                        <div className="bg-blue-100 p-2 rounded">
                                            <p className="text-xs">Medium</p>
                                            <p className="text-lg font-bold text-blue-600">{report.medium}</p>
                                        </div>
                                        <div className="bg-green-100 p-2 rounded">
                                            <p className="text-xs">Low</p>
                                            <p className="text-lg font-bold text-green-600">{report.low}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 border-t pt-4">
                                    <button
                                        onClick={() => onNavigate("scan-results")}
                                        className="flex-1 border px-3 py-2 rounded hover:bg-gray-100"
                                    >
                                        View Report
                                    </button>

                                    <button className="border px-3 py-2 rounded hover:bg-gray-100">
                                        <Download size={16} />
                                    </button>

                                    <button className="border px-3 py-2 rounded hover:bg-gray-100">
                                        <Share2 size={16} />
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* ================= NO DATA ================= */}
                    {filteredReports.length === 0 && (
                        <div className="bg-white p-10 text-center rounded shadow">
                            <p className="text-gray-500">No reports found</p>
                            <button
                                onClick={() => onNavigate("new-scan")}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Start New Scan
                            </button>
                        </div>
                    )}

                    {/* ================= SUMMARY STATS ================= */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-4">Summary Statistics</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-sm">Total Reports</p>
                                <p className="text-2xl font-bold">{reportsData.length}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-sm">Total Issues</p>
                                <p className="text-2xl font-bold">
                                    {reportsData.reduce((sum, r) => sum + r.totalIssues, 0)}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-sm">Avg Score</p>
                                <p className="text-2xl font-bold">
                                    {Math.round(reportsData.reduce((sum, r) => sum + r.score, 0) / reportsData.length)}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-sm">Critical Issues</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {reportsData.reduce((sum, r) => sum + r.critical, 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </DashboardLayout>


        </>
    )
};

export default Reports;
