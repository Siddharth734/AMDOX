import { env } from "@/src/config/env";
import type { ApiResponse, QueryParams } from "@/src/types";
import { useAuthStore } from "@/src/store/useAuthStore";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Inject access token from secure Zustand in-memory state
    const state = useAuthStore.getState();
    if (state.accessToken) {
      headers["Authorization"] = `Bearer ${state.accessToken}`;
    }

    return headers;
  }

  private buildUrl(path: string, params?: QueryParams): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined) url.searchParams.set(k, String(v));
      });
    }
    return url.toString();
  }

  async get<T>(path: string, params?: QueryParams): Promise<ApiResponse<T>> {
    const res = await fetch(this.buildUrl(path, params), {
      headers: this.getHeaders(),
      credentials: "include",
    });
    if (res.status === 401) {
      // Try to refresh token
      const refreshed = await this.tryRefresh();
      if (refreshed) {
        const retry = await fetch(this.buildUrl(path, params), {
          headers: this.getHeaders(),
          credentials: "include",
        });
        if (!retry.ok) throw new Error(`API error ${retry.status}`);
        return retry.json();
      }
    }
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  }

  async post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({ message: `API error ${res.status}` }));
      throw new Error(data.message || `API error ${res.status}`);
    }
    return res.json();
  }

  async put<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
      credentials: "include",
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers: this.getHeaders(),
      credentials: "include",
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  }

  private async tryRefresh(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/refresh-token`, {
        credentials: "include",
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (data.data?.accessToken) {
        // Update the in-memory state immediately
        useAuthStore.setState({ accessToken: data.data.accessToken });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}

export const api = new ApiClient(env.apiUrl);
