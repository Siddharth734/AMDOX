import { env } from "@/src/config/env";

const BASE = env.apiUrl;

export const financeService = {
  // Dashboard
  getDashboard: async () => {
    const res = await fetch(`${BASE}/finance/dashboard`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch finance dashboard");
    return data;
  },

  // Transactions
  getTransactions: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/finance/transactions?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch transactions");
    return data;
  },

  createTransaction: async (payload: any) => {
    const res = await fetch(`${BASE}/finance/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create transaction");
    return data;
  },

  // Invoices
  getInvoices: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/finance/invoices?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch invoices");
    return data;
  },

  getInvoice: async (id: string) => {
    const res = await fetch(`${BASE}/finance/invoices/${id}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch invoice");
    return data;
  },

  createInvoice: async (payload: any) => {
    const res = await fetch(`${BASE}/finance/invoices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create invoice");
    return data;
  },

  updateInvoice: async (id: string, payload: any) => {
    const res = await fetch(`${BASE}/finance/invoices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update invoice");
    return data;
  },

  // Reports
  getFinancialReport: async (startDate?: string, endDate?: string) => {
    const query = new URLSearchParams();
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);
    const res = await fetch(`${BASE}/finance/reports?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch financial report");
    return data;
  },
};
