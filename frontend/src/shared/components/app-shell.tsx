"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/src/shared/components/sidebar";
import { useAuthStore } from "@/src/store/useAuthStore";
import { ROLES }        from "@/src/lib/rbac";
import type { Role }    from "@/src/types";

interface AppShellProps { children: React.ReactNode; title?: string; requiredModule?: string; }

export function AppShell({ children, title, requiredModule }: AppShellProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) { router.replace("/auth/login"); return; }
    if (requiredModule && user) {
      const allowed = ROLES[user.role as Role].allowedModules;
      if (!allowed.includes(requiredModule)) router.replace(ROLES[user.role as Role].defaultRoute);
    }
  }, [isAuthenticated, user, requiredModule, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex p-4"
      style={{
        background: "linear-gradient(135deg,#d9e8f8 0%,#dfd5f5 40%,#e8d5f5 70%,#edd8f2 100%)",
        gap: "12px"
      }}
    >
      <Sidebar />
      
      <div className="flex flex-col flex-1 min-h-[700px] relative z-10 overflow-hidden">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
