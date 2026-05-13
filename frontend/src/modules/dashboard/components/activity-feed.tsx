import { CheckCircle2, AlertTriangle, Info, XCircle, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useActivityFeed } from "@/src/hooks/useData";
import { GlassCard } from "@/src/shared/ui/glass-card";
import { ModuleChip } from "@/src/shared/ui/badge";
import type { ActivityItem } from "@/src/types";

const TYPE_CFG = {
  success: { Icon: CheckCircle2, color:"#34d399", bg:"rgba(52,211,153,0.1)",  border:"rgba(52,211,153,0.2)"  },
  warning: { Icon: AlertTriangle, color:"#fbbf24", bg:"rgba(251,191,36,0.1)",  border:"rgba(251,191,36,0.2)"  },
  info:    { Icon: Info,           color:"#4f8ef7", bg:"rgba(79,142,247,0.1)",  border:"rgba(79,142,247,0.2)"  },
  error:   { Icon: XCircle,        color:"#fb7185", bg:"rgba(251,113,133,0.1)", border:"rgba(251,113,133,0.2)" },
};

function ActivityRow({ item, isLast }: { item: ActivityItem; isLast: boolean }) {
  const cfg = TYPE_CFG[item.type];
  const { Icon } = cfg;
  return (
    <div className="flex items-start gap-3 py-3 px-2 rounded-xl hover:bg-white/[0.02] transition-colors cursor-default">
      <div className="flex flex-col items-center gap-1 mt-0.5 flex-shrink-0">
        <div className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: cfg.bg, border:`1px solid ${cfg.border}` }}>
          <Icon size={13} style={{ color: cfg.color }} />
        </div>
        {!isLast && <div className="w-px flex-1 min-h-[14px] bg-white/[0.04]" />}
      </div>
      <div className="flex-1 min-w-0 pb-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[12.5px] font-medium text-[#e4e9f5] leading-snug">{item.title}</p>
          <ModuleChip module={item.module} />
        </div>
        <p className="text-[11px] text-[#5c667e] mt-0.5 leading-relaxed">{item.description}</p>
        <p className="text-[10px] text-[#363d52] font-mono mt-1">{item.time}</p>
      </div>
    </div>
  );
}

export function DashboardActivityFeed() {
  const { data, isLoading } = useActivityFeed();

  if (isLoading) return (
    <GlassCard>
      <div className="h-4 w-32 rounded shimmer mb-5" />
      {[0,1,2,3,4].map(i => (
        <div key={i} className="flex gap-3 py-3">
          <div className="w-7 h-7 rounded-full shimmer flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 rounded shimmer" />
            <div className="h-3 w-1/2 rounded shimmer" />
          </div>
        </div>
      ))}
    </GlassCard>
  );

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[14px] font-semibold text-[#e4e9f5]">Activity Feed</h3>
          <p className="text-[11px] text-[#5c667e] font-mono mt-0.5">Live events across all modules</p>
        </div>
        <button className="flex items-center gap-1 text-[11px] text-[#4f8ef7] hover:text-blue-300 font-medium transition-colors">
          View all <ArrowRight size={11} />
        </button>
      </div>
      <div className="stagger-children">
        {data?.map((item, i) => (
          <ActivityRow key={item.id} item={item} isLast={i === (data?.length ?? 0) - 1} />
        ))}
      </div>
    </GlassCard>
  );
}
