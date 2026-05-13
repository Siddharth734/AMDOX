"use client";
import { cn } from "@/src/lib/utils";
import { GlassCard } from "@/src/shared/ui/glass-card";

const MODULES = [
  { name:"Financial Ledger",    uptime:"99.97%", ok:true  },
  { name:"HR & Payroll",        uptime:"100%",   ok:true  },
  { name:"Supply Chain",        uptime:"98.1%",  ok:false },
  { name:"ML Forecasting",      uptime:"99.8%",  ok:true  },
  { name:"Notification Engine", uptime:"99.9%",  ok:true  },
  { name:"API Gateway",         uptime:"99.99%", ok:true  },
];

export function SystemHealth() {
  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[14px] font-semibold text-[#e4e9f5]">System Health</h3>
          <p className="text-[11px] text-[#5c667e] font-mono mt-0.5">Module uptime — MTD</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation:"glow-pulse 3s ease-in-out infinite" }} />
          <span className="text-[10px] font-mono text-emerald-400">5/6 healthy</span>
        </div>
      </div>

      <div className="space-y-2 stagger-children">
        {MODULES.map((m, i) => (
          <div key={i}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl border transition-all duration-200 hover:border-white/[0.1]"
            style={{ background:"rgba(255,255,255,0.02)", borderColor:"rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: m.ok ? "#34d399" : "#fbbf24",
                  boxShadow:  m.ok ? "0 0 6px rgba(52,211,153,0.5)" : "0 0 6px rgba(251,191,36,0.5)",
                }} />
              <span className="text-[12px] text-[#9aa3bb]">{m.name}</span>
            </div>
            <span className="text-[11px] font-mono font-semibold" style={{ color: m.ok ? "#34d399" : "#fbbf24" }}>
              {m.uptime}
            </span>
          </div>
        ))}
      </div>

      {/* Overall SLA */}
      <div className="mt-4 p-3 rounded-xl border"
        style={{ background:"rgba(79,142,247,0.05)", borderColor:"rgba(79,142,247,0.15)" }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-[#9aa3bb]">Overall SLA</span>
          <span className="text-[13px] font-mono font-bold text-[#4f8ef7]">99.94%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/[0.05]">
          <div className="h-full rounded-full" style={{ width:"99.5%", background:"#4f8ef7", boxShadow:"0 0 12px rgba(79,142,247,0.4)" }} />
        </div>
        <p className="text-[10px] text-[#363d52] font-mono mt-1.5">Target: 99.9% · ✓ On track</p>
      </div>
    </GlassCard>
  );
}

/* ── Quick stat bar ─────────────────────────────── */
const QUICK_STATS = [
  { label:"API P95",       value:"218ms",  good:true  },
  { label:"Uptime MTD",    value:"99.94%", good:true  },
  { label:"Tenants",       value:"42",     good:null  },
  { label:"Payroll Due",   value:"3 days", good:null  },
  { label:"OCR Queue",     value:"3 items",good:false },
];

export function QuickStatBar() {
  return (
    <div className="flex items-center rounded-xl border overflow-hidden mb-6"
      style={{ background:"rgba(255,255,255,0.02)", borderColor:"rgba(255,255,255,0.06)" }}>
      {QUICK_STATS.map((s, i) => (
        <div key={i}
          className={cn(
            "flex-1 flex flex-col items-center gap-0.5 py-2.5 px-3",
            i < QUICK_STATS.length - 1 && "border-r",
          )}
          style={{ borderColor:"rgba(255,255,255,0.06)" }}>
          <span className="text-[13px] font-mono font-semibold"
            style={{ color: s.good === true ? "#34d399" : s.good === false ? "#fb7185" : "#fbbf24" }}>
            {s.value}
          </span>
          <span className="text-[10px] text-[#363d52] font-mono hidden sm:block">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
