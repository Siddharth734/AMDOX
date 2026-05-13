import { env } from "@/src/config/env";

const BASE = env.apiUrl;

export const notificationService = {
  // Get notifications
  getNotifications: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/notifications?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch notifications");
    return data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const res = await fetch(`${BASE}/notifications/unread/count`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch unread count");
    return data;
  },

  // Mark as read
  markAsRead: async (id: string) => {
    const res = await fetch(`${BASE}/notifications/${id}/read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to mark notification as read");
    return data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const res = await fetch(`${BASE}/notifications/read-all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to mark all as read");
    return data;
  },

  // Delete notification
  deleteNotification: async (id: string) => {
    const res = await fetch(`${BASE}/notifications/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete notification");
    return data;
  },
};
