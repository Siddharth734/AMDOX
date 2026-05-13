import { env } from "@/src/config/env";

const BASE = env.apiUrl;

export const dashboardService = {
  // Overall Dashboard Stats
  getOverallStats: async () => {
    const res = await fetch(`${BASE}/dashboard/stats`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch dashboard stats");
    return data;
  },

  // Recent Activities
  getRecentActivities: async (limit?: number) => {
    const query = new URLSearchParams();
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/dashboard/activities?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch recent activities");
    return data;
  },

  // Quick Stats
  getQuickStats: async () => {
    const res = await fetch(`${BASE}/dashboard/quick-stats`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch quick stats");
    return data;
  },
};
