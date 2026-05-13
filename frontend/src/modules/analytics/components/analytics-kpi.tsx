"use client";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAnalyticsMetrics } from "@/src/hooks/useData";
import { GlassCard, SkeletonKPI } from "@/src/shared/ui/glass-card";

export function AnalyticsKPI() {
  const { data, isLoading } = useAnalyticsMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[0,1,2,3].map(i => <SkeletonKPI key={i} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger-children">
      {data?.map((m, i) => {
        const goodDown = m.label.includes("Latency") || m.label.includes("Error");
        const positive = goodDown ? m.trend === "down" : m.trend === "up";
        const color    = positive ? "#34d399" : "#fb7185";
        return (
          <GlassCard key={i} glow={positive ? "rgba(52,211,153,0.1)" : undefined}>
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#5c667e] mb-3">{m.label}</p>
            <p className="text-[26px] font-display font-700 text-white tracking-tight leading-none mb-2">{m.value}</p>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="flex items-center gap-0.5 text-[11px] font-mono font-semibold" style={{ color }}>
                {m.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(m.change)}%
              </span>
            </div>
            <p className="text-[10px] text-[#363d52] font-mono">{m.detail}</p>
          </GlassCard>
        );
      })}
    </div>
  );
}
