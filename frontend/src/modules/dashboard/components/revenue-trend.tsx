"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useRevenueChart } from "@/src/hooks/useData";
import { ChartWrapper, ChartTooltip, TICK_STYLE } from "@/src/shared/ui/chart-wrapper";

function Legend({ items }: { items: { color: string; label: string; dash?: boolean }[] }) {
  return (
    <div className="flex items-center gap-4 text-[11px] font-mono text-[#5c667e]">
      {items.map(item => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className="w-5 h-[2px] rounded inline-block"
            style={{ background: item.dash ? undefined : item.color,
              backgroundImage: item.dash ? `repeating-linear-gradient(90deg,${item.color} 0,${item.color} 4px,transparent 4px,transparent 8px)` : undefined }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function RevenueTrendChart() {
  const { data, isLoading } = useRevenueChart();
  return (
    <ChartWrapper
      title="Revenue Trend"
      subtitle="FY2026 — Revenue · Expenses · Profit"
      loading={isLoading}
      legend={<Legend items={[
        { color:"#4f8ef7", label:"Revenue" },
        { color:"#5c667e", label:"Expenses", dash:true },
        { color:"#34d399", label:"Profit" },
      ]} />}
    >
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top:8, right:4, left:0, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke:"rgba(79,142,247,0.1)", strokeWidth:1 }} />
          <Line type="monotone" dataKey="revenue"  name="Revenue"  stroke="#4f8ef7" strokeWidth={2.5} dot={{ r:3, fill:"#4f8ef7", strokeWidth:0 }} activeDot={{ r:5 }} />
          <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#5c667e" strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
          <Line type="monotone" dataKey="profit"   name="Profit"   stroke="#34d399" strokeWidth={2}   dot={{ r:2, fill:"#34d399", strokeWidth:0 }} activeDot={{ r:4 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
