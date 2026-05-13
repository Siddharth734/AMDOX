import { cn } from "@/src/lib/utils";
import { GlassCard, SkeletonChart } from "@/src/shared/ui/glass-card";

interface ChartWrapperProps {
  title:      string;
  subtitle?:  string;
  loading?:   boolean;
  height?:    number;
  children:   React.ReactNode;
  legend?:    React.ReactNode;
  action?:    React.ReactNode;
  badge?:     React.ReactNode;
  className?: string;
}

export function ChartWrapper({
  title, subtitle, loading, height = 220, children,
  legend, action, badge, className,
}: ChartWrapperProps) {
  if (loading) return <SkeletonChart height={height} />;

  return (
    <GlassCard className={className}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] font-semibold text-[#e4e9f5]">{title}</h3>
            {badge}
          </div>
          {subtitle && <p className="text-[11px] text-[#5c667e] font-mono mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {legend}
          {action}
        </div>
      </div>
      {children}
    </GlassCard>
  );
}

/* Shared tooltip shell used across all charts */
export function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-3 text-xs"
      style={{ background:"rgba(13,15,26,0.97)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 8px 32px rgba(0,0,0,0.5)" }}>
      {label && <p className="font-mono font-semibold text-[#e4e9f5] mb-2">{label}</p>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="text-[#9aa3bb]">{entry.name}:</span>
          <span className="font-mono text-[#e4e9f5] font-medium">
            {entry.value > 10000 ? `$${(entry.value/1e6).toFixed(1)}M` : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export const TICK_STYLE = { fontSize:11, fill:"#363d52", fontFamily:"JetBrains Mono" };
