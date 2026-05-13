import { cn } from "@/src/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: string;        // hex color for accent glow
  padding?: "sm" | "md" | "lg" | "none";
  onClick?: () => void;
}

const padMap = { none:"", sm:"p-4", md:"p-5", lg:"p-7" };

export function GlassCard({
  children, className, hover = true, glow, padding = "md", onClick
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card rounded-2xl relative overflow-hidden",
        padMap[padding],
        hover && "cursor-default",
        onClick && "cursor-pointer",
        className,
      )}
      style={glow ? { boxShadow: `0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px ${glow}18` } : undefined}
    >
      {/* subtle top gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
      />
      {children}
    </div>
  );
}

/* ── Skeleton variants ──────────────────────────── */
export function SkeletonCard({ className }: { className?: string }) {
  return <div className={cn("glass-card rounded-2xl p-5", className)}><SkeletonLines /></div>;
}

export function SkeletonLines({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn("h-3 rounded shimmer", i === 0 ? "w-1/2" : i === count-1 ? "w-1/3" : "w-3/4")} />
      ))}
    </div>
  );
}

export function SkeletonKPI() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="h-3 w-24 rounded shimmer" />
        <div className="h-9 w-9 rounded-xl shimmer" />
      </div>
      <div className="h-8 w-28 rounded shimmer" />
      <div className="h-3 w-20 rounded shimmer" />
      <div className="h-1 w-full rounded-full shimmer mt-2" />
    </div>
  );
}

export function SkeletonChart({ height = 220 }: { height?: number }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="h-4 w-36 rounded shimmer" />
        <div className="h-6 w-20 rounded-full shimmer" />
      </div>
      <div className="w-full rounded-xl shimmer" style={{ height }} />
    </div>
  );
}
