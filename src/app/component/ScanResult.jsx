
import {
    Download,
    Share2,
    Copy,
    AlertTriangle,
    CheckCircle,
    XCircle,
} from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useState } from "react";



const tabs = [
    { id: "bugs", label: "Bugs (5)" },
    { id: "code", label: "Code Quality" },
    { id: "performance", label: "Performance" },
    { id: "security", label: "Security" },
    { id: "ai", label: "AI Suggestions" },
];

const ScanResult = () => {
    const [activeTab, setActiveTab] = useState("bugs");
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };
    return (
        <>
            <DashboardLayout>
                <div className="space-y-6 max-w-6xl mx-auto">

                    {/* ===== SUMMARY CARD ===== */}
                    <div className="bg-white rounded-xl p-6 shadow">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-semibold">Scan Results</h2>
                                <p className="text-gray-600">
                                    Website: <span className="text-brandBlue">https://example.com</span>
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Download size={16} /> Export
                                </button>
                                <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Share2 size={16} /> Share
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ===== TABS ===== */}
                    <div className="bg-white rounded-xl shadow">
                        <div className="flex border-b">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 font-medium
                  ${activeTab === tab.id
                                            ? "border-b-2 border-brandBlue text-brandBlue"
                                            : "text-gray-500"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* ===== TAB CONTENT ===== */}
                        <div className="p-6">

                            {/* BUGS */}
                            {activeTab === "bugs" && (
                                <div className="space-y-4">
                                    <div className="p-4 border rounded-lg">
                                        <div className="flex justify-between">
                                            <h4>Uncaught TypeError in main.js</h4>
                                            <span className="bg-red-600 text-white px-2 rounded text-sm">
                                                high
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">JavaScript Error • /dashboard</p>
                                    </div>
                                </div>
                            )}

                            {/* CODE QUALITY */}
                            {activeTab === "code" && (
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 border rounded-lg">
                                        <h4 className="font-medium">Unused CSS</h4>
                                        <p className="text-gray-600 text-sm">245 unused rules</p>
                                    </div>
                                </div>
                            )}

                            {/* PERFORMANCE */}
                            {activeTab === "performance" && (
                                <div className="text-gray-600">
                                    <p>Initial Load: 2.3s</p>
                                    <p>Fully Loaded: 3.5s</p>
                                </div>
                            )}

                            {/* SECURITY */}
                            {activeTab === "security" && (
                                <div className="space-y-3">
                                    <div className="flex justify-between p-3 border rounded">
                                        <div className="flex items-center gap-2">
                                            <XCircle className="text-red-600" />
                                            Content Security Policy
                                        </div>
                                        <span className="bg-red-600 text-white px-2 rounded text-sm">
                                            fail
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* AI SUGGESTIONS */}
                            {activeTab === "ai" && (
                                <div className="space-y-4">
                                    <div className="border rounded-lg p-4">
                                        <h4 className="font-semibold mb-2">
                                            Fix Uncaught TypeError
                                        </h4>
                                        <pre className="bg-gray-900 text-white p-4 rounded text-sm relative">
                                            <button
                                                onClick={() => handleCopy("if(element){}", 0)}
                                                className="absolute top-2 right-2"
                                            >
                                                {copiedIndex === 0 ? (
                                                    <CheckCircle />
                                                ) : (
                                                    <Copy />
                                                )}
                                            </button>
                                            if (element) {'{'} ... {'}'}
                                        </pre>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
};

export default ScanResult;
