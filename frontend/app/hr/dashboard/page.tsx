"use client";
import { AppShell }  from "@/src/shared/components/app-shell";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { Users }     from "lucide-react";
export default function HRDashboard() {
  return (
    <AppShell requiredModule="hr">
      <div className="max-w-[1440px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border"
            style={{ background:"rgba(167,139,250,0.1)", borderColor:"rgba(167,139,250,0.25)", color:"#a78bfa" }}>
            <Users size={10} /> HR MODULE
          </div>
          <h1 className="text-[26px] font-display font-bold text-slate-800">HR &amp; Payroll</h1>
          <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">Employee lifecycle · Leave · Payroll · Compliance</p>
        </div>
        <GlassCard className="p-12 text-center border-2 border-dashed border-white/[0.07]">
          <Users size={36} className="mx-auto mb-4" style={{ color:"rgba(167,139,250,0.3)" }} />
          <p className="text-[14px] font-semibold text-[#9aa3bb] mb-1">HR Module — Pavithraa</p>
          <p className="text-[11px] text-[#5c667e] font-mono">Build EmployeeTable, LeaveManager, PayrollSummary in src/modules/hr/components/</p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
