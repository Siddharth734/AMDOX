"use client";
import { AppShell } from "@/src/shared/components/app-shell";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { Card, CardHeader, CardBody, CardTitle, CardDescription } from "@/src/shared/ui/card";
import { Table } from "@/src/shared/ui/table";
import { Button } from "@/src/shared/ui/button";
import { StatusBadge } from "@/src/shared/ui/badge";
import { ChartWrapper, ChartTooltip } from "@/src/shared/ui/chart-wrapper";
import { Package, BarChart3, AlertTriangle, TrendingUp, Download, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function InventoryDashboard() {
  const kpis = [
    { label: "Total SKUs", value: "1,247", change: "+42", icon: <Package size={16} className="text-blue-400" />, bg: "rgba(79,142,247,0.1)" },
    { label: "In Stock", value: "892", change: "71.5%", icon: <BarChart3 size={16} className="text-emerald-400" />, bg: "rgba(52,211,153,0.1)" },
    { label: "Low Stock", value: "156", change: "12.5%", icon: <AlertTriangle size={16} className="text-amber-400" />, bg: "rgba(251,191,36,0.1)" },
    { label: "Stock Value", value: "$2.8M", change: "+8.3%", icon: <TrendingUp size={16} className="text-purple-400" />, bg: "rgba(167,139,250,0.1)" },
  ];

  const stockMovement = [
    { week: "Week 1", inbound: 450, outbound: 320 },
    { week: "Week 2", inbound: 380, outbound: 410 },
    { week: "Week 3", inbound: 520, outbound: 280 },
    { week: "Week 4", inbound: 610, outbound: 350 },
    { week: "Week 5", inbound: 490, outbound: 420 },
  ];

  const categoryData = [
    { category: "Electronics", items: 285, value: 850000 },
    { category: "Furniture", items: 142, value: 420000 },
    { category: "Tools", items: 198, value: 380000 },
    { category: "Supplies", items: 267, value: 190000 },
  ];

  const products = [
    { id: 1, name: "Laptop Pro 15", sku: "LP-001", category: "Electronics", stock: 45, status: "in-stock", value: 85000 },
    { id: 2, name: "Office Chair", sku: "CH-042", category: "Furniture", stock: 8, status: "low-stock", value: 4200 },
    { id: 3, name: "Power Drill", sku: "TL-023", category: "Tools", stock: 0, status: "out-of-stock", value: 0 },
    { id: 4, name: "Paper Ream", sku: "SP-108", category: "Supplies", stock: 125, status: "in-stock", value: 1500 },
    { id: 5, name: "Wireless Mouse", sku: "AC-056", category: "Electronics", stock: 3, status: "low-stock", value: 450 },
  ];

  return (
    <AppShell requiredModule="inventory">
      <div className="max-w-[1440px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border" style={{ background:"rgba(79,142,247,0.1)", borderColor:"rgba(79,142,247,0.25)", color:"#4f8ef7" }}>
              <Package size={10} /> INVENTORY MODULE
            </div>
            <h1 className="text-[26px] font-display font-bold text-slate-800">Inventory Management</h1>
            <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">Stock levels · Warehousing · Movements · Transfers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon={<Download size={14} />}>Export</Button>
            <Button variant="primary" icon={<Plus size={14} />}>Add Product</Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartWrapper title="Stock Movement" subtitle="Inbound vs Outbound">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={stockMovement} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="week" stroke="#5c667e" />
                <YAxis stroke="#5c667e" />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="inbound" stroke="#34d399" fillOpacity={1} fill="url(#colorInbound)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <GlassCard padding="md">
            <h3 className="text-[14px] font-semibold text-white mb-4">Stock by Category</h3>
            <div className="space-y-3">
              {categoryData.map((cat, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] text-[#9aa3bb]">{cat.category}</span>
                    <span className="text-[12px] font-semibold text-white">{cat.items} items</span>
                  </div>
                  <div className="w-full bg-white/[0.04] rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${(cat.items / 300) * 100}%` }} />
                  </div>
                  <p className="text-[10px] text-[#5c667e] mt-1">${(cat.value / 1000).toFixed(0)}K value</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>Current stock levels and status</CardDescription>
          </CardHeader>
          <CardBody>
            <Table
              columns={[
                { key: "name", header: "Product", width: "30%" },
                { key: "sku", header: "SKU" },
                { key: "category", header: "Category" },
                { key: "stock", header: "Stock", align: "center" },
                { key: "status", header: "Status", render: (val) => <StatusBadge status={val as string} /> },
                { key: "value", header: "Value", align: "right", render: (val) => `$${(val as number).toLocaleString()}` },
              ]}
              data={products}
              keyField="id"
            />
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
