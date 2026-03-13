import { Copy, CheckCircle, XCircle } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getScanResults } from "../../services/scanservice";

const tabs = [
  { id: "bugs", label: "Bugs" },
  { id: "code", label: "Code Quality" },
  { id: "performance", label: "Performance" },
  { id: "security", label: "Security" },
  { id: "ai", label: "AI Suggestions" },
];

const ScanResult = () => {
  const { scanId } = useParams();

  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("bugs");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getScanResults(scanId);
        setResult(response.data);
      } catch (error) {
        console.error("Failed to load scan results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [scanId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center text-gray-500">
          Loading scan results...
        </div>
      </DashboardLayout>
    );
  }

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
                  Website:{" "}
                  <span className="text-brandBlue">{result?.website_Url}</span>
                </p>

                <div className="mt-3 text-sm text-gray-600 space-x-6">
                  <span>Performance: {result?.performance_Score}</span>
                  <span>Security: {result?.security_Score}</span>
                  <span>Code Quality: {result?.code_Quality_Score}</span>
                </div>
              </div>

              {/* <div className="flex gap-2">
                <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                  <Download size={16} /> Export
                </button>
                <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                  <Share2 size={16} /> Share
                </button>
              </div> */}
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
                  ${
                    activeTab === tab.id
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
                  {result?.bugs?.length > 0 ? (
                    result.bugs.map((bug, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between">
                          <h4>{bug.title}</h4>

                          <span
                            className={`px-2 rounded text-sm text-white
              ${
                bug.severity === "High"
                  ? "bg-red-600"
                  : bug.severity === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-600"
              }`}
                          >
                            {bug.severity}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600">
                          {bug.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-6">
                      No record found
                    </p>
                  )}
                </div>
              )}

              {/* CODE QUALITY */}
              {activeTab === "code" && (
                <div className="grid md:grid-cols-2 gap-4">
                  {result?.codeQuality?.length > 0 ? (
                    result.codeQuality.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                        <span className="text-xs text-gray-400">
                          Severity: {item.severity}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-2 text-center py-6">
                      No record found
                    </p>
                  )}
                </div>
              )}

              {/* PERFORMANCE */}
              {activeTab === "performance" && (
                <div className="space-y-4">
                  {result?.performance?.length > 0 ? (
                    result.performance.map((page, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <p className="font-medium">{page.page_Url}</p>

                        <div className="text-gray-600 text-sm mt-2">
                          <p>Load Time: {page.load_Time_MS} ms</p>
                          <p>Page Size: {page.page_Size_KB} KB</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-6">
                      No record found
                    </p>
                  )}
                </div>
              )}
              {activeTab === "security" && (
                <div className="space-y-3">
                  {result?.security?.length > 0 ? (
                    result.security.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between p-3 border rounded"
                      >
                        <div className="flex items-center gap-2">
                          {item.status === "Present" ? (
                            <CheckCircle className="text-green-600" />
                          ) : (
                            <XCircle className="text-red-600" />
                          )}

                          {item.header_Name}
                        </div>

                        <span
                          className={`px-2 rounded text-sm text-white
            ${item.status === "Present" ? "bg-green-600" : "bg-red-600"}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-6">
                      No record found
                    </p>
                  )}
                </div>
              )}

              {/* AI SUGGESTIONS */}
              {activeTab === "ai" && (
                <div className="space-y-4">
                  {result?.bugs?.length > 0 ? (
                    result.bugs.slice(0, 2).map((bug, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Fix: {bug.title}</h4>

                        <pre className="bg-gray-900 text-white p-4 rounded text-sm relative">
                          <button
                            onClick={() => handleCopy(bug.description, index)}
                            className="absolute top-2 right-2"
                          >
                            {copiedIndex === index ? <CheckCircle /> : <Copy />}
                          </button>

                          {bug.description}
                        </pre>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-6">
                      No AI suggestions available
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ScanResult;
