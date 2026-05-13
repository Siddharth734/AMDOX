"use client";
import { AppShell }     from "@/src/shared/components/app-shell";
import { GlassCard }    from "@/src/shared/ui/glass-card";
import { FolderKanban } from "lucide-react";
export default function ProjectsDashboard() {
  return (
    <AppShell requiredModule="projects">
      <div className="max-w-[1440px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border"
            style={{ background:"rgba(244,114,182,0.1)", borderColor:"rgba(244,114,182,0.25)", color:"#f472b6" }}>
            <FolderKanban size={10} /> PROJECTS MODULE
          </div>
          <h1 className="text-[26px] font-display font-700 text-white">Projects</h1>
          <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">Task board · Milestones · Resources · Budget</p>
        </div>
        <GlassCard className="p-12 text-center border-2 border-dashed border-white/[0.07]">
          <FolderKanban size={36} className="mx-auto mb-4" style={{ color:"rgba(244,114,182,0.3)" }} />
          <p className="text-[14px] font-semibold text-[#9aa3bb] mb-1">Projects Module — Kalendra</p>
          <p className="text-[11px] text-[#5c667e] font-mono">Build ProjectTable, KanbanBoard, ProgressBar in src/modules/projects/components/</p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
