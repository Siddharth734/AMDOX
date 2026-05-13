import { cn } from "@/src/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:    string;
  error?:    string;
  icon?:     React.ReactNode;
  iconRight?:React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, iconRight, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[11px] font-mono uppercase tracking-widest text-[#5c667e]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c667e]">{icon}</span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl text-[13px] text-[#e4e9f5] placeholder:text-[#363d52] outline-none transition-all duration-200",
            "bg-white/[0.04] border border-white/[0.07]",
            "focus:border-[rgba(79,142,247,0.6)] focus:ring-2 focus:ring-[rgba(79,142,247,0.1)]",
            "hover:border-white/[0.12]",
            icon ? "pl-9 pr-4 py-2.5" : "px-4 py-2.5",
            iconRight ? "pr-9" : "",
            error && "border-rose-500/50 focus:border-rose-500/60",
            className,
          )}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5c667e]">{iconRight}</span>
        )}
      </div>
      {error && <p className="text-[11px] text-rose-400 font-mono">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
