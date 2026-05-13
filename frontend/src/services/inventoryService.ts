import { env } from "@/src/config/env";

const BASE = env.apiUrl;

export const inventoryService = {
  // Dashboard
  getDashboard: async () => {
    const res = await fetch(`${BASE}/inventory/dashboard`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch inventory dashboard");
    return data;
  },

  // Products
  getProducts: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/inventory/products?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch products");
    return data;
  },

  getProduct: async (id: string) => {
    const res = await fetch(`${BASE}/inventory/products/${id}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch product");
    return data;
  },

  createProduct: async (payload: any) => {
    const res = await fetch(`${BASE}/inventory/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create product");
    return data;
  },

  updateProduct: async (id: string, payload: any) => {
    const res = await fetch(`${BASE}/inventory/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update product");
    return data;
  },

  // Stock Management
  getStock: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/inventory/stock?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch stock");
    return data;
  },

  updateStock: async (productId: string, quantity: number) => {
    const res = await fetch(`${BASE}/inventory/stock/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update stock");
    return data;
  },

  // Stock Transfers
  getTransfers: async (page?: number, limit?: number) => {
    const query = new URLSearchParams();
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));
    const res = await fetch(`${BASE}/inventory/transfers?${query}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch transfers");
    return data;
  },
};
