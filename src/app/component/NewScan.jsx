import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const NewScan = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [scanOptions, setScanOptions] = useState({
        bugDetection: true,
        codeQuality: true,
        performance: true,
        security: true,
        accessibility: true,
    });

    // Validate real website URLs
    const isValidWebsite = (input) => {
        try {
            const urlObj = new URL(input.startsWith("http") ? input : "https://" + input);
            // Check hostname has at least one dot
            return urlObj.hostname.includes(".");
        } catch {
            return false;
        }
    };

    const handleStartScan = () => {
        if (!url || !isValidWebsite(url)) {
            alert("Please enter a real website (like google.com or example.com)");
            return;
        }

        setIsScanning(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        navigate("/scan-results");
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 400);
    };

    const toggleOption = (option) => {
        setScanOptions((prev) => ({ ...prev, [option]: !prev[option] }));
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="p-8 bg-white rounded-xl shadow-sm">
                <h2 className="text-3xl font-montserrat mb-6">Start New Website Analysis</h2>

                {/* URL Input */}
                <div className="mb-8 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        required
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isScanning}
                        className="w-full pl-10 h-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryText"
                    />
                </div>

                {/* Scan Options */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    {Object.entries(scanOptions).map(([key, value]) => (
                        <label
                            key={key}
                            className={`flex items-start font-robotoCondensed gap-3 p-4 border rounded-lg hover:border-brandBlue cursor-pointer ${key === "accessibility" ? "md:col-span-2" : ""
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={() => toggleOption(key)}
                                disabled={isScanning}
                                className="mt-1 accent-brandBlue"
                            />
                            <div>
                                <p className="capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                            </div>
                        </label>
                    ))}
                </div>

                {/* Progress */}
                {isScanning && (
                    <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                            <p className="text-blue-600">Analyzing website...</p>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            {progress}% Complete
                        </p>
                    </div>
                )}

                {/* Start Button */}
                <button
                    onClick={handleStartScan}
                    disabled={!url || isScanning}
                    className="w-full h-12 bg-brandBlue text-white rounded-lg hover:bg-blue-950 flex justify-center items-center gap-2 disabled:bg-gray-300"
                >
                    {isScanning ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Scanning...
                        </>
                    ) : (
                        <>
                            <Search className="w-5 h-5" />
                            Start Analysis
                        </>
                    )}
                </button>
            </div>



            {/* Info Card: What we analyze */}
            <div className="p-6 bg-blue-100 rounded-xl shadow-sm">
                <h3 className="text-2xl mb-4 font-montserrat font-medium">What we analyze:</h3>
                <ul className="list-disc font-robotoCondensed list-inside text-gray-600 space-y-1 text-sm">
                    <li>JavaScript errors and console warnings</li>
                    <li>Broken links and missing resources</li>
                    <li>Code quality issues and unused CSS</li>
                    <li>Performance bottlenecks and load times</li>
                    <li>Security vulnerabilities and missing headers</li>
                    <li>Accessibility compliance (WCAG 2.1)</li>
                </ul>
            </div>

        </div>




    );
};

export default NewScan;
