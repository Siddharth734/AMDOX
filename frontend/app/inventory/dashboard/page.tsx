"use client";
import "../../erp-module.css";
import { AppShell } from "@/src/shared/components/app-shell";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Package, BarChart3, AlertTriangle, TrendingUp,
  ArrowUpRight, Search, Plus, ArrowDownRight,
} from "lucide-react";

const TICK = { fontSize: 9, fill: "#9099b8", fontFamily: "-apple-system, sans-serif" };

export default function InventoryDashboard() {
  const kpis = [
    { label: "Total SKUs",  value: "1,247",  change: "+42 this month", up: true,  icon: <Package size={13} className="text-[#5b7cf5]" />, bg: "#e8eeff" },
    { label: "In Stock",    value: "892",     change: "71.5% healthy",  up: true,  icon: <BarChart3 size={13} className="text-[#1fa866]" />, bg: "#e0f8ed" },
    { label: "Low Stock",   value: "156",     change: "12.5% at risk",  up: false, icon: <AlertTriangle size={13} className="text-[#d08a2e]" />, bg: "#fff6e8" },
    { label: "Stock Value",  value: "$2.8M",   change: "+8.3%",         up: true,  icon: <TrendingUp size={13} className="text-[#9b7cf5]" />, bg: "#f0eeff" },
  ];

  const stockMovement = [
    { name: "Week 1", inbound: 450, outbound: 320 },
    { name: "Week 2", inbound: 380, outbound: 410 },
    { name: "Week 3", inbound: 520, outbound: 280 },
    { name: "Week 4", inbound: 610, outbound: 350 },
    { name: "Week 5", inbound: 490, outbound: 420 },
    { name: "Week 6", inbound: 540, outbound: 360 },
  ];

  const categories = [
    { name: "Electronics", items: 285, value: "$850K", pct: 95 , color: "#5b7cf5" },
    { name: "Furniture",   items: 142, value: "$420K", pct: 47 , color: "#9b7cf5" },
    { name: "Tools",       items: 198, value: "$380K", pct: 66 , color: "#38b4e0" },
    { name: "Supplies",    items: 267, value: "$190K", pct: 89 , color: "#6ec6e8" },
  ];

  const products = [
    { name: "Laptop Pro 15",    sku: "LP-001", category: "Electronics", stock: 45,  status: "in-stock",     value: "$85,000" },
    { name: "Office Chair Ergo", sku: "CH-042", category: "Furniture",   stock: 8,   status: "low-stock",    value: "$4,200" },
    { name: "Power Drill XL",   sku: "TL-023", category: "Tools",       stock: 0,   status: "out-of-stock", value: "$0" },
    { name: "A4 Paper Ream",    sku: "SP-108", category: "Supplies",    stock: 125, status: "in-stock",     value: "$1,500" },
    { name: "Wireless Mouse",   sku: "AC-056", category: "Electronics", stock: 3,   status: "low-stock",    value: "$450" },
    { name: "Standing Desk",    sku: "FN-072", category: "Furniture",   stock: 22,  status: "in-stock",     value: "$15,400" },
  ];

  return (
    <AppShell requiredModule="inventory">
      <div className="erp-page">
        {/* Topbar */}
        <div className="erp-topbar">
          <div>
            <div className="erp-badge" style={{ background: "#e8eeff", color: "#5b7cf5" }}>
              <Package size={10} /> INVENTORY
            </div>
            <div className="pg-title">Inventory Management</div>
            <div className="pg-subtitle">Stock levels · Warehousing · Movements · Transfers</div>
          </div>
          <div className="erp-topbar-actions">
            <button className="erp-topbar-btn"><Search size={13} /> Search</button>
            <button className="erp-topbar-btn primary"><Plus size={13} /> Add Product</button>
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

        {/* Charts + Category */}
        <div className="erp-grid-2">
          {/* Stock Movement Chart */}
          <div className="erp-card">
            <div className="erp-card-hd">
              <div className="erp-card-title">Stock Movement</div>
              <div style={{ display: "flex", gap: "10px", fontSize: "10px", color: "#8890b0" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "2px", borderRadius: "1px", background: "#6ec6e8" }} /> Inbound</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "2px", borderRadius: "1px", background: "#a68af5" }} /> Outbound</span>
              </div>
            </div>
            <div style={{ height: "220px", marginLeft: "-20px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stockMovement} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6ec6e8" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#6ec6e8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a68af5" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#a68af5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(200,210,235,0.25)" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={TICK} axisLine={false} tickLine={false} />
                  <YAxis tick={TICK} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(200,210,235,0.4)", padding: "6px", fontSize: "10px" }} />
                  <Area type="monotone" dataKey="inbound" stroke="#6ec6e8" strokeWidth={2.5} fill="url(#gradIn)" />
                  <Area type="monotone" dataKey="outbound" stroke="#a68af5" strokeWidth={2} fill="url(#gradOut)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stock by Category */}
          <div className="erp-card">
            <div className="erp-card-hd">
              <div className="erp-card-title">Stock by Category</div>
              <div className="erp-card-menu">···</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
              {categories.map((cat, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#3a3f5c" }}>{cat.name}</span>
                    <span style={{ fontSize: "11px", color: "#5a6080" }}>{cat.items} items · {cat.value}</span>
                  </div>
                  <div className="erp-progress">
                    <div className="erp-progress-fill" style={{ width: `${cat.pct}%`, background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="erp-card">
          <div className="erp-card-hd">
            <div>
              <div className="erp-card-title">Product Inventory</div>
              <div className="erp-card-subtitle">Current stock levels and status</div>
            </div>
            <div className="erp-card-menu">···</div>
          </div>
          <div className="erp-table-wrap">
            <table className="erp-table">
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th style={{ textAlign: "center" }}>Stock</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: "#1e2845" }}>{p.name}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "11px" }}>{p.sku}</td>
                    <td>{p.category}</td>
                    <td style={{ textAlign: "center", fontWeight: 700, color: p.stock === 0 ? "#d04848" : p.stock < 10 ? "#d08a2e" : "#1e2845" }}>{p.stock}</td>
                    <td><span className={`erp-status ${p.status}`}><span className="dot" />{p.status.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</span></td>
                    <td style={{ textAlign: "right", fontWeight: 600 }}>{p.value}</td>
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
