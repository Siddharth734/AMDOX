import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fmt = {
  currency: (v: number, compact = false) => {
    if (compact) {
      if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
      if (v >= 1_000)     return `$${(v / 1_000).toFixed(0)}K`;
    }
    return new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(v);
  },
  number:   (v: number)  => new Intl.NumberFormat("en-US").format(v),
  percent:  (v: number)  => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
  date:     (d: string)  => new Date(d).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }),
  initials: (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
};
