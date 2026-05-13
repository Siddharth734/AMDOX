import { cn } from "@/src/lib/utils";

interface Column<T> {
  key:        keyof T | string;
  header:     string;
  width?:     string;
  align?:     "left" | "center" | "right";
  render?:    (value: unknown, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns:    Column<T>[];
  data:       T[];
  keyField:   keyof T;
  className?: string;
  onRowClick?:(row: T) => void;
  empty?:     React.ReactNode;
  loading?:   boolean;
}

export function Table<T>({ columns, data, keyField, className, onRowClick, empty, loading }: TableProps<T>) {
  return (
    <div className={cn("glass-card rounded-2xl overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className="text-[10px] font-mono uppercase tracking-widest text-[#5c667e] px-5 py-3.5 text-left font-medium whitespace-nowrap"
                  style={{ width: col.width, textAlign: col.align ?? "left" }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-5 py-3.5">
                      <div className="h-3 rounded shimmer" style={{ width:`${60 + Math.random()*30}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-[13px] text-[#5c667e]">
                  {empty ?? "No data available"}
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr
                  key={String(row[keyField])}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "transition-colors",
                    "hover:bg-white/[0.02]",
                    onRowClick && "cursor-pointer",
                  )}
                  style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}
                >
                  {columns.map(col => (
                    <td
                      key={String(col.key)}
                      className="px-5 py-3.5 text-[12.5px] text-[#9aa3bb]"
                      style={{ textAlign: col.align ?? "left" }}
                    >
                      {col.render
                        ? col.render(row[col.key as keyof T], row)
                        : String(row[col.key as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
