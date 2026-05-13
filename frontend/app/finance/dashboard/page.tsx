"use client";
import { AppShell } from "@/src/shared/components/app-shell";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { Card, CardHeader, CardBody, CardTitle, CardDescription } from "@/src/shared/ui/card";
import { Table } from "@/src/shared/ui/table";
import { Button } from "@/src/shared/ui/button";
import { StatusBadge } from "@/src/shared/ui/badge";
import { ChartWrapper, ChartTooltip } from "@/src/shared/ui/chart-wrapper";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Download, Plus } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function FinanceDashboard() {
  // KPI Cards
  const kpis = [
    { label: "Total Revenue", value: "$2,450,800", change: "+12.5%", icon: <DollarSign size={16} className="text-emerald-400" />, bg: "rgba(52,211,153,0.1)" },
    { label: "Total Expenses", value: "$890,300", change: "-5.2%", icon: <ArrowDownLeft size={16} className="text-rose-400" />, bg: "rgba(251,113,133,0.1)" },
    { label: "Net Profit", value: "$1,560,500", change: "+18.3%", icon: <TrendingUp size={16} className="text-blue-400" />, bg: "rgba(79,142,247,0.1)" },
    { label: "Cash Flow", value: "$892,100", change: "+3.1%", icon: <DollarSign size={16} className="text-purple-400" />, bg: "rgba(167,139,250,0.1)" },
  ];

  // Revenue data
  const revenueData = [
    { month: "Jan", revenue: 150, expenses: 90 },
    { month: "Feb", revenue: 210, expenses: 130 },
    { month: "Mar", revenue: 160, expenses: 100 },
    { month: "Apr", revenue: 260, expenses: 170 },
    { month: "May", revenue: 290, expenses: 190 },
    { month: "Jun", revenue: 360, expenses: 230 },
  ];

  // Recent transactions
  const transactions = [
    { id: 1, description: "Invoice #2024001", category: "Sales", amount: 2500, status: "completed", date: "2024-05-13" },
    { id: 2, description: "Expense - Software License", category: "Operations", amount: -450, status: "completed", date: "2024-05-12" },
    { id: 3, description: "Invoice #2024002", category: "Sales", amount: 3200, status: "pending", date: "2024-05-11" },
    { id: 4, description: "Payroll Distribution", category: "Expenses", amount: -12000, status: "completed", date: "2024-05-10" },
  ];

  return (
    <AppShell requiredModule="finance">
      <div className="max-w-[1440px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border" style={{ background:"rgba(52,211,153,0.1)", borderColor:"rgba(52,211,153,0.25)", color:"#34d399" }}>
              <DollarSign size={10} /> FINANCE MODULE
            </div>
            <h1 className="text-[26px] font-display font-bold text-slate-800">Finance Dashboard</h1>
            <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">GL · AP/AR · Transactions · Invoices · Reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={<Download size={14} />}>Export</Button>
            <Button variant="primary" icon={<Plus size={14} />}>New Invoice</Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <GlassCard key={i} padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] text-[#5c667e] font-mono uppercase tracking-wider mb-1">{kpi.label}</p>
                  <p className="text-[22px] font-bold text-white mb-2">{kpi.value}</p>
                  <p className="text-[11px] font-mono text-emerald-400">{kpi.change}</p>
                </div>
                <div className="p-2.5 rounded-lg" style={{ background: kpi.bg }}>{kpi.icon}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <ChartWrapper title="Revenue vs Expenses" subtitle="Last 6 months">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb7185" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" stroke="#5c667e" />
                  <YAxis stroke="#5c667e" />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#34d399" fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="expenses" stroke="#fb7185" fillOpacity={1} fill="url(#colorExpenses)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>

          {/* Quick Stats Card */}
          <GlassCard padding="md">
            <h3 className="text-[14px] font-semibold text-white mb-4">Financial Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#9aa3bb]">Invoices Outstanding</span>
                <span className="text-[14px] font-semibold text-amber-400">$85,200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#9aa3bb]">Accounts Payable</span>
                <span className="text-[14px] font-semibold text-rose-400">$12,400</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#9aa3bb]">Bank Balance</span>
                <span className="text-[14px] font-semibold text-emerald-400">$245,800</span>
              </div>
              <div className="h-px bg-white/[0.06] my-2"></div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#9aa3bb] font-semibold">Working Capital</span>
                <span className="text-[14px] font-bold text-blue-400">$233,400</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </CardHeader>
          <CardBody>
            <Table
              columns={[
                { key: "description", header: "Description", width: "40%" },
                { key: "category", header: "Category" },
                {
                  key: "amount",
                  header: "Amount",
                  align: "right",
                  render: (val) => <span className={val < 0 ? "text-rose-400" : "text-emerald-400"}>${Math.abs(val).toLocaleString()}</span>,
                },
                {
                  key: "status",
                  header: "Status",
                  render: (val) => <StatusBadge status={val as string} />,
                },
                { key: "date", header: "Date" },
              ]}
              data={transactions}
              keyField="id"
            />
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
