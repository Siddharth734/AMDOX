"use client";
import { DollarSign, Users, CheckSquare, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useKPICards } from "@/src/hooks/useData";
import { GlassCard, SkeletonKPI } from "@/src/shared/ui/glass-card";
import type { KPICard } from "@/src/types";

const ICON_MAP = { DollarSign, Users, CheckSquare, TrendingUp };

const COLOR_CFG: Record<string, { icon: string; iconText: string; bar: string; glow: string }> = {
  blue:    { icon:"rgba(79,142,247,0.15)",  iconText:"#4f8ef7",  bar:"#4f8ef7",  glow:"rgba(79,142,247,0.3)"  },
  violet:  { icon:"rgba(167,139,250,0.15)", iconText:"#a78bfa",  bar:"#a78bfa",  glow:"rgba(167,139,250,0.3)" },
  amber:   { icon:"rgba(251,191,36,0.15)",  iconText:"#fbbf24",  bar:"#fbbf24",  glow:"rgba(251,191,36,0.3)"  },
  emerald: { icon:"rgba(52,211,153,0.15)",  iconText:"#34d399",  bar:"#34d399",  glow:"rgba(52,211,153,0.3)"  },
};

function KPIItem({ card }: { card: KPICard }) {
  const Icon  = ICON_MAP[card.icon as keyof typeof ICON_MAP] ?? DollarSign;
  const cfg   = COLOR_CFG[card.color] ?? COLOR_CFG.blue;
  const isUp  = card.trend === "up";
  const pct   = Math.min(100, 30 + Math.abs(card.change) * 4);

  return (
    <GlassCard glow={cfg.glow} className="group">
      <div className="flex items-start justify-between mb-4">
        <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#5c667e]">{card.label}</p>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: cfg.icon }}>
          <Icon size={17} style={{ color: cfg.iconText }} />
        </div>
      </div>
      <p className="text-[28px] font-display font-700 text-white tracking-tight leading-none mb-2">{card.formatted}</p>
      <div className="flex items-center gap-1.5 mb-4">
        <span className={cn("flex items-center gap-0.5 text-[11px] font-mono font-semibold", isUp ? "text-emerald-400" : "text-rose-400")}>
          {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {Math.abs(card.change)}%
        </span>
        <span className="text-[11px] text-[#5c667e]">{card.suffix}</span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-white/[0.05] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000"
          style={{ width:`${pct}%`, background: cfg.bar, boxShadow:`0 0 8px ${cfg.glow}` }} />
      </div>
    </GlassCard>
  );
}

export function KPICards() {
  const { data, isLoading } = useKPICards();
  if (isLoading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {[0,1,2,3].map(i => <SkeletonKPI key={i} />)}
    </div>
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger-children">
      {data?.map(card => <KPIItem key={card.id} card={card} />)}
    </div>
  );
}
