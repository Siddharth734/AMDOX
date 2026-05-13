"use client";
import { cn } from "@/src/lib/utils";
import { useSLAItems } from "@/src/hooks/useData";
import { GlassCard } from "@/src/shared/ui/glass-card";

export function SLATracker() {
  const { data, isLoading } = useSLAItems();

  return (
    <GlassCard>
      <h3 className="text-[14px] font-semibold text-[#e4e9f5] mb-1">SLA Tracker</h3>
      <p className="text-[11px] text-[#5c667e] font-mono mb-5">Real-time compliance status</p>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3 w-32 rounded shimmer" />
                <div className="h-3 w-12 rounded shimmer" />
              </div>
              <div className="h-1.5 w-full rounded-full shimmer" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 stagger-children">
          {data?.map((item, i) => {
            /* For latency, error-rate, DSR: lower is better */
            const lowerBetter = item.unit === "ms" || item.unit === "h" || item.label.includes("Error");
            const good = lowerBetter ? item.value <= item.target : item.value >= item.target;
            const pct  = lowerBetter
              ? Math.max(0, Math.min(100, (1 - item.value / item.target) * 100 + 60))
              : Math.min(100, (item.value / item.target) * 100);

            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-[#9aa3bb] font-medium">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-mono font-semibold text-[#e4e9f5]">
                      {item.value}{item.unit}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                      style={good
                        ? { background:"rgba(52,211,153,0.1)", color:"#34d399" }
                        : { background:"rgba(251,113,133,0.1)", color:"#fb7185" }}>
                      {good ? "✓" : "!"}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.05] overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width:`${pct}%`,
                      background: good ? "#4f8ef7" : "#fb7185",
                      boxShadow: good ? "0 0 8px rgba(79,142,247,0.3)" : "0 0 8px rgba(251,113,133,0.3)",
                    }} />
                </div>
                <p className="text-[10px] text-[#363d52] font-mono mt-1">Target: {item.target}{item.unit}</p>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
