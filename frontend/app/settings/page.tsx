"use client";
import "../erp-module.css";
import { AppShell } from "@/src/shared/components/app-shell";
import {
  Settings, Building2, Shield, Webhook, Bell,
  ScrollText, CreditCard, ChevronRight, Globe, Key,
  Users, Database, Palette, Lock,
} from "lucide-react";

const SECTIONS = [
  {
    title: "Organization",
    cards: [
      { label: "General",         desc: "Organization name, timezone, locale, branding",          icon: <Building2 size={18} />, color: "#5b7cf5", bg: "#e8eeff" },
      { label: "Appearance",      desc: "Theme preferences, dashboard layout, custom colors",     icon: <Palette size={18} />,   color: "#9b7cf5", bg: "#f0eeff" },
      { label: "Localization",    desc: "Language, date format, currency, number formatting",      icon: <Globe size={18} />,     color: "#38b4e0", bg: "#e0f4ff" },
    ],
  },
  {
    title: "Security & Access",
    cards: [
      { label: "Security & SSO",  desc: "SAML/OIDC configuration, MFA enforcement, session policy", icon: <Shield size={18} />,   color: "#1fa866", bg: "#e0f8ed" },
      { label: "API & Webhooks",  desc: "API keys, webhook endpoints, rate limits, OAuth apps",      icon: <Webhook size={18} />,  color: "#d08a2e", bg: "#fff6e8" },
      { label: "Access Control",  desc: "Roles, permissions, module access, user groups",             icon: <Key size={18} />,      color: "#5b7cf5", bg: "#e8eeff" },
    ],
  },
  {
    title: "System",
    cards: [
      { label: "Notifications",   desc: "Channel preferences, event subscriptions, quiet hours",    icon: <Bell size={18} />,          color: "#9b7cf5", bg: "#f0eeff" },
      { label: "Audit & Logs",    desc: "Retention policy, tamper detection, log exports",           icon: <ScrollText size={18} />,    color: "#38b4e0", bg: "#e0f4ff" },
      { label: "Billing",         desc: "Subscription plans, usage limits, payment methods",         icon: <CreditCard size={18} />,    color: "#1fa866", bg: "#e0f8ed" },
      { label: "Data Management", desc: "Backups, data retention, import/export, compliance",        icon: <Database size={18} />,       color: "#d08a2e", bg: "#fff6e8" },
      { label: "Team",            desc: "Invite members, manage seats, team directories",             icon: <Users size={18} />,         color: "#5b7cf5", bg: "#e8eeff" },
      { label: "Privacy",         desc: "Data processing, consent management, cookie policy",         icon: <Lock size={18} />,          color: "#d04848", bg: "#fff0f0" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <AppShell requiredModule="settings">
      <div className="erp-page">
        {/* Topbar */}
        <div className="erp-topbar">
          <div>
            <div className="erp-badge" style={{ background: "#f0eeff", color: "#9b7cf5" }}>
              <Settings size={10} /> SETTINGS
            </div>
            <div className="pg-title">Settings</div>
            <div className="pg-subtitle">Tenant config · SSO · API keys · Audit policies</div>
          </div>
        </div>

        {/* Settings Sections */}
        {SECTIONS.map((section, si) => (
          <div key={si}>
            <div className="erp-sec-row">
              <div className="erp-sec-label">{section.title}</div>
            </div>
            <div className="erp-grid-3">
              {section.cards.map((card, ci) => (
                <div
                  key={ci}
                  className="erp-setting-card"
                  style={{ cursor: "pointer" }}
                >
                  <div className="erp-setting-icon" style={{ background: card.bg }}>
                    <span style={{ color: card.color }}>{card.icon}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="erp-setting-label">{card.label}</div>
                    <ChevronRight size={14} style={{ color: "#b0b8d0" }} />
                  </div>
                  <div className="erp-setting-desc">{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="erp-sec-row" style={{ marginTop: "8px" }}>
          <div className="erp-sec-label" style={{ color: "#d04848" }}>Danger Zone</div>
        </div>
        <div className="erp-card" style={{ border: "1px solid rgba(208,72,72,0.15)", background: "rgba(255,240,240,0.5)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#d04848", marginBottom: "3px" }}>Delete Organization</div>
              <div style={{ fontSize: "10.5px", color: "#8890b0", lineHeight: 1.4 }}>
                Permanently delete this organization and all associated data. This action cannot be undone.
              </div>
            </div>
            <button
              className="erp-topbar-btn"
              style={{
                background: "rgba(208,72,72,0.08)", color: "#d04848",
                border: "1px solid rgba(208,72,72,0.25)", flexShrink: 0,
              }}
            >
              Delete Organization
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
