"use client";
import "../erp-module.css";
import { AppShell } from "@/src/shared/components/app-shell";
import {
  FileBarChart, Download, Eye, Clock, Plus,
  FileText, TrendingUp, Filter,
} from "lucide-react";

const REPORTS = [
  { title: "Q2 FY26 Board Report",      module: "Finance",   date: "Apr 15, 2026", size: "2.4 MB", status: "ready",      pages: 24 },
  { title: "Payroll Summary — April",   module: "HR",        date: "Apr 14, 2026", size: "890 KB", status: "ready",      pages: 8 },
  { title: "Inventory Audit Report",    module: "Supply",    date: "Apr 12, 2026", size: "1.1 MB", status: "ready",      pages: 16 },
  { title: "Project Milestone Tracker", module: "Projects",  date: "Apr 11, 2026", size: "540 KB", status: "ready",      pages: 6 },
  { title: "AI Forecast Report — W17",  module: "Analytics", date: "Apr 10, 2026", size: "320 KB", status: "processing", pages: 12 },
  { title: "SLA Compliance Report",     module: "Analytics", date: "Apr 08, 2026", size: "780 KB", status: "ready",      pages: 10 },
  { title: "Quarterly Sales Analysis",  module: "Finance",   date: "Apr 05, 2026", size: "1.8 MB", status: "ready",      pages: 20 },
  { title: "Employee Onboarding Stats", module: "HR",        date: "Apr 02, 2026", size: "420 KB", status: "ready",      pages: 5 },
];

const MOD_CLR: Record<string, { bg: string; color: string }> = {
  Finance:   { bg: "#e0f8ed", color: "#1fa866" },
  HR:        { bg: "#f0eeff", color: "#9b7cf5" },
  Supply:    { bg: "#fff6e8", color: "#d08a2e" },
  Projects:  { bg: "#fff3f0", color: "#c0550a" },
  Analytics: { bg: "#e8eeff", color: "#5b7cf5" },
};

const stats = [
  { label: "Total Reports",   value: "156",   icon: <FileBarChart size={13} className="text-[#5b7cf5]" />, bg: "#e8eeff" },
  { label: "Generated Today", value: "8",     icon: <FileText size={13} className="text-[#1fa866]" />,     bg: "#e0f8ed" },
  { label: "Processing",      value: "2",     icon: <Clock size={13} className="text-[#d08a2e]" />,       bg: "#fff6e8" },
  { label: "Total Size",      value: "2.1 GB", icon: <TrendingUp size={13} className="text-[#9b7cf5]" />,  bg: "#f0eeff" },
];

export default function ReportsPage() {
  return (
    <AppShell requiredModule="reports">
      <div className="erp-page">
        {/* Topbar */}
        <div className="erp-topbar">
          <div>
            <div className="erp-badge" style={{ background: "#e8eeff", color: "#5b7cf5" }}>
              <FileBarChart size={10} /> REPORTS
            </div>
            <div className="pg-title">Reports</div>
            <div className="pg-subtitle">Generated reports · Exports · Board presentations</div>
          </div>
          <div className="erp-topbar-actions">
            <button className="erp-topbar-btn"><Filter size={13} /> Filter</button>
            <button className="erp-topbar-btn primary"><Plus size={13} /> Generate Report</button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="erp-kpi-row cols-4">
          {stats.map((s, i) => (
            <div key={i} className="erp-kpi" style={{ background: s.bg }}>
              <div className="erp-kpi-icon" style={{ background: "rgba(255,255,255,0.7)" }}>{s.icon}</div>
              <div className="erp-kpi-label">{s.label}</div>
              <div className="erp-kpi-value">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Reports List */}
        <div className="erp-card" style={{ padding: 0 }}>
          <div className="erp-card-hd" style={{ padding: "14px 18px", margin: 0 }}>
            <div className="erp-card-title">All Reports</div>
            <div className="erp-tabs">
              <button className="erp-tab active">All</button>
              <button className="erp-tab">Finance</button>
              <button className="erp-tab">HR</button>
              <button className="erp-tab">Analytics</button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {REPORTS.map((r, i) => {
              const mc = MOD_CLR[r.module] ?? { bg: "#f0f2f8", color: "#5a6080" };
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderBottom: i < REPORTS.length - 1 ? "1px solid rgba(200,210,235,0.2)" : "none",
                    transition: "background 0.15s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(91,124,245,0.03)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {/* Icon */}
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "12px",
                    background: mc.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <FileBarChart size={18} style={{ color: mc.color }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e2845" }}>{r.title}</span>
                      <span style={{
                        fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "6px",
                        background: mc.bg, color: mc.color,
                      }}>{r.module}</span>
                      {r.status === "processing" && (
                        <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "10px", fontWeight: 600, color: "#d08a2e" }}>
                          <Clock size={10} /> Processing…
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "11px", color: "#8890b0" }}>{r.date} · {r.size} · {r.pages} pages</div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                    <button className="erp-topbar-btn" style={{ padding: "5px 10px", fontSize: "11px" }}>
                      <Eye size={12} /> Preview
                    </button>
                    <button
                      className="erp-topbar-btn"
                      style={{
                        padding: "5px 10px", fontSize: "11px",
                        opacity: r.status === "processing" ? 0.4 : 1,
                        pointerEvents: r.status === "processing" ? "none" : "auto",
                      }}
                    >
                      <Download size={12} /> Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
