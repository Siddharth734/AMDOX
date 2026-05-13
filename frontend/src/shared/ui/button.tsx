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
  primary: "btn-primary",
  ghost:   "btn-ghost",
  outline: "btn-outline",
  danger:  "btn-danger",
};

const sizes: Record<Size, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
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
        "btn",
        variants[variant], sizes[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}
