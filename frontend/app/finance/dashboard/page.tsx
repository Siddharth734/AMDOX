"use client";
import "../../erp-module.css";
import { useState, useEffect } from "react";
import { AppShell } from "@/src/shared/components/app-shell";
import { financeService } from "@/src/services/financeService";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight,
  Search, Maximize2, ChevronDown, CreditCard, Receipt,
} from "lucide-react";

const TICK = { fontSize: 9, fill: "#9099b8", fontFamily: "-apple-system, sans-serif" };

export default function FinanceDashboard() {
  const [kpis, setKpis] = useState([
    { label: "Total Revenue",  value: "$0.0K", change: "0%", up: true,  icon: <DollarSign size={13} className="text-[#1fa866]" />, bg: "#e0f8ed" },
    { label: "Total Expenses", value: "$0.0K",    change: "0%",  up: false, icon: <ArrowDownRight size={13} className="text-[#d04848]" />, bg: "#fff0f0" },
    { label: "Net Profit",     value: "$0.0K",  change: "0%", up: true,  icon: <TrendingUp size={13} className="text-[#5b7cf5]" />, bg: "#e8eeff" },
    { label: "Cash Flow",      value: "$0.0K",    change: "0%",  up: true,  icon: <CreditCard size={13} className="text-[#9b7cf5]" />, bg: "#f0eeff" },
  ]);

  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [cashFlowData, setCashFlowData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState([
    { label: "Invoices Outstanding", value: "$0.0K", color: "#d08a2e" },
    { label: "Accounts Payable",     value: "$0.0K", color: "#d04848" },
    { label: "Bank Balance",         value: "$0.0K", color: "#1fa866" },
  ]);
  const [workingCapital, setWorkingCapital] = useState("$0");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await financeService.getDashboard();
        if (!active || !res.success || !res.data) return;

        const { dashboard } = res.data;
        
        if (dashboard.kpis) {
          setKpis([
            { label: "Total Revenue",  value: dashboard.kpis.totalRevenue, change: dashboard.kpis.revenueChange, up: dashboard.kpis.revenueUp, icon: <DollarSign size={13} className="text-[#1fa866]" />, bg: "#e0f8ed" },
            { label: "Total Expenses", value: dashboard.kpis.totalExpenses, change: dashboard.kpis.expensesChange, up: dashboard.kpis.expensesUp, icon: <ArrowDownRight size={13} className="text-[#d04848]" />, bg: "#fff0f0" },
            { label: "Net Profit",     value: dashboard.kpis.netProfit, change: dashboard.kpis.profitChange, up: dashboard.kpis.profitUp, icon: <TrendingUp size={13} className="text-[#5b7cf5]" />, bg: "#e8eeff" },
            { label: "Cash Flow",      value: dashboard.kpis.cashFlow, change: dashboard.kpis.cashFlowChange, up: dashboard.kpis.cashFlowUp, icon: <CreditCard size={13} className="text-[#9b7cf5]" />, bg: "#f0eeff" },
          ]);
        }

        if (dashboard.revenueData) setRevenueData(dashboard.revenueData);
        if (dashboard.cashFlowData) setCashFlowData(dashboard.cashFlowData);
        if (dashboard.transactions) setTransactions(dashboard.transactions);
        
        if (dashboard.summary) {
          setSummary([
            { label: "Invoices Outstanding", value: dashboard.summary.invoicesOutstanding, color: "#d08a2e" },
            { label: "Accounts Payable",     value: dashboard.summary.accountsPayable, color: "#d04848" },
            { label: "Bank Balance",         value: dashboard.summary.bankBalance, color: "#1fa866" },
          ]);
        }
        if (dashboard.workingCapital) setWorkingCapital(dashboard.workingCapital);

      } catch (err) {
        console.error("Finance Dashboard retrieval failure:", err);
      }
    };

    load();
    return () => { active = false; };
  }, []);

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
                <span className="fin-working-cap-value">{workingCapital}</span>
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
