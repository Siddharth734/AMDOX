"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import { useMonthlyPerf } from "@/src/hooks/useData";
import { ChartWrapper, TICK_STYLE } from "@/src/shared/ui/chart-wrapper";

function PerfTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const target = payload.find((p: any) => p.dataKey === "target");
  const actual = payload.find((p: any) => p.dataKey === "actual");
  const beat   = (actual?.value ?? 0) >= (target?.value ?? 0);
  return (
    <div className="rounded-xl px-3 py-3 text-xs"
      style={{ background:"rgba(13,15,26,0.97)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 8px 32px rgba(0,0,0,0.5)" }}>
      <p className="font-mono font-semibold text-[#e4e9f5] mb-2">{label}</p>
      <div className="flex items-center gap-2 py-0.5">
        <div className="w-2 h-2 rounded-full bg-[#4f8ef7]" />
        <span className="text-[#9aa3bb]">Actual:</span>
        <span className="font-mono text-[#e4e9f5]">${((actual?.value ?? 0)/1e6).toFixed(2)}M</span>
      </div>
      <div className="flex items-center gap-2 py-0.5">
        <div className="w-2 h-2 rounded-full" style={{ background:"rgba(255,255,255,0.2)" }} />
        <span className="text-[#9aa3bb]">Target:</span>
        <span className="font-mono text-[#e4e9f5]">${((target?.value ?? 0)/1e6).toFixed(2)}M</span>
      </div>
      <div className={`mt-2 text-[10px] font-mono font-semibold ${beat ? "text-emerald-400" : "text-rose-400"}`}>
        {beat ? `▲ +${(((actual?.value ?? 0) - (target?.value ?? 0))/1000).toFixed(0)}K above target` : `▼ ${(((target?.value ?? 0) - (actual?.value ?? 0))/1000).toFixed(0)}K below target`}
      </div>
    </div>
  );
}

export function MonthlyPerformance() {
  const { data, isLoading } = useMonthlyPerf();
  return (
    <ChartWrapper
      title="Monthly Performance"
      subtitle="Target vs actual revenue (USD)"
      loading={isLoading}
      legend={
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#5c667e]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background:"#4f8ef7" }} /> Actual</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block border" style={{ background:"rgba(255,255,255,0.08)", borderColor:"rgba(255,255,255,0.2)" }} /> Target</span>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top:8, right:4, left:0, bottom:0 }} barGap={4} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
          <Tooltip content={<PerfTooltip />} cursor={{ fill:"rgba(255,255,255,0.02)" }} />
          <Bar dataKey="target" name="Target" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} radius={[4,4,0,0]} />
          <Bar dataKey="actual" name="Actual" fill="#4f8ef7" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
