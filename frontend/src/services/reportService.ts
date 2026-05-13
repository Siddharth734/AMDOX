import { env } from "@/src/config/env";

const BASE = env.apiUrl;

export const reportService = {
  // Financial Reports
  getFinancialReport: async (startDate?: string, endDate?: string) => {
    const query = new URLSearchParams();
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);
    const res = await fetch(`${BASE}/reports/financial?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch financial report");
    return data;
  },

  // HR Reports
  getHRReport: async (startDate?: string, endDate?: string) => {
    const query = new URLSearchParams();
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);
    const res = await fetch(`${BASE}/reports/hr?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch HR report");
    return data;
  },

  // Inventory Reports
  getInventoryReport: async (startDate?: string, endDate?: string) => {
    const query = new URLSearchParams();
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);
    const res = await fetch(`${BASE}/reports/inventory?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch inventory report");
    return data;
  },

  // Project Reports
  getProjectReport: async (projectId?: string) => {
    const query = new URLSearchParams();
    if (projectId) query.append("projectId", projectId);
    const res = await fetch(`${BASE}/reports/projects?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch project report");
    return data;
  },

  // Export Reports
  exportReport: async (type: string, format: "pdf" | "csv") => {
    const query = new URLSearchParams();
    query.append("type", type);
    query.append("format", format);
    const res = await fetch(`${BASE}/reports/export?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to export report");
    return res.blob();
  },
};
