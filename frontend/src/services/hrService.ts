import { env } from "@/src/config/env";

const BASE = env.apiUrl;

export const hrService = {
  // Dashboard
  getDashboard: async () => {
    const res = await fetch(`${BASE}/hr/dashboard`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch HR dashboard");
    return data;
  },

  // Employees
  getEmployees: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/hr/employees?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch employees");
    return data;
  },

  getEmployee: async (id: string) => {
    const res = await fetch(`${BASE}/hr/employees/${id}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch employee");
    return data;
  },

  createEmployee: async (payload: any) => {
    const res = await fetch(`${BASE}/hr/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create employee");
    return data;
  },

  updateEmployee: async (id: string, payload: any) => {
    const res = await fetch(`${BASE}/hr/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update employee");
    return data;
  },

  // Leave Management
  getLeaveRequests: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/hr/leave?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch leave requests");
    return data;
  },

  createLeaveRequest: async (payload: any) => {
    const res = await fetch(`${BASE}/hr/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create leave request");
    return data;
  },

  approveLeave: async (id: string) => {
    const res = await fetch(`${BASE}/hr/leave/${id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to approve leave");
    return data;
  },

  // Attendance
  getAttendance: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/hr/attendance?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch attendance");
    return data;
  },
};
