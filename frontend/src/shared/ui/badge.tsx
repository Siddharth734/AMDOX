import { cn } from "@/src/lib/utils";
import type { Role } from "@/src/types";
import { ROLES } from "@/src/lib/rbac";

/* ── Role Badge ─────────────────────────────────── */
export function RoleBadge({ role, size = "sm" }: { role: Role; size?: "sm" | "md" }) {
  const cfg = ROLES[role];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-mono font-medium border",
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1",
      )}
      style={{
        background: `${cfg.color}15`,
        borderColor: `${cfg.color}30`,
        color: cfg.color,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {cfg.label}
    </span>
  );
}

/* ── Status Badge ───────────────────────────────── */
const STATUS: Record<string, { label: string; bg: string; border: string; text: string }> = {
  active:         { label:"Active",        bg:"rgba(52,211,153,0.12)",  border:"rgba(52,211,153,0.25)",  text:"#34d399" },
  inactive:       { label:"Inactive",      bg:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.10)", text:"#5c667e" },
  "on-leave":     { label:"On Leave",      bg:"rgba(167,139,250,0.12)", border:"rgba(167,139,250,0.25)", text:"#a78bfa" },
  pending:        { label:"Pending",       bg:"rgba(251,191,36,0.12)",  border:"rgba(251,191,36,0.25)",  text:"#fbbf24" },
  completed:      { label:"Completed",     bg:"rgba(52,211,153,0.12)",  border:"rgba(52,211,153,0.25)",  text:"#34d399" },
  "in-progress":  { label:"In Progress",   bg:"rgba(79,142,247,0.12)",  border:"rgba(79,142,247,0.25)",  text:"#4f8ef7" },
  "on-hold":      { label:"On Hold",       bg:"rgba(251,113,133,0.12)", border:"rgba(251,113,133,0.25)", text:"#fb7185" },
  planning:       { label:"Planning",      bg:"rgba(167,139,250,0.12)", border:"rgba(167,139,250,0.25)", text:"#a78bfa" },
  "in-stock":     { label:"In Stock",      bg:"rgba(52,211,153,0.12)",  border:"rgba(52,211,153,0.25)",  text:"#34d399" },
  "low-stock":    { label:"Low Stock",     bg:"rgba(251,191,36,0.12)",  border:"rgba(251,191,36,0.25)",  text:"#fbbf24" },
  "out-of-stock": { label:"Out of Stock",  bg:"rgba(244,114,182,0.12)", border:"rgba(244,114,182,0.25)", text:"#f472b6" },
  critical:       { label:"Critical",      bg:"rgba(251,113,133,0.12)", border:"rgba(251,113,133,0.25)", text:"#fb7185" },
  high:           { label:"High",          bg:"rgba(251,113,133,0.12)", border:"rgba(251,113,133,0.25)", text:"#fb7185" },
  medium:         { label:"Medium",        bg:"rgba(251,191,36,0.12)",  border:"rgba(251,191,36,0.25)",  text:"#fbbf24" },
  low:            { label:"Low",           bg:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.10)", text:"#5c667e" },
};

export function StatusBadge({ status, dot = true, className }: { status: string; dot?: boolean; className?: string }) {
  const cfg = STATUS[status] ?? { label: status, bg:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.10)", text:"#9aa3bb" };
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium border", className)}
      style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}
      {cfg.label}
    </span>
  );
}

/* ── Module chip ────────────────────────────────── */
const MODULE_COLORS: Record<string, string> = {
  HR:        "#a78bfa", Finance:"#34d399", Supply:"#fbbf24",
  Analytics: "#4f8ef7", AI:     "#06b6d4",
};
export function ModuleChip({ module }: { module: string }) {
  const c = MODULE_COLORS[module] ?? "#9aa3bb";
  return (
    <span
      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full"
      style={{ background:`${c}15`, color: c }}
    >
      {module}
    </span>
  );
}
