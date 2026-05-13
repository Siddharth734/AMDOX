"use client";
import "./dashboard.css";
import Link from "next/link";
import { AppShell } from "@/src/shared/components/app-shell";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Users, Briefcase, RefreshCw, ShoppingCart, Search, Maximize2, LineChart as LineChartIcon, ChevronDown, ArrowUpRight, Package, FolderKanban } from "lucide-react";

export default function DashboardPage() {
  // KPI data
  const kpis = [
    { label: "Total Revenue", value: "$2900.8K", change: "+6.93%", icon: <Briefcase size={13} className="text-[#5b7cf5]" />, bg: "#e8eaff" },
    { label: "Active Users", value: "356", change: "+0.85%", icon: <Users size={13} className="text-[#38b4e0]" />, bg: "#e0f4ff" },
    { label: "Open Leads", value: "1,603", change: "+2.29%", icon: <LineChartIcon size={13} className="text-[#9b7cf5]" />, bg: "#f0ecff" },
    { label: "Inventory Value", value: "$7,227.94", change: "+1.55%", icon: <Briefcase size={13} className="text-[#5b7cf5]" />, bg: "#e8eaff" },
    { label: "Task Completion", value: "89.87%", change: "+1.83%", icon: <RefreshCw size={13} className="text-[#38b4e0]" />, bg: "#e0f4ff" },
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

  const performanceData = [
    { name: "Jan", valA: 400, valB: 240 },
    { name: "Feb", valA: 300, valB: 139 },
    { name: "Mar", valA: 550, valB: 380 },
    { name: "Apr", valA: 470, valB: 290 },
    { name: "May", valA: 390, valB: 210 },
    { name: "Jun", valA: 480, valB: 310 },
  ];

  const quickAccess = [
    { label: "HR",        href: "/hr/dashboard",        bg: "#eef1ff", iconBg: "#b8c8f5", icon: <Users size={16} />,       color: "#4460d0" },
    { label: "Finance",   href: "/finance/dashboard",   bg: "#e8f8ff", iconBg: "#38b4e0", icon: <RefreshCw size={16} />,   color: "#1890c0" },
    { label: "Inventory", href: "/inventory/dashboard", bg: "#f0ecff", iconBg: "#9b7cf5", icon: <Package size={16} />,     color: "#7a4fd0" },
    { label: "Projects",  href: "/projects/dashboard",  bg: "#fff3f0", iconBg: "#f5a04a", icon: <FolderKanban size={16} />, color: "#c0550a" },
  ];

  const activities = [
    { title: "System Update Successful",  time: "1 hour ago",  dotBg: "#e8f4ff", dotIcon: <RefreshCw size={11} className="text-[#5b7cf5]" />,   avatar: "SU", avatarBg: "#b0bce8" },
    { title: "New Order from ABC Corp.",  time: "2 hours ago", dotBg: "#eeeaff", dotIcon: <ShoppingCart size={11} className="text-[#9b7cf5]" />, avatar: "AB", avatarBg: "#c8b8f0" },
    { title: "HR Payroll processed",      time: "3 hours ago", dotBg: "#e8eaff", dotIcon: <RefreshCw size={11} className="text-[#5b7cf5]" />,   avatar: "HR", avatarBg: "#b0c8e0" },
    { title: "Invoice #1234 created",     time: "4 hours ago", dotBg: "#eeeaff", dotIcon: <ShoppingCart size={11} className="text-[#9b7cf5]" />, avatar: "IN", avatarBg: "#e8b8d0" },
  ];

  return (
    <AppShell>
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="pg-title">Dashboard</div>
          <div className="tb-btns">
            <div className="tb-btn"><Search size={14} className="text-[#8899b8]" /></div>
            <div className="tb-btn"><Maximize2 size={14} className="text-[#8899b8]" /></div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content">
          {/* Left Column */}
          <div className="col-left">
            {/* KPI Section */}
            <div className="kpi-section">
              <div className="kpi-hdr">
                <span className="kpi-label">KPI cards</span>
                <div className="filter-btn">All users <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></div>
              </div>
              <div className="kpi-row">
                {kpis.map((k, i) => (
                  <div key={i} className="kc" style={{ background: k.bg }}>
                    <div className="kc-iw">{k.icon}</div>
                    <div className="kc-lbl">{k.label}</div>
                    <div className="kc-val">{k.value}</div>
                    <div className="kc-chg"><ArrowUpRight size={10} /> {k.change}</div>
                    <div className="kc-spark"><canvas id={`sp${i}`} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Row */}
            <div className="charts-row">
              {/* Revenue Trends */}
              <div className="card">
                <div className="card-hdr">
                  <span className="card-ttl">Revenue Trends</span>
                  <button className="rev-btn">
                    <LineChartIcon size={10} /> Revenues <ChevronDown size={10} />
                  </button>
                </div>
                <div className="chart-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6ec6e8" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#6ec6e8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a68af5" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#a68af5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="rgba(200,210,235,0.25)" strokeDasharray="3 3" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#9099b8" }} dy={5} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#9099b8" }} tickFormatter={(v) => `$${v}M`} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(200,210,235,0.4)", padding: "6px", fontSize: "10px" }} />
                      <Area type="monotone" dataKey="revenue" stroke="#6ec6e8" strokeWidth={2.5} fill="url(#colorRev)" />
                      <Area type="monotone" dataKey="expenses" stroke="#a68af5" strokeWidth={2} fill="url(#colorExp)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Performance */}
              <div className="card">
                <div className="card-hdr">
                  <span className="card-ttl">Monthly Performance</span>
                  <span className="card-menu">···</span>
                </div>
                <div className="chart-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="rgba(200,210,235,0.25)" strokeDasharray="3 3" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#9099b8" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#9099b8" }} />
                      <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: "8px", border: "1px solid rgba(200,210,235,0.4)", padding: "6px", fontSize: "10px" }} />
                      <Bar dataKey="valA" stackId="a" fill="rgba(91,124,245,0.85)" barSize={26} radius={[0,0,0,0]} />
                      <Bar dataKey="valB" stackId="a" fill="rgba(166,198,245,0.75)" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-right">
            {/* Quick Access */}
            <div className="qa-section">
              <div className="qa-title">Quick access</div>
              <div className="qa-grid">
                {quickAccess.map((item, i) => (
                  <Link key={i} href={item.href} className="qa-card" style={{ background: item.bg }}>
                    <div className="qa-icon-wrap" style={{ background: item.iconBg }}>{item.icon}</div>
                    <span className="qa-card-lbl" style={{ color: item.color }}>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card activity-card">
              <div className="card-hdr">
                <span className="card-ttl">Recent Activity</span>
                <span className="card-menu">···</span>
              </div>
              <div className="act-filter">All Activity</div>
              <div className="act-list custom-scrollbar">
                {activities.map((act, i) => (
                  <div key={i} className="act-item">
                    <div className="act-dot" style={{ background: act.dotBg }}>{act.dotIcon}</div>
                    <div className="act-info">
                      <div className="act-ttl">{act.title}</div>
                      <div className="act-time">{act.time}</div>
                    </div>
                    <div className="act-av" style={{ background: act.avatarBg }}>{act.avatar}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
