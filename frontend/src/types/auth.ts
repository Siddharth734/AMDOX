export type Role = "admin" | "hr" | "finance" | "inventory" | "projects";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  tenant: string;
  department?: string;
  lastLogin?: string;
}

export interface RoleConfig {
  id: Role;
  label: string;
  description: string;
  color: string;
  glow: string;
  icon: string;
  defaultRoute: string;
  allowedModules: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface MFAPayload {
  code: string;
  userId: string;
}
