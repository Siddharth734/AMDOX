"use client";
import Link from "next/link";
import {
  DollarSign, Users, Package, FolderKanban,
  BarChart3, FileBarChart, ArrowUpRight,
} from "lucide-react";
import { useQuickModules } from "@/src/hooks/useData";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { useAuth } from "@/src/hooks/useAuth";
import type { QuickModule } from "@/src/types";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  DollarSign, Users, Package, FolderKanban, BarChart3, FileBarChart,
};

function QuickCard({ mod }: { mod: QuickModule }) {
  const Icon = ICON_MAP[mod.icon] ?? DollarSign;
  return (
    <Link href={mod.href} className="block group">
      <GlassCard padding="md" className="h-full transition-all duration-300 group-hover:-translate-y-1">
        {/* Icon + Arrow */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background:`${mod.color}18` }}>
            <span style={{ color: mod.color }}><Icon size={19} /></span>
          </div>
          <ArrowUpRight size={15} className="text-[#363d52] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        {/* Title */}
        <p className="text-[13px] font-semibold text-[#e4e9f5] leading-none mb-1">{mod.label}</p>
        <p className="text-[11px] text-[#5c667e] mb-4 leading-snug">{mod.description}</p>
        {/* Stat */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-[18px] font-display font-700 leading-none" style={{ color: mod.color }}>
            {mod.stat}
          </span>
          <span className="text-[10px] font-mono text-[#5c667e]">{mod.statLabel}</span>
        </div>
        {/* Bottom accent */}
        <div className="mt-4 h-px w-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background:`linear-gradient(90deg, ${mod.color}60, transparent)` }} />
      </GlassCard>
    </Link>
  );
}

function QuickCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-3">
      <div className="flex justify-between">
        <div className="w-10 h-10 rounded-xl shimmer" />
        <div className="w-4 h-4 rounded shimmer" />
      </div>
      <div className="h-3 w-20 rounded shimmer" />
      <div className="h-3 w-32 rounded shimmer" />
      <div className="h-5 w-16 rounded shimmer mt-2" />
    </div>
  );
}

export function QuickAccessGrid() {
  const { data, isLoading } = useQuickModules();
  const { can } = useAuth();

  if (isLoading) {
    return (
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#5c667e] mb-3">Quick Access</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {[0,1,2,3,4,5].map(i => <QuickCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  // Filter by role access
  const accessible = data?.filter(m => can(m.id) || m.id === "analytics") ?? [];

  return (
    <div>
      <p className="text-[11px] font-mono uppercase tracking-widest text-[#5c667e] mb-3">Quick Access</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 stagger-children">
        {accessible.map(mod => <QuickCard key={mod.id} mod={mod} />)}
      </div>
    </div>
  );
}
