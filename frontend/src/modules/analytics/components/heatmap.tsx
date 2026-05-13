"use client";
import { useHeatmap } from "@/src/hooks/useData";
import { GlassCard } from "@/src/shared/ui/glass-card";

const DAYS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const HOURS = [0,3,6,9,12,15,18,21];

function intensity(v: number): string {
  if (v === 0)   return "rgba(255,255,255,0.02)";
  if (v < 20)    return "rgba(79,142,247,0.10)";
  if (v < 40)    return "rgba(79,142,247,0.22)";
  if (v < 60)    return "rgba(79,142,247,0.38)";
  if (v < 80)    return "rgba(79,142,247,0.55)";
  return                "rgba(79,142,247,0.80)";
}

export function ActivityHeatmap() {
  const { data, isLoading } = useHeatmap();

  if (isLoading) return (
    <GlassCard>
      <div className="h-4 w-44 rounded shimmer mb-5" />
      <div className="h-40 w-full rounded-xl shimmer" />
    </GlassCard>
  );

  // Group by day
  const byDay: Record<string, Record<number, number>> = {};
  data?.forEach(cell => {
    if (!byDay[cell.day]) byDay[cell.day] = {};
    byDay[cell.day][cell.hour] = cell.value;
  });

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[14px] font-semibold text-[#e4e9f5]">Activity Heatmap</h3>
          <p className="text-[11px] text-[#5c667e] font-mono mt-0.5">API calls by day & hour (this week)</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#5c667e]">
          <span>Low</span>
          {["0.08","0.2","0.35","0.55","0.80"].map(op => (
            <div key={op} className="w-4 h-4 rounded-sm" style={{ background:`rgba(79,142,247,${op})` }} />
          ))}
          <span>High</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[480px]">
          {/* Hour labels */}
          <div className="flex mb-1 ml-10">
            {Array.from({ length:24 }, (_, h) => (
              <div key={h} className="flex-1 text-center">
                {HOURS.includes(h) && (
                  <span className="text-[9px] font-mono text-[#363d52]">{h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h-12}p`}</span>
                )}
              </div>
            ))}
          </div>

          {/* Grid */}
          {DAYS.map(day => (
            <div key={day} className="flex items-center gap-0 mb-1">
              <span className="w-10 text-[9px] font-mono text-[#5c667e] flex-shrink-0">{day}</span>
              {Array.from({ length:24 }, (_, hour) => {
                const v = byDay[day]?.[hour] ?? 0;
                return (
                  <div
                    key={hour}
                    className="flex-1 rounded-sm mx-[1px] transition-transform hover:scale-110 hover:z-10 relative cursor-default"
                    style={{ height:18, background: intensity(v) }}
                    title={`${day} ${hour}:00 — ${v} calls`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
