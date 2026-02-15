import { useState } from "react";
import { Plus, Upload, Search, Filter, Pencil } from "lucide-react";

import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const ManualBug = () => {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const [bugTitle, setBugTitle] = useState("");
    const [bugDescription, setBugDescription] = useState("");
    const [bugSeverity, setBugSeverity] = useState("medium");
    const [bugUrl, setBugUrl] = useState("");

    const [editingBugId, setEditingBugId] = useState(null);


    const handleEditBug = (bug) => {
        setEditingBugId(bug.id);
        setBugTitle(bug.title);
        setBugDescription(bug.description);
        setBugSeverity(bug.severity);
        setBugUrl(bug.pageUrl);
        setIsDialogOpen(true);
    };



    const [bugs, setBugs] = useState([
        {
            id: 1,
            title: "Login button not responding on mobile",
            description: "Login button not responding on iPhone",
            severity: "high",
            pageUrl: "/login",
            status: "open",
            dateReported: "2025-12-28",
        },
        {
            id: 2,
            title: "Footer typo",
            description: "Copyight typo in footer",
            severity: "low",
            pageUrl: "/",
            status: "fixed",
            dateReported: "2025-12-26",
        },
    ]);

    const handleSubmitBug = (e) => {
        e.preventDefault();

        if (editingBugId) {
            // UPDATE BUG
            setBugs(
                bugs.map((bug) =>
                    bug.id === editingBugId
                        ? {
                            ...bug,
                            title: bugTitle,
                            description: bugDescription,
                            severity: bugSeverity,
                            pageUrl: bugUrl,
                        }
                        : bug
                )
            );
        } else {
            // ADD NEW BUG
            setBugs([
                {
                    id: Date.now(),
                    title: bugTitle,
                    description: bugDescription,
                    severity: bugSeverity,
                    pageUrl: bugUrl,
                    status: "open",
                    dateReported: new Date().toISOString().split("T")[0],
                },
                ...bugs,
            ]);
        }

        // Reset
        setBugTitle("");
        setBugDescription("");
        setBugSeverity("medium");
        setBugUrl("");
        setEditingBugId(null);
        setIsDialogOpen(false);
    };


    const filteredBugs = bugs.filter((bug) => {
        const matchesSearch =
            bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bug.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" || bug.status === filterStatus;
        return matchesSearch && matchesStatus;
    });


    return (
        <>

            <DashboardLayout currentPage="manual-bugs" onNavigate={navigate}>
                <div className="space-y-6 max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-semibold font-montserrat text-primaryText">
                                Manual Bug Reports
                            </h2>
                            <p className="text-sm text-gray-600 font-robotoCondensed">
                                Track and manage manually reported bugs
                            </p>
                        </div>

                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="flex items-center gap-2 bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-950"
                        >
                            <Plus size={16} />
                            Report Bug
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                className="w-full pl-10 border rounded-lg px-3 py-2"
                                placeholder="Search bugs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <select
                            className="border rounded-lg px-3 py-2"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="open">Open</option>
                            <option value="fixed">Fixed</option>
                        </select>
                    </div>

                    {/* Bug List */}
                    <div className="space-y-4">
                        {filteredBugs.map((bug) => (
                            <div
                                key={bug.id}
                                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800">
                                            {bug.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {bug.description}
                                        </p>
                                        <p className="text-sm text-primaryText font-semibold mt-2">
                                            Page: <span><code>{bug.pageUrl}</code></span> | Reported: {bug.dateReported}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <span
                                            className={`px-3 py-1 text-sm rounded ${bug.severity === "high"
                                                ? "bg-red-500 text-white"
                                                : bug.severity === "medium"
                                                    ? "bg-yellow-500 text-white"
                                                    : "bg-green-500 text-white"
                                                }`}
                                        >
                                            {bug.severity}
                                        </span>

                                        <button
                                            onClick={() => handleEditBug(bug)}
                                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                                            title="Edit Bug"
                                        >
                                            <Pencil size={16} className="text-blue-600" />
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal */}
                    {isDialogOpen && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white rounded p-6 w-full max-w-lg">
                                <h3 className="text-lg font-semibold mb-4">
                                    {editingBugId ? "Edit Bug" : "Report New Bug"}
                                </h3>


                                <form onSubmit={handleSubmitBug} className="space-y-4">
                                    <input
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="Bug title"
                                        value={bugTitle}
                                        onChange={(e) => setBugTitle(e.target.value)}
                                        required
                                    />

                                    <textarea
                                        className="w-full border rounded px-3 py-2"
                                        rows="4"
                                        placeholder="Bug description"
                                        value={bugDescription}
                                        onChange={(e) => setBugDescription(e.target.value)}
                                        required
                                    />

                                    <select
                                        className="w-full border rounded px-3 py-2"
                                        value={bugSeverity}
                                        onChange={(e) => setBugSeverity(e.target.value)}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>

                                    <input
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="Page URL"
                                        value={bugUrl}
                                        onChange={(e) => setBugUrl(e.target.value)}
                                        required
                                    />

                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsDialogOpen(false)}
                                            className="px-4 py-2 border rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="px-4 py-2 bg-brandBlue text-white rounded">
                                            {editingBugId ? "Update Bug" : "Submit"}
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </DashboardLayout>
        </>
    )
};

export default ManualBug;
