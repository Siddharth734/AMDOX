import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Role } from "@/src/types";
import { authService } from "@/src/services/authService";

interface AuthStore {
  user:            User | null;
  accessToken:     string | null;
  pendingEmail:    string | null;   // email awaiting OTP verification
  isAuthenticated: boolean;
  isLoading:       boolean;
  error:           string | null;
  login:           (email: string, password: string) => Promise<void>;
  register:        (username: string, email: string, password: string) => Promise<void>;
  verifyOtp:       (otp: string) => Promise<boolean>;
  setRole:         (role: Role) => void;
  logout:          () => Promise<void>;
  clearError:      () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      pendingEmail: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.login(email, password);
          const { accessToken, user } = res.data;

          set({
            user: {
              id: user.id,
              name: user.name || user.username,
              email: user.email,
              role: (user.role || "admin") as Role,
              tenant: user.tenantId || "GLOBAL_PROD",
            },
            accessToken,
            pendingEmail: email,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Login failed";
          set({ isLoading: false, error: message });
          throw err;
        }
      },

      register: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
          await authService.register(username, email, password);
          set({ pendingEmail: email, isLoading: false });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Registration failed";
          set({ isLoading: false, error: message });
          throw err;
        }
      },

      verifyOtp: async (otp: string) => {
        const email = get().pendingEmail;
        if (!email) {
          set({ error: "No email pending verification" });
          return false;
        }
        set({ isLoading: true, error: null });
        try {
          await authService.verifyOtp(email, otp);
          set({ isLoading: false });
          return true;
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "OTP verification failed";
          set({ isLoading: false, error: message });
          return false;
        }
      },

      setRole: (role) => {
        const u = get().user;
        if (u) set({ user: { ...u, role } });
      },

      logout: async () => {
        try {
          await authService.logout();
        } catch {
          // ignore logout errors
        }
        set({ user: null, accessToken: null, pendingEmail: null, isAuthenticated: false });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "amdox-auth",
      partialize: (s) => ({
        user: s.user,
        pendingEmail: s.pendingEmail,
        isAuthenticated: s.isAuthenticated,
        // accessToken intentionally excluded to prevent persistence to LocalStorage (XSS protection)
      }),
    }
  )
);
