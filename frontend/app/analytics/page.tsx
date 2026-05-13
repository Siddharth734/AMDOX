"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/src/shared/components/app-shell";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { dashboardService } from "@/src/services/dashboardService";

/* ── Tooltip from charts.tsx ── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[10px] px-[9px] py-[9px] text-xs"
      style={{ background:"rgba(255,255,255,0.96)", border:"1px solid rgba(200,210,235,0.8)" }}>
      <p className="font-semibold text-[#2a2f50] mb-2" style={{ fontSize:"12px" }}>{label}</p>
      {payload.map((entry: any, i: number) => {
         if (entry.dataKey === "lb" || entry.dataKey === "mark") return null;
         const valStr = typeof entry.value === 'number' && entry.value > 0 ? entry.value : null;
         if (valStr === null) return null;
         return (
          <div key={i} className="flex items-center gap-[6px] py-0.5">
            <div className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ background: entry.color }} />
            <span className="text-[#5a6080]" style={{ fontSize:"11px" }}>{entry.name}:</span>
            <span className="text-[#5a6080] font-medium" style={{ fontSize:"11px" }}>{valStr}</span>
          </div>
         );
      })}
    </div>
  );
}

const TICK = { fontSize:9, fill:"#9099b8", fontFamily:"-apple-system, sans-serif" };

const DEMAND_DATA = [
  { month: 'Jan', hist: 120, proj: null, lb: 80,  mark: null },
  { month: 'Feb', hist: 180, proj: null, lb: 120, mark: null },
  { month: 'Mar', hist: 140, proj: null, lb: 100, mark: null },
  { month: 'Apr', hist: 220, proj: null, lb: 160, mark: null },
  { month: 'May', hist: 260, proj: null, lb: 200, mark: 260 },
  { month: 'Jun', hist: 310, proj: null, lb: 240, mark: null },
  { month: 'Jul', hist: 280, proj: 280,  lb: 220, mark: null },
  { month: 'Aug', hist: null,proj: 340,  lb: 260, mark: null },
  { month: 'Sep', hist: null,proj: 380,  lb: 290, mark: null },
  { month: 'Oct', hist: null,proj: 420,  lb: 320, mark: null },
  { month: 'Nov', hist: null,proj: 460,  lb: 350, mark: null },
  { month: 'Dec', hist: null,proj: 500,  lb: 380, mark: null }
];

const PROD_DATA = [
  { m: 'Jan', v1: 80,  v2: 40,  v3: 20 },
  { m: 'Feb', v1: 120, v2: 80,  v3: 50 },
  { m: 'Mar', v1: 100, v2: 60,  v3: 35 },
  { m: 'Apr', v1: 180, v2: 120, v3: 80 },
  { m: 'May', v1: 160, v2: 100, v3: 60 },
  { m: 'Jun', v1: 220, v2: 150, v3: 100 },
  { m: 'Jul', v1: 200, v2: 130, v3: 85 },
  { m: 'Aug', v1: 260, v2: 180, v3: 120 },
  { m: 'Sep', v1: 240, v2: 160, v3: 105 },
  { m: 'Oct', v1: 280, v2: 200, v3: 140 },
  { m: 'Nov', v1: 260, v2: 180, v3: 120 },
  { m: 'Dec', v1: 300, v2: 220, v3: 155 }
];

const spData=[
  [28,35,30,42,38,45,40,52,48,55,50,58],
  [22,28,25,32,30,38,34,40,36,44,40,48],
  [30,25,35,28,40,32,45,38,50,44,52,48],
  [20,28,24,35,30,40,36,44,40,50,46,54],
  [35,40,38,45,42,50,48,55,52,58,56,62],
];
const spColors=['#5b7cf5','#38b2e0','#9b7cf5','#5b7cf5','#38b2e0'];

function MiniSpark({ dataIndex }: { dataIndex: number }) {
  const color = spColors[dataIndex];
  const chartData = spData[dataIndex].map(v => ({ v }));
  return (
    <div className="kpi-spark">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fillOpacity={0.2} fill={color} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function SLARing({ value, label, color, dash }: { value: string, label: string, color: string, dash: string }) {
  return (
    <div className="sla-item">
      <svg width="80" height="80" viewBox="0 0 80 80" role="img" aria-label={`${value} ${label} ring`}>
        <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(200,210,235,0.5)" strokeWidth="7"/>
        <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={dash} strokeLinecap="round"
          transform="rotate(-90 40 40)" style={{ filter:`drop-shadow(0 0 4px ${color}80)` }}/>
        <text x="40" y="44" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2a2f50">{value}</text>
      </svg>
      <div className="sla-sublabel">{label}</div>
    </div>
  );
}

function HeatmapMap() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hotspots: Record<number, number[]> = { 3:[4,5,6,7], 4:[3,4,5,6,7,8], 5:[4,5,6,7,8,9], 6:[5,6,7,8], 7:[6,7,8] };
  const cellColor = (r: number, c: number) => {
    if(hotspots[r]&&hotspots[r].includes(c)){
      const dist=Math.abs(c-6)+Math.abs(r-5);
      if(dist<=1)return'#e55a2b';
      if(dist<=2)return'#f07a3a';
      if(dist<=3)return'#f5a04a';
      return'#1e40af';
    }
    if(r<3)return['#1e3a8a','#1e40af','#1e3a8a','#1e40af','#1e3a8a','#2558c8','#1e40af','#1e3a8a','#2558c8','#1e40af','#1e3a8a','#1e3a8a'][c];
    return['#1e3a8a','#1e40af','#1e3a8a','#2558c8','#1e40af','#1e3a8a','#2558c8','#1e40af','#1e3a8a','#1e3a8a','#2558c8','#1e40af'][c];
  };

  // Stable deterministic opacity per cell — avoids hydration mismatch from Math.random() in render
  const stableOpacity = (r: number, c: number) =>
    0.7 + (((r * 13 + c * 7 + r * c) % 10) / 10) * 0.3;

  return (
    <div style={{ overflowX:"auto" }}>
      <div style={{ minWidth:"200px" }}>
        <div className="hm-xlbs" style={{ display:"flex", gap:"2px", paddingLeft:"28px", marginTop:"2px" }}>
          {[2,4,6,8,10,12,14,16,18,20,22,24].map(n => <div key={n} className="hm-xl">{n}</div>)}
        </div>
        {months.map((m, r) => (
          <div key={m} className="hm-row">
            <div className="hm-lbl">{m}</div>
            {Array.from({ length: 12 }).map((_, c) => (
              <div
                key={c}
                className="hm-cell"
                style={{ background: cellColor(r, c), opacity: mounted ? stableOpacity(r, c) : 1 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticalDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await dashboardService.getAnalyticsData();
        setMetrics(res);
      } catch (err) {
        console.error("Error loading analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !metrics) {
    return (
      <AppShell title="Dashboard">
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-[3px] border-brand-200 border-t-brand-500 rounded-full animate-spin mb-3" />
          <span className="text-xs font-medium text-slate-500 tracking-wide">Initialising AI Telemetry Engine...</span>
        </div>
      </AppShell>
    );
  }

  const { kpis, sla, demandData, prodData, insights } = metrics;

  const kpiIcons = [
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5b7cf5" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38b2e0" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9b7cf5" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5b7cf5" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38b2e0" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
  ];

  const kpiBgColors = ["#e8eeff", "#e2f4ff", "#f0eeff", "#e8eeff", "#e2f4ff"];

  return (
    <AppShell title="Dashboard">
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing:border-box; margin:0; padding:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif }
        .anal-wrap { display:flex; flex-direction:column; gap:8px; min-width:0; height:100%; overflow:hidden; padding-right:4px }
        .topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom: 2px; }
        .pg-title { font-size:22px; font-weight:700; color:#2a2f50; letter-spacing:-0.3px }
        .tb-icons { display:flex; gap:6px }
        .tb-icon { width:28px; height:28px; border-radius:7px; background:rgba(255,255,255,0.7); display:flex; align-items:center; justify-content:center }
        .sec-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px }
        .sec-label { font-size:13px; font-weight:600; color:#3a3f5c }
        .filter-btn { display:flex; align-items:center; gap:4px; padding:4px 10px; background:rgba(255,255,255,0.75); border-radius:8px; font-size:11.5px; color:#5a6080; border:1px solid rgba(200,210,235,0.6) }
        .kpi-row { display:grid; grid-template-columns:repeat(5,1fr); gap:6px }
        .kpi-card { background:rgba(255,255,255,0.88); border-radius:14px; padding:10px 11px 7px; box-shadow:0 2px 12px rgba(100,120,200,0.08) }
        .kpi-icon-wrap { width:20px; height:20px; border-radius:6px; display:flex; align-items:center; justify-content:center; margin-bottom:4px }
        .kpi-label { font-size:9.5px; color:#8890b0; font-weight:500; margin-bottom:1px }
        .kpi-value { font-size:15px; font-weight:700; color:#2a2f50; letter-spacing:-0.3px; margin-bottom:1px }
        .kpi-change { font-size:9.5px; font-weight:600; color:#2ea86e }
        .kpi-spark { height:20px; margin-top:2px }
        .content-grid { display:grid; grid-template-columns:1fr 260px; gap:8px; flex:1; min-height:0 }
        .left-col { display:flex; flex-direction:column; gap:8px; min-height:0 }
        .right-col { display:flex; flex-direction:column; gap:8px; min-height:0 }
        .card { background:rgba(255,255,255,0.88); border-radius:14px; padding:11px 12px; box-shadow:0 2px 12px rgba(100,120,200,0.08); display:flex; flex-direction:column }
        .card-hd { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px }
        .card-title { font-size:12px; font-weight:700; color:#2a2f50 }
        .card-menu { color:#9099b8; font-size:15px; letter-spacing:1px; cursor:default; line-height:1 }
        .date-btn { display:flex; align-items:center; gap:4px; padding:3px 9px; background:#fff; border-radius:7px; border:1px solid rgba(200,210,235,0.8); font-size:10px; color:#5a6080; cursor:default }
        .sla-pair { display:flex; justify-content:space-around; margin-bottom:6px }
        .sla-item { display:flex; flex-direction:column; align-items:center; gap:4px }
        .sla-sublabel { font-size:10px; color:#8890b0; text-align:center }
        .res-bar { height:6px; border-radius:3px; background:rgba(200,210,235,0.4); overflow:hidden; margin-bottom:1px }
        .res-fill { height:100%; border-radius:3px; background:linear-gradient(90deg,#6ec6e8,#9b7cf5) }
        .insight-item { padding:6px 8px; border-radius:8px; border:1px solid rgba(200,210,235,0.5); margin-bottom:4px; background:rgba(255,255,255,0.5) }
        .insight-item:last-child { margin-bottom:0 }
        .ins-title { font-size:12px; font-weight:700; color:#2a2f50; margin-bottom:3px }
        .ins-body { font-size:10px; color:#5a6080; line-height:1.3; margin-bottom:3px }
        .ins-priority { font-size:9.5px; font-weight:600; color:#5a6080 }
        .ins-dot { width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:4px; vertical-align:middle }
        .hm-row { display:flex; align-items:center; gap:1px; margin-bottom:1px }
        .hm-lbl { font-size:8.5px; color:#8890b0; width:22px; text-align:right; flex-shrink:0 }
        .hm-cell { width:10px; height:10px; border-radius:1.5px; flex-shrink:0 }
        .hm-xl { font-size:8px; color:#8890b0; width:10px; text-align:center }
      `}} />
      
      <div className="anal-wrap custom-scrollbar">
        <div className="topbar">
          <div className="pg-title">Dashboard</div>
          <div className="tb-icons">
            <div className="tb-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9099b8" strokeWidth="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
            </div>
            <div className="tb-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9099b8" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            </div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 256px", gap:"8px", alignItems:"start" }}>
          <div>
            <div className="sec-row">
              <div className="sec-label">KPI cards</div>
              <div className="filter-btn">All users <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5a6080" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></div>
            </div>
            <div className="kpi-row">
              {kpis.map((kpi: any, i: number) => (
                <div key={i} className="kpi-card">
                  <div className="kpi-icon-wrap" style={{ background: kpiBgColors[i % kpiBgColors.length] }}>
                    {kpiIcons[i % kpiIcons.length]}
                  </div>
                  <div className="kpi-label">{kpi.label}</div>
                  <div className="kpi-value">{kpi.value}</div>
                  <div className="kpi-change">{kpi.change}</div>
                  <MiniSpark dataIndex={kpi.dataIndex || 0} />
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding:"11px 12px", height:"100%" }}>
            <div className="card-title" style={{ marginBottom:"8px" }}>SLA Metrics</div>
            <div className="sla-pair">
              <SLARing value={sla.uptime} label="Uptime" color="#5b7cf5" dash={sla.uptimeDash} />
              <SLARing value={sla.responseTime} label="Response Time" color="#6ec6e8" dash={sla.rtDash} />
            </div>
            <div style={{ padding:"0 4px" }}>
              <div className="sla-item" style={{ flexDirection:"row", justifyContent:"flex-start", gap:"8px", marginBottom:"6px" }}>
                <svg width="56" height="56" viewBox="0 0 56 56" role="img" aria-label="resolution rate ring">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(200,210,235,0.5)" strokeWidth="6"/>
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#9b7cf5" strokeWidth="6"
                    strokeDasharray={sla.rrDash} strokeLinecap="round"
                    transform="rotate(-90 28 28)" style={{ filter:"drop-shadow(0 0 3px rgba(155,124,245,0.5))" }}/>
                  <text x="28" y="32" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2a2f50">{sla.resolutionRate}</text>
                </svg>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"11px", fontWeight:600, color:"#5a6080", marginBottom:"5px" }}>Resolution Rate</div>
                  <div className="res-bar"><div className="res-fill" style={{ width: `${sla.rrPercent}%` }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="left-col">
            <div className="card" style={{ flex:1.2 }}>
              <div className="card-hd">
                <div className="card-title">AI Demand Forecasting</div>
                <div className="date-btn">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5a6080" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Date pick
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5a6080" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div style={{ position:"relative", flex:1, minHeight:"140px", marginLeft:"-20px", marginTop:"-5px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandData} margin={{ top:5, right:5, left:0, bottom:0 }}>
                    <defs>
                      <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6ec6e8" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#6ec6e8" stopOpacity={0.02}/>
                      </linearGradient>
                      <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b7cf5" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#9b7cf5" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(200,210,235,0.25)" />
                    <XAxis dataKey="month" tick={TICK} axisLine={false} tickLine={false} />
                    <YAxis tick={TICK} axisLine={false} tickLine={false} tickFormatter={v => v===0?'$0':`${v}M`} />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke:"rgba(200,210,235,0.8)", strokeWidth:1 }} />
                    <Area type="step" dataKey="hist" name="Historical" stroke="#6ec6e8" strokeWidth={2.5} fill="url(#histGrad)" dot={false} />
                    <Area type="step" dataKey="proj" name="Projected" stroke="#9b7cf5" strokeWidth={2} strokeDasharray="5 4" fill="url(#projGrad)" dot={false} />
                    <Area type="step" dataKey="lb" name="Lower bound" stroke="rgba(155,124,245,0.3)" strokeWidth={1} strokeDasharray="3 3" fill="none" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card" style={{ flex:1 }}>
              <div className="card-hd">
                <div className="card-title">Production Efficiency vs. Resource Allocation</div>
                <div className="card-menu">···</div>
              </div>
              <div style={{ position:"relative", flex:1, minHeight:"125px", marginLeft:"-20px", marginBottom:"-10px", marginTop:"-5px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={prodData} margin={{ top:5, right:5, left:0, bottom:0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(200,210,235,0.25)" />
                    <XAxis dataKey="m" tick={TICK} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: 'transparent' }} />
                    <Area type="monotone" dataKey="v1" name="Resource A" stroke="#6ec6e8" strokeWidth={2.5} fill="rgba(110,198,232,0.18)" dot={false} />
                    <Area type="monotone" dataKey="v2" name="Resource B" stroke="#9b7cf5" strokeWidth={2} fill="rgba(155,124,245,0.12)" dot={false} />
                    <Area type="monotone" dataKey="v3" name="Efficiency" stroke="#f5a862" strokeWidth={2} fill="rgba(245,168,98,0.10)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="right-col">
            <div className="card">
              <div className="card-hd">
                <div className="card-title">Usage Trends Heatmap</div>
                <div className="card-menu">···</div>
              </div>
              <HeatmapMap />
            </div>

            <div className="card" style={{ flex:1 }}>
              <div className="card-hd">
                <div className="card-title">AI Insights</div>
                <div className="card-menu">···</div>
              </div>
              {insights.map((insight: any, idx: number) => (
                <div key={idx} className="insight-item" style={{ marginBottom: idx === insights.length - 1 ? 0 : undefined }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"6px" }}>
                    <div className="ins-title">{insight.title}</div>
                    <div style={{ width:"8px", height:"8px", borderRadius:"50%", background: insight.color || "#5b7cf5", flexShrink:0, marginTop:"2px" }} />
                  </div>
                  <div className="ins-body">{insight.body}</div>
                  <div className="ins-priority"><span className="ins-dot" style={{ background: insight.color || "#9b7cf5" }} />Priority: {insight.priority}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
