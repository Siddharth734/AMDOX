"use client";
import "../../erp-module.css";
import { AppShell } from "@/src/shared/components/app-shell";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  Users, TrendingUp, Calendar, Briefcase,
  ArrowUpRight, Plus, UserPlus, Clock,
} from "lucide-react";

const TICK = { fontSize: 9, fill: "#9099b8", fontFamily: "-apple-system, sans-serif" };

export default function HRDashboard() {
  const kpis = [
    { label: "Total Employees", value: "248",  change: "+8 this quarter", up: true,  icon: <Users size={13} className="text-[#5b7cf5]" />, bg: "#e8eeff" },
    { label: "On Leave Today",  value: "12",   change: "+2 from yesterday", up: false, icon: <Calendar size={13} className="text-[#d08a2e]" />, bg: "#fff6e8" },
    { label: "Pending Approvals", value: "7",  change: "3 leave requests", up: false, icon: <Clock size={13} className="text-[#9b7cf5]" />, bg: "#f0eeff" },
    { label: "Departments",     value: "12",   change: "All active",       up: true,  icon: <Briefcase size={13} className="text-[#1fa866]" />, bg: "#e0f8ed" },
  ];

  const departmentData = [
    { name: "Engineering", value: 85, fill: "#5b7cf5" },
    { name: "Sales",       value: 42, fill: "#6ec6e8" },
    { name: "Finance",     value: 28, fill: "#f5a04a" },
    { name: "HR",          value: 15, fill: "#9b7cf5" },
    { name: "Operations",  value: 38, fill: "#38b4e0" },
    { name: "Marketing",   value: 40, fill: "#e55a8a" },
  ];

  const attendanceData = [
    { name: "Week 1", present: 92, absent: 8 },
    { name: "Week 2", present: 95, absent: 5 },
    { name: "Week 3", present: 88, absent: 12 },
    { name: "Week 4", present: 93, absent: 7 },
    { name: "Week 5", present: 96, absent: 4 },
  ];

  const employees = [
    { name: "John Smith",     role: "Senior Engineer",  dept: "Engineering", status: "active",   joined: "Jan 15, 2024", initials: "JS", avatarBg: "#b0bce8" },
    { name: "Sarah Johnson",  role: "Sales Manager",    dept: "Sales",       status: "active",   joined: "Feb 20, 2024", initials: "SJ", avatarBg: "#b8e0c8" },
    { name: "Mike Chen",      role: "Finance Analyst",  dept: "Finance",     status: "on-leave", joined: "Mar 10, 2024", initials: "MC", avatarBg: "#e8d0b0" },
    { name: "Emma Davis",     role: "HR Specialist",    dept: "HR",          status: "active",   joined: "Apr 05, 2024", initials: "ED", avatarBg: "#c8b8f0" },
    { name: "Alex Rivera",    role: "DevOps Lead",      dept: "Engineering", status: "active",   joined: "May 12, 2024", initials: "AR", avatarBg: "#b0d8e8" },
  ];

  const leaveRequests = [
    { name: "David Park",   type: "Annual Leave",  dates: "May 15–19", status: "pending" },
    { name: "Lisa Wang",    type: "Sick Leave",     dates: "May 13",    status: "pending" },
    { name: "Tom Bradley",  type: "Personal",       dates: "May 20–21", status: "pending" },
  ];

  return (
    <AppShell requiredModule="hr">
      <div className="erp-page">
        {/* Topbar */}
        <div className="erp-topbar">
          <div>
            <div className="erp-badge" style={{ background: "#f0eeff", color: "#9b7cf5" }}>
              <Users size={10} /> HR MODULE
            </div>
            <div className="pg-title">HR Dashboard</div>
            <div className="pg-subtitle">Employee lifecycle · Leave · Payroll · Compliance</div>
          </div>
          <div className="erp-topbar-actions">
            <button className="erp-topbar-btn"><TrendingUp size={13} /> Reports</button>
            <button className="erp-topbar-btn primary"><UserPlus size={13} /> Add Employee</button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="erp-kpi-row cols-4">
          {kpis.map((k, i) => (
            <div key={i} className="erp-kpi" style={{ background: k.bg }}>
              <div className="erp-kpi-icon" style={{ background: "rgba(255,255,255,0.7)" }}>{k.icon}</div>
              <div className="erp-kpi-label">{k.label}</div>
              <div className="erp-kpi-value">{k.value}</div>
              <div className={`erp-kpi-change ${k.up ? "up" : ""}`}>
                <ArrowUpRight size={10} /> {k.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="erp-grid-main" style={{ gridTemplateColumns: "1fr 1fr 280px" }}>
          {/* Department Distribution */}
          <div className="erp-card">
            <div className="erp-card-hd">
              <div className="erp-card-title">Department Distribution</div>
              <div className="erp-card-subtitle">248 total employees</div>
            </div>
            <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={departmentData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    {departmentData.map((entry, idx) => <Cell key={idx} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(200,210,235,0.4)", padding: "6px", fontSize: "10px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "4px" }}>
              {departmentData.map((d, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#5a6080" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: d.fill }} />
                  {d.name} ({d.value})
                </span>
              ))}
            </div>
          </div>

          {/* Attendance Trend */}
          <div className="erp-card">
            <div className="erp-card-hd">
              <div className="erp-card-title">Attendance Trend</div>
              <div className="erp-card-menu">···</div>
            </div>
            <div style={{ height: "230px", marginLeft: "-20px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="rgba(200,210,235,0.25)" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={TICK} axisLine={false} tickLine={false} />
                  <YAxis tick={TICK} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: "8px", border: "1px solid rgba(200,210,235,0.4)", padding: "6px", fontSize: "10px" }} />
                  <Bar dataKey="present" fill="rgba(91,124,245,0.85)" barSize={22} radius={[0,0,0,0]} name="Present %" />
                  <Bar dataKey="absent" fill="rgba(166,198,245,0.6)" barSize={22} radius={[4,4,0,0]} name="Absent %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leave Requests */}
          <div className="erp-card" style={{ flex: 1 }}>
            <div className="erp-card-hd">
              <div className="erp-card-title">Leave Requests</div>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "#5b7cf5", background: "#eef1ff", padding: "3px 10px", borderRadius: "6px" }}>
                {leaveRequests.length} pending
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              {leaveRequests.map((lr, i) => (
                <div key={i} className="erp-timeline-item" style={{ padding: "8px 0" }}>
                  <div className="erp-timeline-dot" style={{ background: "#f0eeff" }}>
                    <Calendar size={12} className="text-[#9b7cf5]" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="erp-timeline-title">{lr.name}</div>
                    <div className="erp-timeline-time">{lr.type} · {lr.dates}</div>
                  </div>
                  <span className="erp-status pending"><span className="dot" />Pending</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="erp-card">
          <div className="erp-card-hd">
            <div>
              <div className="erp-card-title">Team Members</div>
              <div className="erp-card-subtitle">Recent employees and their status</div>
            </div>
            <div className="erp-card-menu">···</div>
          </div>
          <div className="erp-table-wrap">
            <table className="erp-table">
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>Employee</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: e.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                          {e.initials}
                        </div>
                        <span style={{ fontWeight: 600, color: "#1e2845" }}>{e.name}</span>
                      </div>
                    </td>
                    <td>{e.role}</td>
                    <td>{e.dept}</td>
                    <td><span className={`erp-status ${e.status}`}><span className="dot" />{e.status === "active" ? "Active" : "On Leave"}</span></td>
                    <td>{e.joined}</td>
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
