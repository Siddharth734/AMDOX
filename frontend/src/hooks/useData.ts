"use client";
import { useQuery } from "@tanstack/react-query";
import {
  kpiCards, revenueData, monthlyPerf, deptData, activityFeed, quickModules,
  analyticsMetrics, forecastData, moduleUsage, slaItems, aiInsights, heatmapData,
} from "@/src/lib/mock-data";

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// ── Dashboard ──────────────────────────────────────
export const useKPICards     = () => useQuery({ queryKey:["kpi"],          queryFn: async () => { await delay(600); return kpiCards;         }, staleTime:30_000 });
export const useRevenueChart = () => useQuery({ queryKey:["revenue"],       queryFn: async () => { await delay(800); return revenueData;       }, staleTime:60_000 });
export const useMonthlyPerf  = () => useQuery({ queryKey:["monthly-perf"],  queryFn: async () => { await delay(700); return monthlyPerf;       }, staleTime:60_000 });
export const useDeptBudget   = () => useQuery({ queryKey:["dept"],          queryFn: async () => { await delay(700); return deptData;          }, staleTime:60_000 });
export const useActivityFeed = () => useQuery({ queryKey:["activity"],      queryFn: async () => { await delay(500); return activityFeed;      }, staleTime:15_000 });
export const useQuickModules = () => useQuery({ queryKey:["quick-modules"], queryFn: async () => { await delay(300); return quickModules;      }, staleTime:60_000 });

// ── Analytics ──────────────────────────────────────
export const useAnalyticsMetrics = () => useQuery({ queryKey:["a-metrics"],  queryFn: async () => { await delay(600); return analyticsMetrics;  }, staleTime:30_000 });
export const useForecast         = () => useQuery({ queryKey:["forecast"],   queryFn: async () => { await delay(900); return forecastData;       }, staleTime:60_000 });
export const useModuleUsage      = () => useQuery({ queryKey:["mod-usage"],  queryFn: async () => { await delay(700); return moduleUsage;        }, staleTime:60_000 });
export const useSLAItems         = () => useQuery({ queryKey:["sla"],        queryFn: async () => { await delay(400); return slaItems;           }, staleTime:30_000 });
export const useAIInsights       = () => useQuery({ queryKey:["insights"],   queryFn: async () => { await delay(900); return aiInsights;         }, staleTime:60_000 });
export const useHeatmap          = () => useQuery({ queryKey:["heatmap"],    queryFn: async () => { await delay(800); return heatmapData;        }, staleTime:60_000 });
