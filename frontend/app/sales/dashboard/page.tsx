"use client";
import { AppShell } from "@/src/shared/components/app-shell";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { ShoppingCart } from "lucide-react";

export default function SalesDashboard() {
  return (
    <AppShell requiredModule="sales">
      <div className="max-w-[1440px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border"
            style={{ background:"rgba(245,158,11,0.1)", borderColor:"rgba(245,158,11,0.25)", color:"#f59e0b" }}>
            <ShoppingCart size={10} /> SALES MODULE
          </div>
          <h1 className="text-[26px] font-display font-bold text-slate-800">Sales</h1>
          <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">Orders · Customers · Quotations · Performance</p>
        </div>
        <GlassCard className="p-12 text-center border-2 border-dashed border-white/[0.07]">
          <ShoppingCart size={36} className="mx-auto mb-4" style={{ color:"rgba(245,158,11,0.3)" }} />
          <p className="text-[14px] font-semibold text-[#9aa3bb] mb-1">Sales Module</p>
          <p className="text-[11px] text-[#5c667e] font-mono">Build OrderTable, CustomerList, QuotationManager in src/modules/sales/components/</p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
