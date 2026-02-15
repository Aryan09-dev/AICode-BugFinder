import { useState } from "react";
import { Eye, Download, Trash2, Calendar, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const scansData = [
    {
        id: 1,
        websiteUrl: "https://example.com",
        scanDate: "2025-12-29",
        scanTime: "14:30",
        bugsFound: 12,
        securityIssues: 5,
        performanceScore: 78,
        overallScore: 78,
        status: "completed",
    },
    {
        id: 2,
        websiteUrl: "https://mywebsite.com",
        scanDate: "2025-12-28",
        scanTime: "09:15",
        bugsFound: 8,
        securityIssues: 3,
        performanceScore: 85,
        overallScore: 85,
        status: "completed",
    },
    {
        id: 3,
        websiteUrl: "https://company.io",
        scanDate: "2025-12-24",
        scanTime: "10:30",
        bugsFound: 20,
        securityIssues: 12,
        performanceScore: 58,
        overallScore: 58,
        status: "failed",
    },
];

const ScanHistory = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [scans, setScans] = useState(scansData);

    const filteredScans = scans.filter((scan) => {
        const matchesSearch = scan.websiteUrl
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || scan.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDeleteScan = (id) => {
        setScans(scans.filter((scan) => scan.id !== id));
    };

    const getScoreColor = (score) => {
        if (score >= 85) return "bg-green-100 text-green-600";
        if (score >= 70) return "bg-yellow-100 text-yellow-600";
        return "bg-red-100 text-red-600";
    };

    const getStatusBadge = (status) => {
        const base = "px-3 py-1 rounded-full text-xs text-white";
        if (status === "completed") return `${base} bg-green-600`;
        if (status === "failed") return `${base} bg-red-600`;
        return `${base} bg-blue-600`;
    };

    return (
        <DashboardLayout currentPage="scan-history">
            <div className="space-y-6 max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold font-montserrat text-gray-800">
                            Scan History
                        </h2>
                        <p className="text-sm font-robotoCondensed text-gray-600">
                            View all previous website scans
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/new-scan")}
                        className="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-950 w-full sm:w-auto flex items-center gap-2 justify-center"
                    >
                        <Plus size={16} /> {/* Lucide Plus icon */}
                        New Scan
                    </button>
                </div>



                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            className="w-full border px-3 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryText"
                            placeholder="Search by website URL..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <select
                        className="border px-4 py-2 rounded-xl w-full sm:w-48"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="In Process">In Process</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>


                {/* Table */}
                <div className="bg-white rounded-xl hover:shadow-lg overflow-x-auto">
                    <table className="min-w-[900px] w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm">Website</th>
                                <th className="text-left px-4 py-3 text-sm">Date</th>
                                <th className="px-4 py-3 text-sm">Bugs</th>
                                <th className="px-4 py-3 text-sm">Security</th>
                                <th className="px-4 py-3 text-sm">Score</th>
                                <th className="px-4 py-3 text-sm">Status</th>
                                <th className="px-4 py-3 text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredScans.map((scan) => (
                                <tr key={scan.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-blue-600">
                                        {scan.websiteUrl}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {scan.scanDate} {scan.scanTime}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">{scan.bugsFound}</td>
                                    <td className="px-4 py-3 text-center">
                                        {scan.securityIssues}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${getScoreColor(
                                                scan.overallScore
                                            )}`}
                                        >
                                            {scan.overallScore}/100
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={getStatusBadge(scan.status)}>
                                            {scan.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                disabled={scan.status !== "completed"}
                                                onClick={() => navigate("/scan-results")}
                                                className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                disabled={scan.status !== "completed"}
                                                className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                                            >
                                                <Download size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteScan(scan.id)}
                                                className="p-2 border rounded hover:bg-red-100 text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredScans.length === 0 && (
                    <p className="text-center text-gray-500">
                        No scans found.
                    </p>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ScanHistory;
