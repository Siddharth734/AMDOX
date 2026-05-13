"use client";
import { AppShell } from "@/src/shared/components/app-shell";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { Card, CardHeader, CardBody, CardTitle, CardDescription } from "@/src/shared/ui/card";
import { Table } from "@/src/shared/ui/table";
import { Button } from "@/src/shared/ui/button";
import { StatusBadge } from "@/src/shared/ui/badge";
import { ChartWrapper } from "@/src/shared/ui/chart-wrapper";
import { Users, TrendingUp, Calendar, Briefcase, Download, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function HRDashboard() {
  const kpis = [
    { label: "Total Employees", value: "248", change: "+8", icon: <Users size={16} className="text-blue-400" />, bg: "rgba(79,142,247,0.1)" },
    { label: "On Leave Today", value: "12", change: "+2", icon: <Calendar size={16} className="text-amber-400" />, bg: "rgba(251,191,36,0.1)" },
    { label: "Pending Approvals", value: "7", change: "3 leaves", icon: <TrendingUp size={16} className="text-purple-400" />, bg: "rgba(167,139,250,0.1)" },
    { label: "Departments", value: "12", change: "Active", icon: <Briefcase size={16} className="text-emerald-400" />, bg: "rgba(52,211,153,0.1)" },
  ];

  const departmentData = [
    { name: "Engineering", value: 85, fill: "#4f8ef7" },
    { name: "Sales", value: 42, fill: "#34d399" },
    { name: "Finance", value: 28, fill: "#fbbf24" },
    { name: "HR", value: 15, fill: "#a78bfa" },
    { name: "Operations", value: 38, fill: "#fb7185" },
    { name: "Marketing", value: 40, fill: "#06b6d4" },
  ];

  const attendanceData = [
    { week: "Week 1", present: 92, absent: 8 },
    { week: "Week 2", present: 95, absent: 5 },
    { week: "Week 3", present: 88, absent: 12 },
    { week: "Week 4", present: 93, absent: 7 },
    { week: "Week 5", present: 96, absent: 4 },
  ];

  const employees = [
    { id: 1, name: "John Smith", role: "Senior Engineer", department: "Engineering", status: "active", joining: "2024-01-15" },
    { id: 2, name: "Sarah Johnson", role: "Sales Manager", department: "Sales", status: "active", joining: "2024-02-20" },
    { id: 3, name: "Mike Chen", role: "Finance Analyst", department: "Finance", status: "on-leave", joining: "2024-03-10" },
    { id: 4, name: "Emma Davis", role: "HR Specialist", department: "HR", status: "active", joining: "2024-04-05" },
  ];

  return (
    <AppShell requiredModule="hr">
      <div className="max-w-[1440px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border" style={{ background:"rgba(167,139,250,0.1)", borderColor:"rgba(167,139,250,0.25)", color:"#a78bfa" }}>
              <Users size={10} /> HR MODULE
            </div>
            <h1 className="text-[26px] font-display font-bold text-slate-800">HR Dashboard</h1>
            <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">Employee lifecycle · Leave · Payroll · Compliance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={<Download size={14} />}>Export</Button>
            <Button variant="primary" icon={<Plus size={14} />}>Add Employee</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <GlassCard key={i} padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] text-[#5c667e] font-mono uppercase tracking-wider mb-1">{kpi.label}</p>
                  <p className="text-[22px] font-bold text-white mb-2">{kpi.value}</p>
                  <p className="text-[11px] font-mono text-[#9aa3bb]">{kpi.change}</p>
                </div>
                <div className="p-2.5 rounded-lg" style={{ background: kpi.bg }}>{kpi.icon}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartWrapper title="Department Distribution" subtitle="248 total employees">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                  {departmentData.map((entry, idx) => <Cell key={idx} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <div className="lg:col-span-2">
            <ChartWrapper title="Attendance Trend" subtitle="Last 5 weeks">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="week" stroke="#5c667e" />
                  <YAxis stroke="#5c667e" />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                  <Bar dataKey="present" fill="#34d399" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" fill="#fb7185" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Recent employees and their status</CardDescription>
          </CardHeader>
          <CardBody>
            <Table
              columns={[
                { key: "name", header: "Name", width: "25%" },
                { key: "role", header: "Position" },
                { key: "department", header: "Department" },
                { key: "status", header: "Status", render: (val) => <StatusBadge status={val as string} /> },
                { key: "joining", header: "Joined" },
              ]}
              data={employees}
              keyField="id"
            />
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
