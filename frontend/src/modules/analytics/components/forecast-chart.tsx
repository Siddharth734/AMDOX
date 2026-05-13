"use client";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useForecast } from "@/src/hooks/useData";
import { ChartWrapper } from "@/src/shared/ui/chart-wrapper";
import { TICK_STYLE } from "@/src/shared/ui/chart-wrapper";

function ForecastTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-3 text-xs"
      style={{ background:"rgba(13,15,26,0.97)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)" }}>
      <p className="font-mono font-semibold text-[#e4e9f5] mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="text-[#9aa3bb]">{entry.name}:</span>
          <span className="font-mono text-[#e4e9f5]">{entry.value ?? "—"} units</span>
        </div>
      ))}
    </div>
  );
}

export function ForecastChart() {
  const { data, isLoading } = useForecast();

  return (
    <ChartWrapper
      title="AI Demand Forecast"
      subtitle="8-week SKU-level prediction — MAPE 8.2%"
      loading={isLoading}
      badge={
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full ml-2"
          style={{ background:"rgba(79,142,247,0.1)", border:"1px solid rgba(79,142,247,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7]" style={{ animation:"glow-pulse 2s ease-in-out infinite" }} />
          <span className="text-[10px] font-mono text-[#4f8ef7]">LIVE</span>
        </div>
      }
      legend={
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#5c667e]">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-[2px] inline-block" style={{ backgroundImage:"repeating-linear-gradient(90deg,#4f8ef7 0,#4f8ef7 4px,transparent 4px,transparent 8px)" }} /> Predicted
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-[2px] rounded inline-block bg-emerald-400" /> Actual
          </span>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top:8, right:4, left:0, bottom:0 }}>
          <defs>
            <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#4f8ef7" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#4f8ef7" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#34d399" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#34d399" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="week" tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <Tooltip content={<ForecastTooltip />} cursor={{ stroke:"rgba(79,142,247,0.1)" }} />
          <Area type="monotone" dataKey="predicted" name="Predicted" stroke="#4f8ef7" strokeWidth={2} fill="url(#predGrad)" strokeDasharray="5 3" />
          <Area type="monotone" dataKey="actual"    name="Actual"    stroke="#34d399" strokeWidth={2.5} fill="url(#actGrad)" dot={{ r:3, fill:"#34d399", strokeWidth:0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
