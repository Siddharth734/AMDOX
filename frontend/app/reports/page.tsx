"use client";
import { AppShell }  from "@/src/shared/components/app-shell";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { Button }    from "@/src/shared/ui/button";
import { FileBarChart, Download, Eye, Clock } from "lucide-react";

const REPORTS = [
  { title:"Q2 FY26 Board Report",       module:"Finance",   date:"Apr 15, 2026", size:"2.4 MB", status:"ready" },
  { title:"Payroll Summary — April",    module:"HR",        date:"Apr 14, 2026", size:"890 KB", status:"ready" },
  { title:"Inventory Audit Report",     module:"Supply",    date:"Apr 12, 2026", size:"1.1 MB", status:"ready" },
  { title:"Project Milestone Tracker",  module:"Projects",  date:"Apr 11, 2026", size:"540 KB", status:"ready" },
  { title:"AI Forecast Report — W17",   module:"Analytics", date:"Apr 10, 2026", size:"320 KB", status:"processing" },
  { title:"SLA Compliance Report",      module:"Analytics", date:"Apr 08, 2026", size:"780 KB", status:"ready" },
];

const MOD_CLR: Record<string, string> = {
  Finance:"#34d399", HR:"#a78bfa", Supply:"#fbbf24",
  Projects:"#f472b6", Analytics:"#4f8ef7",
};

export default function ReportsPage() {
  return (
    <AppShell requiredModule="reports">
      <div className="max-w-[1100px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border border-white/[0.08] text-[#9aa3bb]"
              style={{ background:"rgba(255,255,255,0.04)" }}>
              <FileBarChart size={10} /> REPORTS
            </div>
            <h1 className="text-[26px] font-display font-700 text-white tracking-tight">Reports</h1>
            <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">Generated reports · Exports · Board presentations</p>
          </div>
          <Button variant="primary" size="md" icon={<FileBarChart size={14}/>}>Generate Report</Button>
        </div>

        <div className="grid grid-cols-1 gap-3 stagger-children">
          {REPORTS.map((r, i) => {
            const c = MOD_CLR[r.module] ?? "#4f8ef7";
            return (
              <GlassCard key={i} padding="none" className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${c}18` }}>
                    <FileBarChart size={18} style={{ color: c }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-[#e4e9f5] leading-none">{r.title}</p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background:`${c}15`, color: c }}>{r.module}</span>
                      {r.status === "processing" && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400">
                          <Clock size={10} /> Processing…
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5c667e] font-mono mt-1">{r.date} · {r.size}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="ghost" size="sm" icon={<Eye size={13}/>}>Preview</Button>
                    <Button variant="outline" size="sm" icon={<Download size={13}/>} disabled={r.status === "processing"}>Download</Button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
