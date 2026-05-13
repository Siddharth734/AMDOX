"use client";
import { AppShell }  from "@/src/shared/components/app-shell";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { Package }   from "lucide-react";
export default function InventoryDashboard() {
  return (
    <AppShell requiredModule="inventory">
      <div className="max-w-[1440px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border"
            style={{ background:"rgba(251,191,36,0.1)", borderColor:"rgba(251,191,36,0.25)", color:"#fbbf24" }}>
            <Package size={10} /> INVENTORY MODULE
          </div>
          <h1 className="text-[26px] font-display font-700 text-white">Supply Chain &amp; Inventory</h1>
          <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">Inventory · PO Lifecycle · Vendors · Reorders</p>
        </div>
        <GlassCard className="p-12 text-center border-2 border-dashed border-white/[0.07]">
          <Package size={36} className="mx-auto mb-4" style={{ color:"rgba(251,191,36,0.3)" }} />
          <p className="text-[14px] font-semibold text-[#9aa3bb] mb-1">Inventory Module — Kalendra</p>
          <p className="text-[11px] text-[#5c667e] font-mono">Build InventoryTable, ReorderAlert, VendorList in src/modules/inventory/components/</p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
