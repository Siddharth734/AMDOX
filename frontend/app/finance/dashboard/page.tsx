"use client";
import "../../erp-module.css";
import { AppShell } from "@/src/shared/components/app-shell";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight,
  Search, Maximize2, ChevronDown, CreditCard, Receipt,
} from "lucide-react";

const TICK = { fontSize: 9, fill: "#9099b8", fontFamily: "-apple-system, sans-serif" };

export default function FinanceDashboard() {
  const kpis = [
    { label: "Total Revenue",  value: "$2,450.8K", change: "+12.5%", up: true,  icon: <DollarSign size={13} className="text-[#1fa866]" />, bg: "#e0f8ed" },
    { label: "Total Expenses", value: "$890.3K",    change: "-5.2%",  up: false, icon: <ArrowDownRight size={13} className="text-[#d04848]" />, bg: "#fff0f0" },
    { label: "Net Profit",     value: "$1,560.5K",  change: "+18.3%", up: true,  icon: <TrendingUp size={13} className="text-[#5b7cf5]" />, bg: "#e8eeff" },
    { label: "Cash Flow",      value: "$892.1K",    change: "+3.1%",  up: true,  icon: <CreditCard size={13} className="text-[#9b7cf5]" />, bg: "#f0eeff" },
  ];

  const revenueData = [
    { name: "Jan", revenue: 150, expenses: 90 },
    { name: "Feb", revenue: 210, expenses: 130 },
    { name: "Mar", revenue: 160, expenses: 100 },
    { name: "Apr", revenue: 260, expenses: 170 },
    { name: "May", revenue: 290, expenses: 190 },
    { name: "Jun", revenue: 360, expenses: 230 },
    { name: "Jul", revenue: 310, expenses: 220 },
    { name: "Aug", revenue: 420, expenses: 270 },
    { name: "Sep", revenue: 380, expenses: 258 },
    { name: "Oct", revenue: 470, expenses: 308 },
    { name: "Nov", revenue: 430, expenses: 285 },
    { name: "Dec", revenue: 520, expenses: 350 },
  ];

  const cashFlowData = [
    { name: "Jan", inflow: 400, outflow: 240 },
    { name: "Feb", inflow: 300, outflow: 139 },
    { name: "Mar", inflow: 550, outflow: 380 },
    { name: "Apr", inflow: 470, outflow: 290 },
    { name: "May", inflow: 390, outflow: 210 },
    { name: "Jun", inflow: 480, outflow: 310 },
  ];

  const transactions = [
    { id: "INV-2024001", desc: "Invoice #2024001",            type: "income",  amount: "$2,500",   date: "May 13", status: "completed" },
    { id: "EXP-SW001",  desc: "Software License — Adobe CC",  type: "expense", amount: "-$450",    date: "May 12", status: "completed" },
    { id: "INV-2024002", desc: "Invoice #2024002",            type: "income",  amount: "$3,200",   date: "May 11", status: "pending" },
    { id: "PAY-0510",   desc: "Payroll Distribution",          type: "expense", amount: "-$12,000", date: "May 10", status: "completed" },
    { id: "INV-2024003", desc: "Consulting Fee — Q2",         type: "income",  amount: "$8,750",   date: "May 09", status: "completed" },
  ];

  const summary = [
    { label: "Invoices Outstanding", value: "$85,200", color: "#d08a2e" },
    { label: "Accounts Payable",     value: "$12,400", color: "#d04848" },
    { label: "Bank Balance",         value: "$245,800", color: "#1fa866" },
  ];

  return (
    <AppShell requiredModule="finance">
      <div className="erp-page">
        {/* Topbar */}
        <div className="erp-topbar">
          <div>
            <div className="erp-badge" style={{ background: "#e0f8ed", color: "#1fa866" }}>
              <DollarSign size={10} /> FINANCE
            </div>
            <div className="pg-title">Finance Dashboard</div>
            <div className="pg-subtitle">GL · AP/AR · Transactions · Invoices · Reports</div>
          </div>
          <div className="erp-topbar-actions">
            <button className="erp-topbar-btn"><Receipt size={13} /> Export</button>
            <button className="erp-topbar-btn primary"><DollarSign size={13} /> New Invoice</button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="erp-kpi-row cols-4">
          {kpis.map((k, i) => (
            <div key={i} className="erp-kpi" style={{ background: k.bg }}>
              <div className="erp-kpi-icon" style={{ background: "rgba(255,255,255,0.7)" }}>{k.icon}</div>
              <div className="erp-kpi-label">{k.label}</div>
              <div className="erp-kpi-value">{k.value}</div>
              <div className={`erp-kpi-change ${k.up ? "up" : "down"}`}>
                {k.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {k.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="erp-grid-main" style={{ gridTemplateColumns: "1fr 280px" }}>
          {/* Left: Charts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Revenue Trends */}
            <div className="erp-card">
              <div className="erp-card-hd">
                <div className="erp-card-title">Revenue vs Expenses</div>
                <div className="fin-legend">
                  <div className="fin-legend-item"><div className="fin-legend-dot" style={{ background: "#6ec6e8" }} /> Revenue</div>
                  <div className="fin-legend-item"><div className="fin-legend-dot" style={{ background: "#a68af5" }} /> Expenses</div>
                </div>
              </div>
              <div className="fin-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6ec6e8" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#6ec6e8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a68af5" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#a68af5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="rgba(200,210,235,0.25)" strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={TICK} axisLine={false} tickLine={false} />
                    <YAxis tick={TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(200,210,235,0.4)", padding: "6px", fontSize: "10px" }} />
                    <Area type="monotone" dataKey="revenue" stroke="#6ec6e8" strokeWidth={2.5} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="expenses" stroke="#a68af5" strokeWidth={2} fill="url(#colorExp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cash Flow */}
            <div className="erp-card">
              <div className="erp-card-hd">
                <div className="erp-card-title">Monthly Cash Flow</div>
                <div className="erp-card-menu">···</div>
              </div>
              <div style={{ height: "180px", marginLeft: "-20px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cashFlowData} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="rgba(200,210,235,0.25)" strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={TICK} axisLine={false} tickLine={false} />
                    <YAxis tick={TICK} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: "8px", border: "1px solid rgba(200,210,235,0.4)", padding: "6px", fontSize: "10px" }} />
                    <Bar dataKey="inflow" stackId="a" fill="rgba(91,124,245,0.85)" barSize={26} radius={[0,0,0,0]} />
                    <Bar dataKey="outflow" stackId="a" fill="rgba(166,198,245,0.75)" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right: Financial Summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div className="erp-card" style={{ flex: 1 }}>
              <div className="erp-card-title" style={{ marginBottom: "14px" }}>Financial Summary</div>
              {summary.map((s, i) => (
                <div key={i} className="fin-summary-row">
                  <span className="fin-summary-label">{s.label}</span>
                  <span className="fin-summary-value" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
              <div className="fin-working-cap">
                <span className="fin-working-cap-label">Working Capital</span>
                <span className="fin-working-cap-value">$233,400</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="erp-card" style={{ padding: "14px" }}>
              <div className="erp-card-title" style={{ marginBottom: "10px" }}>Quick Actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {["Create Invoice", "Record Payment", "Run Report"].map((label, i) => (
                  <button key={i} className="erp-topbar-btn" style={{ width: "100%", justifyContent: "center", fontSize: "11px" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="erp-card">
          <div className="erp-card-hd">
            <div>
              <div className="erp-card-title">Recent Transactions</div>
              <div className="erp-card-subtitle">Latest financial activities</div>
            </div>
            <div className="erp-card-menu">···</div>
          </div>
          <div className="erp-table-wrap">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Type</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id}>
                    <td style={{ fontWeight: 600, color: "#1e2845" }}>{tx.desc}</td>
                    <td><span className={`fin-tx-type ${tx.type}`}>{tx.type === "income" ? "Income" : "Expense"}</span></td>
                    <td style={{ textAlign: "right", fontWeight: 700, color: tx.type === "income" ? "#1fa866" : "#d04848" }}>{tx.amount}</td>
                    <td><span className={`erp-status ${tx.status}`}><span className="dot" />{tx.status === "completed" ? "Completed" : "Pending"}</span></td>
                    <td>{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
