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

/* ── Status Badge (light theme) ─────────────────── */
const STATUS: Record<string, { label: string; bg: string; color: string }> = {
  active:         { label:"Active",        bg:"#e0f8ed", color:"#1fa866" },
  inactive:       { label:"Inactive",      bg:"#f0f2f8", color:"#8890b0" },
  "on-leave":     { label:"On Leave",      bg:"#fff6e8", color:"#d08a2e" },
  pending:        { label:"Pending",       bg:"#fff6e8", color:"#d08a2e" },
  completed:      { label:"Completed",     bg:"#e0f8ed", color:"#1fa866" },
  "in-progress":  { label:"In Progress",   bg:"#e8eeff", color:"#5b7cf5" },
  "on-hold":      { label:"On Hold",       bg:"#fff0f0", color:"#d04848" },
  planning:       { label:"Planning",      bg:"#f0eeff", color:"#9b7cf5" },
  "in-stock":     { label:"In Stock",      bg:"#e0f8ed", color:"#1fa866" },
  "low-stock":    { label:"Low Stock",     bg:"#fff6e8", color:"#d08a2e" },
  "out-of-stock": { label:"Out of Stock",  bg:"#fff0f0", color:"#d04848" },
  critical:       { label:"Critical",      bg:"#fff0f0", color:"#d04848" },
  high:           { label:"High",          bg:"#fff0f0", color:"#d04848" },
  medium:         { label:"Medium",        bg:"#fff6e8", color:"#d08a2e" },
  low:            { label:"Low",           bg:"#f0f2f8", color:"#8890b0" },
  processing:     { label:"Processing",    bg:"#fff6e8", color:"#d08a2e" },
  ready:          { label:"Ready",         bg:"#e0f8ed", color:"#1fa866" },
};

export function StatusBadge({ status, dot = true, className }: { status: string; dot?: boolean; className?: string }) {
  const cfg = STATUS[status] ?? { label: status, bg:"#f0f2f8", color:"#8890b0" };
  return (
    <span
      className={cn("erp-status", status, className)}
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {dot && <span className="dot" style={{ background: cfg.color }} />}
      {cfg.label}
    </span>
  );
}

/* ── Module chip ────────────────────────────────── */
const MODULE_COLORS: Record<string, string> = {
  HR:        "#9b7cf5", Finance:"#1fa866", Supply:"#d08a2e",
  Analytics: "#5b7cf5", AI:     "#38b4e0", Projects:"#c0550a",
};
export function ModuleChip({ module }: { module: string }) {
  const c = MODULE_COLORS[module] ?? "#5a6080";
  return (
    <span
      style={{
        fontSize: "10px",
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: "6px",
        background: `${c}18`,
        color: c,
      }}
    >
      {module}
    </span>
  );
}
