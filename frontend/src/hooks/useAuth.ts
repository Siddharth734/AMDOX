"use client";
import { useAuthStore } from "@/src/store/useAuthStore";
import { ROLES, canAccess } from "@/src/lib/rbac";
import type { Role } from "@/src/types";

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, setRole, logout } = useAuthStore();

  const role     = user?.role as Role | undefined;
  const roleCfg  = role ? ROLES[role] : null;

  return {
    user,
    isAuthenticated,
    isLoading,
    role,
    roleCfg,
    login,
    setRole,
    logout,
    can: (module: string) => role ? canAccess(role, module) : false,
  };
}
