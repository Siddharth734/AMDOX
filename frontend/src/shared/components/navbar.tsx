"use client";
import { useState } from "react";
import { Maximize2, LogOut } from "lucide-react";
import { useAuthStore } from "@/src/store/useAuthStore";

interface NavbarProps { title?: string; }

export function Navbar({ title = "Dashboard" }: NavbarProps) {
  const { logout } = useAuthStore();
  const [filter, setFilter] = useState("All users");

  return (
    <header className="h-14 flex items-center px-6 gap-4 bg-transparent flex-shrink-0">
      {/* Page title */}
      <h1 className="text-[22px] font-display font-700 text-slate-800 tracking-tight mr-auto">{title}</h1>

      {/* All users filter */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white/60 text-[12px] text-slate-600 cursor-pointer hover:border-slate-300 transition-colors">
        {filter}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>

      {/* Icons */}
      <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
        <Maximize2 size={16} />
      </button>
      <button onClick={logout} className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
        <LogOut size={16} />
      </button>
    </header>
  );
}
