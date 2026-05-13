"use client";
import "../../erp-module.css";
import { AppShell } from "@/src/shared/components/app-shell";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  FolderKanban, Plus, ArrowUpRight, CheckCircle2,
  Clock, AlertCircle, Calendar, Users, Target,
  Layers,
} from "lucide-react";

const TICK = { fontSize: 9, fill: "#9099b8", fontFamily: "-apple-system, sans-serif" };

export default function ProjectsDashboard() {
  const kpis = [
    { label: "Active Projects",  value: "14",    change: "+3 this month", icon: <FolderKanban size={13} className="text-[#c0550a]" />, bg: "#fff3f0" },
    { label: "Tasks Completed",  value: "284",   change: "89.2% rate",    icon: <CheckCircle2 size={13} className="text-[#1fa866]" />, bg: "#e0f8ed" },
    { label: "In Progress",      value: "47",    change: "12 due soon",   icon: <Clock size={13} className="text-[#5b7cf5]" />,        bg: "#e8eeff" },
    { label: "Team Members",     value: "38",    change: "6 teams",       icon: <Users size={13} className="text-[#9b7cf5]" />,        bg: "#f0eeff" },
    { label: "Milestones Hit",   value: "92%",   change: "+4.2%",         icon: <Target size={13} className="text-[#38b4e0]" />,       bg: "#e0f4ff" },
  ];

  const velocityData = [
    { name: "Sprint 1", planned: 21, actual: 18 },
    { name: "Sprint 2", planned: 24, actual: 22 },
    { name: "Sprint 3", planned: 20, actual: 25 },
    { name: "Sprint 4", planned: 28, actual: 26 },
    { name: "Sprint 5", planned: 26, actual: 30 },
    { name: "Sprint 6", planned: 30, actual: 28 },
    { name: "Sprint 7", planned: 32, actual: 34 },
    { name: "Sprint 8", planned: 28, actual: 31 },
  ];

  const projects = [
    { name: "AMDOX Platform v2",    lead: "Siddharth K.",  status: "in-progress", progress: 72, priority: "high",   deadline: "Jun 15", team: ["SK", "AR", "ED"], teamBgs: ["#b0bce8", "#b0d8e8", "#c8b8f0"] },
    { name: "Mobile App Redesign",  lead: "Sarah J.",      status: "in-progress", progress: 45, priority: "high",   deadline: "Jul 01", team: ["SJ", "MC"],       teamBgs: ["#b8e0c8", "#e8d0b0"] },
    { name: "API Gateway v3",       lead: "Alex R.",       status: "planning",    progress: 15, priority: "medium", deadline: "Aug 10", team: ["AR", "JS", "ED"], teamBgs: ["#b0d8e8", "#b0bce8", "#c8b8f0"] },
    { name: "Data Pipeline Upgrade", lead: "Mike C.",      status: "in-progress", progress: 88, priority: "medium", deadline: "May 20", team: ["MC", "JS"],       teamBgs: ["#e8d0b0", "#b0bce8"] },
    { name: "Security Audit Q2",    lead: "Emma D.",       status: "completed",   progress: 100, priority: "high",  deadline: "May 01", team: ["ED"],             teamBgs: ["#c8b8f0"] },
    { name: "CRM Integration",     lead: "Tom B.",         status: "on-hold",     progress: 30, priority: "low",    deadline: "Sep 15", team: ["TB", "LW"],       teamBgs: ["#d8c8b0", "#e0b8d0"] },
  ];

  const milestones = [
    { title: "Backend API Complete",    project: "AMDOX v2",      date: "May 15", done: true },
    { title: "Design System Finalized", project: "Mobile App",    date: "May 20", done: true },
    { title: "Load Testing Pass",       project: "API Gateway",   date: "Jun 01", done: false },
    { title: "Security Patch Deploy",   project: "Security Audit", date: "Jun 10", done: false },
    { title: "Beta Release",           project: "AMDOX v2",       date: "Jun 15", done: false },
  ];

  const statusColor: Record<string, string> = {
    "in-progress": "#5b7cf5", "planning": "#9b7cf5", "completed": "#1fa866", "on-hold": "#d04848",
  };

  return (
    <AppShell requiredModule="projects">
      <div className="erp-page">
        {/* Topbar */}
        <div className="erp-topbar">
          <div>
            <div className="erp-badge" style={{ background: "#fff3f0", color: "#c0550a" }}>
              <FolderKanban size={10} /> PROJECTS
            </div>
            <div className="pg-title">Projects</div>
            <div className="pg-subtitle">Task board · Milestones · Resources · Budget tracking</div>
          </div>
          <div className="erp-topbar-actions">
            <button className="erp-topbar-btn"><Layers size={13} /> Board View</button>
            <button className="erp-topbar-btn primary"><Plus size={13} /> New Project</button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="erp-kpi-row cols-5">
          {kpis.map((k, i) => (
            <div key={i} className="erp-kpi" style={{ background: k.bg }}>
              <div className="erp-kpi-icon" style={{ background: "rgba(255,255,255,0.7)" }}>{k.icon}</div>
              <div className="erp-kpi-label">{k.label}</div>
              <div className="erp-kpi-value">{k.value}</div>
              <div className="erp-kpi-change up"><ArrowUpRight size={10} /> {k.change}</div>
            </div>
          ))}
        </div>

        {/* Chart + Milestones Row */}
        <div className="erp-grid-main" style={{ gridTemplateColumns: "1fr 300px" }}>
          {/* Sprint Velocity Chart */}
          <div className="erp-card">
            <div className="erp-card-hd">
              <div className="erp-card-title">Sprint Velocity</div>
              <div style={{ display: "flex", gap: "10px", fontSize: "10px", color: "#8890b0" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "2px", borderRadius: "1px", background: "#5b7cf5" }} /> Planned</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "2px", borderRadius: "1px", background: "#6ec6e8" }} /> Actual</span>
              </div>
            </div>
            <div style={{ height: "220px", marginLeft: "-20px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityData} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradPlanned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5b7cf5" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#5b7cf5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6ec6e8" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6ec6e8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(200,210,235,0.25)" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={TICK} axisLine={false} tickLine={false} />
                  <YAxis tick={TICK} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(200,210,235,0.4)", padding: "6px", fontSize: "10px" }} />
                  <Area type="monotone" dataKey="planned" stroke="#5b7cf5" strokeWidth={2.5} fill="url(#gradPlanned)" />
                  <Area type="monotone" dataKey="actual" stroke="#6ec6e8" strokeWidth={2} fill="url(#gradActual)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Milestones */}
          <div className="erp-card" style={{ flex: 1 }}>
            <div className="erp-card-hd">
              <div className="erp-card-title">Upcoming Milestones</div>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "#c0550a", background: "#fff3f0", padding: "3px 10px", borderRadius: "6px" }}>
                {milestones.filter(m => !m.done).length} pending
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
              {milestones.map((m, i) => (
                <div key={i} className="erp-timeline-item" style={{ padding: "7px 0" }}>
                  <div className="erp-timeline-dot" style={{ background: m.done ? "#e0f8ed" : "#fff3f0", width: "26px", height: "26px" }}>
                    {m.done
                      ? <CheckCircle2 size={12} className="text-[#1fa866]" />
                      : <AlertCircle size={12} className="text-[#c0550a]" />
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="erp-timeline-title" style={{ fontSize: "11.5px", textDecoration: m.done ? "line-through" : "none", opacity: m.done ? 0.6 : 1 }}>{m.title}</div>
                    <div className="erp-timeline-time">{m.project} · {m.date}</div>
                  </div>
                  {!m.done && (
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "10px", color: "#8890b0" }}>
                      <Calendar size={10} /> {m.date}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="erp-card">
          <div className="erp-card-hd">
            <div>
              <div className="erp-card-title">All Projects</div>
              <div className="erp-card-subtitle">{projects.length} total · {projects.filter(p => p.status === "in-progress").length} active</div>
            </div>
            <div className="erp-tabs">
              <button className="erp-tab active">All</button>
              <button className="erp-tab">Active</button>
              <button className="erp-tab">Completed</button>
              <button className="erp-tab">On Hold</button>
            </div>
          </div>
          <div className="erp-table-wrap">
            <table className="erp-table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Project</th>
                  <th>Lead</th>
                  <th>Status</th>
                  <th style={{ width: "20%" }}>Progress</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: "#1e2845" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{
                          width: "8px", height: "8px", borderRadius: "50%",
                          background: statusColor[p.status] ?? "#8890b0",
                          boxShadow: `0 0 6px ${statusColor[p.status] ?? "#8890b0"}60`,
                        }} />
                        {p.name}
                      </div>
                    </td>
                    <td>{p.lead}</td>
                    <td>
                      <span className={`erp-status ${p.status}`}>
                        <span className="dot" />
                        {p.status.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div className="erp-progress" style={{ flex: 1 }}>
                          <div
                            className="erp-progress-fill"
                            style={{
                              width: `${p.progress}%`,
                              background: p.progress === 100
                                ? "#1fa866"
                                : p.progress > 60
                                  ? "linear-gradient(90deg,#5b7cf5,#6ec6e8)"
                                  : p.progress > 30
                                    ? "#f5a04a"
                                    : "#d04848",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "#1e2845", minWidth: "28px" }}>{p.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`erp-status ${p.priority}`}>
                        <span className="dot" />
                        {p.priority.charAt(0).toUpperCase() + p.priority.slice(1)}
                      </span>
                    </td>
                    <td style={{ fontSize: "11px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Calendar size={10} className="text-[#8890b0]" />
                        {p.deadline}
                      </div>
                    </td>
                    <td>
                      <div className="erp-avatars">
                        {p.team.map((t, ti) => (
                          <div key={ti} className="erp-avatar" style={{ background: p.teamBgs[ti] }}>{t}</div>
                        ))}
                      </div>
                    </td>
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
