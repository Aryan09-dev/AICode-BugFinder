import api from "./api";

export const websiteAnalyze = (data) => {
  return api.post("/scan/analyze", data);
};
