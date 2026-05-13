"use client";
import { AppShell }  from "@/src/shared/components/app-shell";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { DollarSign }from "lucide-react";
export default function FinanceDashboard() {
  return (
    <AppShell requiredModule="finance">
      <div className="max-w-[1440px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border"
            style={{ background:"rgba(52,211,153,0.1)", borderColor:"rgba(52,211,153,0.25)", color:"#34d399" }}>
            <DollarSign size={10} /> FINANCE MODULE
          </div>
          <h1 className="text-[26px] font-display font-bold text-slate-800">Finance</h1>
          <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">GL · AP/AR · Transactions · Invoices</p>
        </div>
        <GlassCard className="p-12 text-center border-2 border-dashed border-white/[0.07]">
          <DollarSign size={36} className="mx-auto mb-4" style={{ color:"rgba(52,211,153,0.3)" }} />
          <p className="text-[14px] font-semibold text-[#9aa3bb] mb-1">Finance Module — Pavithraa</p>
          <p className="text-[11px] text-[#5c667e] font-mono">Build TransactionsTable, InvoiceList, FinanceSummary in src/modules/finance/components/</p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
