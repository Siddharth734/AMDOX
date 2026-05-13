import { cn } from "@/src/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant;
  size?:     Size;
  loading?:  boolean;
  icon?:     React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "bg-[#4f8ef7] hover:bg-[#3b7be3] text-white shadow-[0_0_20px_rgba(79,142,247,0.25)]",
  ghost:   "bg-white/[0.04] hover:bg-white/[0.08] text-[#9aa3bb] hover:text-white border border-white/[0.07] hover:border-white/[0.15]",
  outline: "bg-transparent hover:bg-white/[0.04] text-[#e4e9f5] border border-white/[0.12] hover:border-white/[0.25]",
  danger:  "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/40",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-[11px] rounded-lg gap-1.5",
  md: "px-4 py-2 text-[12.5px] rounded-xl gap-2",
  lg: "px-5 py-2.5 text-[13px] rounded-xl gap-2.5",
};

export function Button({
  variant = "primary", size = "md", loading, icon, iconRight,
  fullWidth, className, children, disabled, ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none",
        variants[variant], sizes[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}
