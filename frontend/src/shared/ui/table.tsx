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
    <div className={cn("erp-table-wrap", className)}>
      <table className="erp-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={String(col.key)}
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
              <tr key={i}>
                {columns.map(col => (
                  <td key={String(col.key)}>
                    <div className="shimmer" style={{ height: "12px", width:`${60 + Math.random()*30}%`, borderRadius: "4px" }} />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center", padding: "40px 20px", color: "#8890b0", fontSize: "13px" }}>
                {empty ?? "No data available"}
              </td>
            </tr>
          ) : (
            data.map(row => (
              <tr
                key={String(row[keyField])}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "clickable" : undefined}
              >
                {columns.map(col => (
                  <td
                    key={String(col.key)}
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
  );
}
