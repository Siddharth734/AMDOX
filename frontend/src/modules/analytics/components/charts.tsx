"use client";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, AreaChart, Area,
} from "recharts";
import { useRevenueChart, useDeptBudget, useForecast, useModuleUsage } from "@/src/hooks/useData";
import { GlassCard, SkeletonChart } from "@/src/shared/ui/glass-card";
import { fmt } from "@/src/lib/utils";

/* Shared tooltip */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-3 text-xs"
      style={{ background:"rgba(13,15,26,0.95)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }}>
      <p className="font-mono font-semibold text-[#e4e9f5] mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="text-[#9aa3bb]">{entry.name}:</span>
          <span className="font-mono text-[#e4e9f5] font-medium">
            {typeof entry.value === "number" && entry.value > 1000
              ? fmt.currency(entry.value, true)
              : typeof entry.value === "number" && entry.value < 10000
              ? `$${entry.value}K`
              : entry.value ?? "—"}
          </span>
        </div>
      ))}
    </div>
  );
}

const TICK = { fontSize:11, fill:"#363d52", fontFamily:"JetBrains Mono" };

/* ── Revenue Line Chart ─────────────────────────── */
export function RevenueChart() {
  const { data, isLoading } = useRevenueChart();
  if (isLoading) return <SkeletonChart />;

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-[14px] font-semibold text-[#e4e9f5]">Revenue Overview</h3>
          <p className="text-[11px] text-[#5c667e] font-mono mt-0.5">FY2026 — Revenue · Expenses · Profit</p>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-[#5c667e]">
          <span className="flex items-center gap-1.5"><span className="w-5 h-[2px] rounded inline-block" style={{ background:"#4f8ef7" }} /> Revenue</span>
          <span className="flex items-center gap-1.5"><span className="w-5 h-[2px] rounded inline-block" style={{ background:"rgba(255,255,255,0.2)", backgroundImage:"repeating-linear-gradient(90deg,#5c667e 0,#5c667e 4px,transparent 4px,transparent 8px)" }} /> Expenses</span>
          <span className="flex items-center gap-1.5"><span className="w-5 h-[2px] rounded inline-block" style={{ background:"#34d399" }} /> Profit</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top:8, right:4, left:0, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={TICK} axisLine={false} tickLine={false} />
          <YAxis tick={TICK} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke:"rgba(79,142,247,0.1)", strokeWidth:1 }} />
          <Line type="monotone" dataKey="revenue"  name="Revenue"  stroke="#4f8ef7" strokeWidth={2.5} dot={{ r:3, fill:"#4f8ef7", strokeWidth:0 }} activeDot={{ r:5 }} />
          <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#5c667e" strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
          <Line type="monotone" dataKey="profit"   name="Profit"   stroke="#34d399" strokeWidth={2}   dot={{ r:2, fill:"#34d399", strokeWidth:0 }} activeDot={{ r:4 }} />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

/* ── Dept Budget Bar ─────────────────────────────── */
export function DeptBudgetChart() {
  const { data, isLoading } = useDeptBudget();
  if (isLoading) return <SkeletonChart />;

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-[14px] font-semibold text-[#e4e9f5]">Budget vs Spend</h3>
          <p className="text-[11px] text-[#5c667e] font-mono mt-0.5">By department (USD K)</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#5c667e]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block border" style={{ background:"rgba(79,142,247,0.2)", borderColor:"rgba(79,142,247,0.4)" }} /> Budget</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background:"#4f8ef7" }} /> Spent</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top:8, right:4, left:0, bottom:0 }} barGap={3} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="dept" tick={TICK} axisLine={false} tickLine={false} />
          <YAxis tick={TICK} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill:"rgba(255,255,255,0.02)" }} />
          <Bar dataKey="budget" name="Budget" fill="rgba(79,142,247,0.2)"  stroke="rgba(79,142,247,0.4)" strokeWidth={1} radius={[4,4,0,0]} />
          <Bar dataKey="spent"  name="Spent"  fill="#4f8ef7" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

/* ── Forecast Area Chart ─────────────────────────── */
export function ForecastChart() {
  const { data, isLoading } = useForecast();
  if (isLoading) return <SkeletonChart />;

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-[14px] font-semibold text-[#e4e9f5]">AI Demand Forecast</h3>
          <p className="text-[11px] text-[#5c667e] font-mono mt-0.5">8-week SKU-level prediction · MAPE 8.2%</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background:"rgba(79,142,247,0.1)", border:"1px solid rgba(79,142,247,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7]" style={{ animation:"glow-pulse 2s ease-in-out infinite" }} />
          <span className="text-[10px] font-mono text-[#4f8ef7]">LIVE MODEL</span>
        </div>
      </div>
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
          <XAxis dataKey="week" tick={TICK} axisLine={false} tickLine={false} />
          <YAxis tick={TICK} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke:"rgba(79,142,247,0.1)", strokeWidth:1 }} />
          <Area type="monotone" dataKey="predicted" name="Predicted" stroke="#4f8ef7" strokeWidth={2} fill="url(#predGrad)" strokeDasharray="5 3" />
          <Area type="monotone" dataKey="actual"    name="Actual"    stroke="#34d399" strokeWidth={2.5} fill="url(#actGrad)" dot={{ r:3, fill:"#34d399", strokeWidth:0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

/* ── Module Usage Bar ─────────────────────────────── */
export function ModuleUsageChart() {
  const { data, isLoading } = useModuleUsage();
  if (isLoading) return <SkeletonChart />;

  return (
    <GlassCard>
      <div className="mb-1">
        <h3 className="text-[14px] font-semibold text-[#e4e9f5]">Module Usage</h3>
        <p className="text-[11px] text-[#5c667e] font-mono mt-0.5">Active users & sessions per module</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top:8, right:4, left:0, bottom:0 }} barGap={3} barCategoryGap="28%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="module" tick={TICK} axisLine={false} tickLine={false} />
          <YAxis tick={TICK} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill:"rgba(255,255,255,0.02)" }} />
          <Bar dataKey="users"    name="Users"    fill="#4f8ef7" radius={[4,4,0,0]} />
          <Bar dataKey="sessions" name="Sessions" fill="rgba(167,139,250,0.7)" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
