"use client";
import { create } from "zustand";

interface TenantStore {
  tenantId:   string;
  tenantName: string;
  plan:       "starter" | "growth" | "enterprise";
  region:     string;
  setTenant:  (id: string, name: string) => void;
}

export const useTenantStore = create<TenantStore>(set => ({
  tenantId:   "GLOBAL_PROD",
  tenantName: "Amdox Technologies",
  plan:       "enterprise",
  region:     "us-east-1",
  setTenant:  (id, name) => set({ tenantId: id, tenantName: name }),
}));
