import api from "./api";

export const websiteAnalyze = (data) => {
  return api.post("/scan/analyze", data);
};

export const getScanResults = (scanId) => {
  return api.get(`/scan/${scanId}/results`);
};

export const getUserScans = () => {
  return api.get("/scan");
};

export const downloadScanReport = (scanId) => {
  return api.get(`/scan/${scanId}/download`, {
    responseType: "blob",
  });
};
