import { cn } from "@/src/lib/utils";

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
  if (loading) {
    return (
      <div className="erp-card" style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div className="shimmer" style={{ height: "16px", width: "140px" }} />
          <div className="shimmer" style={{ height: "24px", width: "80px", borderRadius: "999px" }} />
        </div>
        <div className="shimmer" style={{ height: `${height}px`, width: "100%", borderRadius: "12px" }} />
      </div>
    );
  }

  return (
    <div className={cn("erp-card", className)} style={{ padding: "16px 18px" }}>
      <div className="erp-card-hd">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="erp-card-title">{title}</div>
            {badge}
          </div>
          {subtitle && <div className="erp-card-subtitle">{subtitle}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {legend}
          {action}
        </div>
      </div>
      {children}
    </div>
  );
}

/* Shared tooltip shell used across all charts */
export function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(200,210,235,0.6)",
        boxShadow: "0 4px 20px rgba(100,120,200,0.12)",
        borderRadius: "10px",
        padding: "9px 12px",
        fontSize: "11px",
      }}
    >
      {label && <p style={{ fontWeight: 700, color: "#1e2845", marginBottom: "6px", fontSize: "12px" }}>{label}</p>}
      {payload.map((entry, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "2px 0" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: entry.color, flexShrink: 0 }} />
          <span style={{ color: "#5a6080" }}>{entry.name}:</span>
          <span style={{ fontWeight: 600, color: "#1e2845" }}>
            {entry.value > 10000 ? `$${(entry.value/1e6).toFixed(1)}M` : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export const TICK_STYLE = { fontSize: 9, fill: "#9099b8", fontFamily: "-apple-system, sans-serif" };
