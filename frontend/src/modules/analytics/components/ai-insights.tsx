"use client";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAIInsights } from "@/src/hooks/useData";
import { GlassCard } from "@/src/shared/ui/glass-card";
import type { AIInsight } from "@/src/types";

const PRIORITY_CFG = {
  high:   { bar:"#fb7185", bg:"rgba(251,113,133,0.1)", border:"rgba(251,113,133,0.2)", label:"High" },
  medium: { bar:"#fbbf24", bg:"rgba(251,191,36,0.1)",  border:"rgba(251,191,36,0.2)",  label:"Med"  },
  low:    { bar:"#4f8ef7", bg:"rgba(79,142,247,0.1)",  border:"rgba(79,142,247,0.2)",  label:"Low"  },
};

const MODULE_CLR: Record<string, string> = {
  "Supply Chain":"#fbbf24",
  "HR":          "#a78bfa",
  "Finance":     "#34d399",
};

function InsightCard({ insight }: { insight: AIInsight }) {
  const p   = PRIORITY_CFG[insight.priority];
  const clr = MODULE_CLR[insight.module] ?? "#4f8ef7";

  return (
    <div className="p-4 rounded-xl border transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.02] group cursor-pointer"
      style={{ background:"rgba(255,255,255,0.02)", borderColor:"rgba(255,255,255,0.06)" }}>
      {/* Top row */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full"
          style={{ background:`${clr}15`, color: clr }}>
          {insight.module}
        </span>
        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md border"
          style={{ background: p.bg, borderColor: p.border, color: p.bar }}>
          {p.label}
        </span>
      </div>

      {/* Title */}
      <p className="text-[12.5px] font-semibold text-[#e4e9f5] mb-1.5 leading-snug">{insight.title}</p>
      <p className="text-[11px] text-[#5c667e] leading-relaxed mb-3">{insight.body}</p>

      {/* Confidence bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono text-[#363d52]">Confidence</span>
          <span className="text-[10px] font-mono font-semibold" style={{ color: p.bar }}>{insight.confidence}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-white/[0.05]">
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width:`${insight.confidence}%`, background: p.bar, boxShadow:`0 0 8px ${p.bar}60` }} />
        </div>
      </div>

      {/* Action */}
      <button className="flex items-center gap-1.5 text-[11px] font-medium transition-colors group-hover:gap-2"
        style={{ color: clr }}>
        {insight.actionLabel} <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

export function AIInsightsPanel() {
  const { data, isLoading } = useAIInsights();

  return (
    <GlassCard glow="rgba(79,142,247,0.15)">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background:"linear-gradient(135deg,rgba(79,142,247,0.3),rgba(167,139,250,0.3))", border:"1px solid rgba(79,142,247,0.3)" }}>
          <Sparkles size={13} style={{ color:"#a78bfa" }} />
        </div>
        <div>
          <h3 className="text-[14px] font-semibold text-[#e4e9f5] leading-none">AI Insights</h3>
          <p className="text-[10px] text-[#5c667e] font-mono mt-0.5">Powered by Amdox ML — updated 4m ago</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full"
          style={{ background:"rgba(79,142,247,0.1)", border:"1px solid rgba(79,142,247,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7]"
            style={{ animation:"glow-pulse 2s ease-in-out infinite" }} />
          <span className="text-[10px] font-mono text-[#4f8ef7]">LIVE</span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0,1,2].map(i => <div key={i} className="h-28 rounded-xl shimmer" />)}
        </div>
      ) : (
        <div className="space-y-3 stagger-children">
          {data?.map(insight => <InsightCard key={insight.id} insight={insight} />)}
        </div>
      )}
    </GlassCard>
  );
}
