import { useState, useMemo } from "react";

export function usePagination<T>(data: T[], pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginated  = useMemo(
    () => data.slice((page - 1) * pageSize, page * pageSize),
    [data, page, pageSize]
  );
  return {
    page, setPage, totalPages,
    paginated, total: data.length,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    next: () => setPage(p => Math.min(p + 1, totalPages)),
    prev: () => setPage(p => Math.max(p - 1, 1)),
  };
}
