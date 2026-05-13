"use client";
import { AppShell } from "@/src/shared/components/app-shell";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { Settings } from "lucide-react";
const CARDS = [
  { label:"General",        desc:"Organization name, timezone, locale",       icon:"🏢" },
  { label:"Security & SSO", desc:"SAML/OIDC, MFA enforcement, session policy",icon:"🔒" },
  { label:"API & Webhooks", desc:"API keys, webhook endpoints, rate limits",  icon:"⚡" },
  { label:"Notifications",  desc:"Channel preferences, event subscriptions",  icon:"🔔" },
  { label:"Audit & Logs",   desc:"Retention policy, tamper detection, exports",icon:"📋"},
  { label:"Billing",        desc:"Subscription, usage limits, invoices",      icon:"💳" },
];
export default function SettingsPage() {
  return (
    <AppShell requiredModule="settings">
      <div className="max-w-[1440px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border border-white/[0.08] text-[#9aa3bb]"
            style={{ background:"rgba(255,255,255,0.04)" }}>
            <Settings size={10} /> SYSTEM SETTINGS
          </div>
          <h1 className="text-[26px] font-display font-700 text-white">Settings</h1>
          <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">Tenant config · SSO · API keys · Audit policies</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
          {CARDS.map(s => (
            <GlassCard key={s.label} className="cursor-pointer">
              <div className="text-2xl mb-3">{s.icon}</div>
              <p className="text-[13.5px] font-semibold text-[#e4e9f5] mb-1">{s.label}</p>
              <p className="text-[11px] text-[#5c667e] leading-relaxed">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
