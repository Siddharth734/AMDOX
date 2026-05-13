"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, DollarSign,
  Package, FolderKanban, Settings,
  FileBarChart, TrendingUp, ShoppingBag, Cpu, Bell
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuthStore } from "@/src/store/useAuthStore";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  LayoutDashboard, BarChart3: TrendingUp, Users, DollarSign,
  Package, FolderKanban, Settings, FileBarChart, Bell, Sales: ShoppingBag, Cpu
};

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  // Custom navigation items based on mockup sidebar
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { label: "Analytical Dashboard", href: "/analytics", icon: "Cpu" },
    { label: "Finance", href: "/finance", icon: "BarChart3" },
    { label: "Inventory", href: "/inventory/dashboard", icon: "Package" },
    { label: "HR", href: "/hr/dashboard", icon: "Users" },
    { label: "Projects", href: "/projects/dashboard", icon: "FolderKanban" },
    { label: "Sales", href: "/sales", icon: "Sales" },
    { label: "Reports", href: "/reports", icon: "FileBarChart" },
    { label: "Settings", href: "/settings", icon: "Settings" },
  ];

  return (
    <aside
      className="w-[178px] flex-shrink-0 flex flex-col transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.82)",
        borderRadius: "16px",
        padding: "16px 10px 14px",
        boxShadow: "0 4px 24px rgba(100, 120, 200, 0.10)",
      }}
    >
      {/* User profile at top */}
      <div className="flex items-center gap-[8px] pb-[14px] border-b border-[rgba(200,210,235,0.4)] mb-[10px] px-[6px]">
        <div className="w-[32px] h-[32px] rounded-full overflow-hidden flex items-center justify-center font-bold text-[11px] text-[#4a5a9a] shrink-0"
             style={{ background: "linear-gradient(135deg, #b0c4f0, #c8b8f0)" }}>
           JD
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[#3a3f5c] truncate">James Doe</p>
          <p className="text-[10px] text-[#8890b0] flex items-center gap-[3px] mt-[1px]">
            <Bell size={10} className="stroke-[#8890b0] stroke-[1.5]" />
            4 Notifications
          </p>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9099b8" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-[2px]" aria-label="Main navigation">
        {navItems.map(({ label, href, icon }, i) => {
          const Icon = ICON_MAP[icon] || LayoutDashboard;
          const isActive = pathname === href;

          // Dashboard is at top, Settings is at bottom
          if (label === "Settings") return null;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-[9px] px-[10px] py-[8px] rounded-[10px] transition-all duration-200 group",
                isActive 
                  ? "text-white font-semibold" 
                  : "text-[#5a6080] hover:bg-black/5"
              )}
              style={isActive ? {
                background: "linear-gradient(135deg, #5b7cf5, #7b8ff8)",
                boxShadow: "0 3px 12px rgba(91, 124, 245, 0.35)"
              } : {}}
            >
              <Icon size={15} className={cn("shrink-0", isActive ? "stroke-white" : "stroke-[#8890b0]")} strokeWidth={1.6} />
              <span className="text-[13px]">{label}</span>
            </Link>
          );
        })}
        
        <div className="h-[1px] bg-[rgba(200,210,235,0.4)] mx-[4px] my-[8px]" />

        {/* Bottom settings */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-[9px] px-[10px] py-[8px] rounded-[10px] transition-all duration-200 group",
            pathname === "/settings"
              ? "text-white font-semibold"
              : "text-[#5a6080] hover:bg-black/5"
          )}
          style={pathname === "/settings" ? {
            background: "linear-gradient(135deg, #5b7cf5, #7b8ff8)",
            boxShadow: "0 3px 12px rgba(91, 124, 245, 0.35)"
          } : {}}
        >
          <Settings size={15} className={cn("shrink-0", pathname === "/settings" ? "stroke-white" : "stroke-[#8890b0]")} strokeWidth={1.6} />
          <span className="text-[13px]">Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
