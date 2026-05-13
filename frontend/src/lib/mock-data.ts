import type {
  KPICard, RevenuePoint, DeptBudget, ActivityItem,
  AnalyticsMetric, ForecastPoint, ModuleUsage, SLAItem, AIInsight,
  HeatmapCell, QuickModule,
} from "@/src/types";

export const kpiCards: KPICard[] = [
  { id:"revenue",  label:"Total Revenue", value:4820000, formatted:"$4.82M", change:12.4, trend:"up",   suffix:"vs last month",  icon:"DollarSign",  color:"blue" },
  { id:"users",    label:"Active Users",  value:9834,    formatted:"9,834",  change:8.1,  trend:"up",   suffix:"across tenants", icon:"Users",       color:"violet" },
  { id:"tasks",    label:"Open Tasks",    value:247,     formatted:"247",    change:-3.2, trend:"down", suffix:"pending action", icon:"CheckSquare", color:"amber" },
  { id:"growth",   label:"YoY Growth",   value:28.6,    formatted:"28.6%",  change:4.9,  trend:"up",   suffix:"vs last year",   icon:"TrendingUp",  color:"emerald" },
];

export const revenueData: RevenuePoint[] = [
  { month:"Jan", revenue:3200000, expenses:2800000, profit:400000 },
  { month:"Feb", revenue:3800000, expenses:3100000, profit:700000 },
  { month:"Mar", revenue:4100000, expenses:3300000, profit:800000 },
  { month:"Apr", revenue:3700000, expenses:3050000, profit:650000 },
  { month:"May", revenue:4400000, expenses:3600000, profit:800000 },
  { month:"Jun", revenue:4820000, expenses:3800000, profit:1020000 },
  { month:"Jul", revenue:5100000, expenses:4000000, profit:1100000 },
  { month:"Aug", revenue:4900000, expenses:3900000, profit:1000000 },
];

// Monthly performance (bar chart for dashboard)
export const monthlyPerf = [
  { month:"Jan", target:3000000, actual:3200000 },
  { month:"Feb", target:3500000, actual:3800000 },
  { month:"Mar", target:4000000, actual:4100000 },
  { month:"Apr", target:4000000, actual:3700000 },
  { month:"May", target:4200000, actual:4400000 },
  { month:"Jun", target:4500000, actual:4820000 },
  { month:"Jul", target:5000000, actual:5100000 },
  { month:"Aug", target:5000000, actual:4900000 },
];

export const deptData: DeptBudget[] = [
  { dept:"Finance", budget:1200, spent:980 },
  { dept:"HR",      budget:800,  spent:650 },
  { dept:"Supply",  budget:1800, spent:1620 },
  { dept:"Projects",budget:950,  spent:820 },
  { dept:"IT",      budget:600,  spent:540 },
  { dept:"Mktg",    budget:450,  spent:390 },
];

export const activityFeed: ActivityItem[] = [
  { id:1, type:"success", title:"Payroll run completed",      description:"9,834 employees processed in 3m 42s",       module:"HR",        time:"2 min ago",  avatar:"PR" },
  { id:2, type:"info",    title:"PO-2026-4421 auto-approved", description:"Vendor Nexus Supplies notified via webhook",  module:"Supply",    time:"18 min ago", avatar:"SC" },
  { id:3, type:"warning", title:"Invoice OCR confidence low", description:"INV-88234 queued for manual review (81%)",   module:"Finance",   time:"41 min ago", avatar:"FN" },
  { id:4, type:"success", title:"ML model retrained",         description:"MAPE improved 8.2% — was 9.1%",              module:"Analytics", time:"1h ago",     avatar:"AI" },
  { id:5, type:"info",    title:"Q2 report generated",        description:"Board-level PDF exported & distributed",     module:"Finance",   time:"2h ago",     avatar:"FN" },
  { id:6, type:"error",   title:"Reorder alert triggered",    description:"SKU ELEC-4421 below threshold (12 units)",   module:"Supply",    time:"3h ago",     avatar:"SC" },
];

export const quickModules: QuickModule[] = [
  { id:"finance",   label:"Finance",    icon:"DollarSign",  href:"/finance/dashboard",   description:"GL, AP/AR, invoices",      color:"#34d399", stat:"$4.82M", statLabel:"Revenue MTD" },
  { id:"hr",        label:"HR",         icon:"Users",       href:"/hr/dashboard",        description:"Payroll, employees",       color:"#a78bfa", stat:"9,834",  statLabel:"Active staff" },
  { id:"inventory", label:"Inventory",  icon:"Package",     href:"/inventory/dashboard", description:"Stock, POs, vendors",      color:"#fbbf24", stat:"1,247",  statLabel:"Active SKUs" },
  { id:"projects",  label:"Projects",   icon:"FolderKanban",href:"/projects/dashboard",  description:"Tasks, milestones",        color:"#f472b6", stat:"6",      statLabel:"Active projects" },
  { id:"analytics", label:"Analytics",  icon:"BarChart3",   href:"/analytics",           description:"AI insights, forecasts",   color:"#06b6d4", stat:"48K",    statLabel:"ML predictions" },
  { id:"reports",   label:"Reports",    icon:"FileBarChart",href:"/reports",             description:"Exports, board reports",   color:"#4f8ef7", stat:"23",     statLabel:"Reports this month" },
];

export const analyticsMetrics: AnalyticsMetric[] = [
  { label:"API Calls (24h)",    value:"2.4M",   change:8.2,   trend:"up",   detail:"vs 2.22M yesterday" },
  { label:"Avg Response Time",  value:"218ms",  change:-12.4, trend:"down", detail:"target: <300ms ✓" },
  { label:"Error Rate",         value:"0.04%",  change:-31.2, trend:"down", detail:"SLA threshold: <0.1%" },
  { label:"ML Predictions",     value:"48,291", change:22.1,  trend:"up",   detail:"MAPE: 8.2% — excellent" },
];

export const forecastData: ForecastPoint[] = [
  { week:"W1", predicted:4200, actual:4150 },
  { week:"W2", predicted:4500, actual:4480 },
  { week:"W3", predicted:4800, actual:4920 },
  { week:"W4", predicted:5100, actual:5050 },
  { week:"W5", predicted:5400, actual:null },
  { week:"W6", predicted:5700, actual:null },
  { week:"W7", predicted:6100, actual:null },
  { week:"W8", predicted:6400, actual:null },
];

export const moduleUsage: ModuleUsage[] = [
  { module:"Finance",   users:312, sessions:1840, change:12.1 },
  { module:"HR",        users:128, sessions:640,  change:5.4  },
  { module:"Supply",    users:89,  sessions:520,  change:18.7 },
  { module:"Projects",  users:201, sessions:1120, change:8.9  },
  { module:"Analytics", users:67,  sessions:380,  change:31.2 },
  { module:"AI/ML",     users:44,  sessions:210,  change:44.8 },
];

export const slaItems: SLAItem[] = [
  { label:"Uptime MTD",       value:99.94, target:99.9, unit:"%" },
  { label:"P95 API Latency",  value:218,   target:300,  unit:"ms" },
  { label:"Concurrent Users", value:1260,  target:2000, unit:"" },
  { label:"OCR Accuracy",     value:96.3,  target:95,   unit:"%" },
  { label:"DSR Fulfillment",  value:22,    target:72,   unit:"h" },
];

export const aiInsights: AIInsight[] = [
  { id:"ai1", title:"Demand Surge Predicted",    body:"SKU ELEC-4421 projected +34% demand spike in next 14 days. Immediate reorder recommended.",                   confidence:94, module:"Supply Chain", priority:"high",   actionLabel:"Create PO"    },
  { id:"ai2", title:"Payroll Anomaly Detected",  body:"Engineering dept overtime costs 28% above Q1 baseline. Possible misclassification in 3 contracts.",            confidence:87, module:"HR",           priority:"medium", actionLabel:"Review"       },
  { id:"ai3", title:"Revenue Forecast Upgraded", body:"Q2 FY26 revenue revised to $14.8M (+8% vs prior estimate) based on pipeline and seasonal signals.",            confidence:91, module:"Finance",       priority:"low",    actionLabel:"View Report"  },
];

// Heatmap data: activity by day × hour
export const heatmapData: HeatmapCell[] = (() => {
  const days  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const hours = Array.from({ length:24 }, (_, i) => i);
  return days.flatMap(day =>
    hours.map(hour => ({
      day, hour,
      value: day === "Sat" || day === "Sun" ? Math.floor(Math.random() * 20)
           : hour < 8 || hour > 20          ? Math.floor(Math.random() * 15)
           : Math.floor(Math.random() * 100),
    }))
  );
})();
