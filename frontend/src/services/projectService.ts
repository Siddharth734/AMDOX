import { env } from "@/src/config/env";

const BASE = env.apiUrl;

export const projectService = {
  // Dashboard
  getDashboard: async () => {
    const res = await fetch(`${BASE}/projects/dashboard`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch projects dashboard");
    return data;
  },

  // Projects
  getProjects: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/projects?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch projects");
    return data;
  },

  getProject: async (id: string) => {
    const res = await fetch(`${BASE}/projects/${id}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch project");
    return data;
  },

  createProject: async (payload: any) => {
    const res = await fetch(`${BASE}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create project");
    return data;
  },

  updateProject: async (id: string, payload: any) => {
    const res = await fetch(`${BASE}/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update project");
    return data;
  },

  deleteProject: async (id: string) => {
    const res = await fetch(`${BASE}/projects/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete project");
    return data;
  },

  // Tasks
  getTasks: async (projectId: string, page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/projects/${projectId}/tasks?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch tasks");
    return data;
  },

  createTask: async (projectId: string, payload: any) => {
    const res = await fetch(`${BASE}/projects/${projectId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create task");
    return data;
  },
};
