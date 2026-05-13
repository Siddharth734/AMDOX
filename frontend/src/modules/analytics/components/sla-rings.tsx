"use client";
import { useSLAItems } from "@/src/hooks/useData";
import { GlassCard } from "@/src/shared/ui/glass-card";

interface RingProps {
  value:    number;
  target:   number;
  label:    string;
  unit:     string;
  size?:    number;
}

function Ring({ value, target, label, unit, size = 80 }: RingProps) {
  const lowerBetter = unit === "ms" || unit === "h" || label.includes("Error");
  const good   = lowerBetter ? value <= target : value >= target;
  const pct    = lowerBetter
    ? Math.max(5, Math.min(100, (1 - (value - target) / target) * 100))
    : Math.min(100, (value / target) * 100);

  const r       = (size - 10) / 2;
  const circ    = 2 * Math.PI * r;
  const dash    = (pct / 100) * circ;
  const color   = good ? "#34d399" : "#fb7185";
  const trackClr = "rgba(255,255,255,0.06)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
          {/* Track */}
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackClr} strokeWidth={7} />
          {/* Progress */}
          <circle
            cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={7}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ filter:`drop-shadow(0 0 6px ${color}80)`, transition:"stroke-dasharray 1s ease" }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[13px] font-mono font-700 leading-none" style={{ color }}>
            {value}{unit}
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-[11px] font-medium text-[#9aa3bb] leading-snug">{label}</p>
        <p className="text-[9px] font-mono text-[#363d52] mt-0.5">Target: {target}{unit}</p>
      </div>
    </div>
  );
}

export function SLARings() {
  const { data, isLoading } = useSLAItems();

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[14px] font-semibold text-[#e4e9f5]">SLA Performance</h3>
          <p className="text-[11px] text-[#5c667e] font-mono mt-0.5">Real-time compliance rings</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation:"glow-pulse 2s ease-in-out infinite" }} />
          <span className="text-[10px] font-mono text-emerald-400">All targets met</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {[0,1,2,3,4].map(i => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full shimmer" />
              <div className="h-3 w-16 rounded shimmer" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 place-items-center">
          {data?.map((item, i) => (
            <Ring
              key={i}
              value={item.value}
              target={item.target}
              label={item.label}
              unit={item.unit}
              size={84}
            />
          ))}
        </div>
      )}
    </GlassCard>
  );
}
