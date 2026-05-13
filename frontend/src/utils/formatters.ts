export const currency = (v: number, compact = false): string => {
  if (compact) {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000)     return `$${(v / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(v);
};

export const number   = (v: number) => new Intl.NumberFormat("en-US").format(v);
export const percent  = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`;
export const initials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2);
