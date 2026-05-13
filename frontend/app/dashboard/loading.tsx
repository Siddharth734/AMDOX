export default function DashboardLoading() {
  return (
    <div
      className="min-h-screen flex p-4"
      style={{
        background: "linear-gradient(135deg,#d9e8f8 0%,#dfd5f5 40%,#e8d5f5 70%,#edd8f2 100%)",
        gap: "12px",
      }}
    >
      {/* Sidebar skeleton */}
      <div
        className="w-[178px] flex-shrink-0 rounded-2xl p-4"
        style={{ background: "rgba(255,255,255,0.82)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full shimmer" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-20 rounded shimmer" />
            <div className="h-2 w-14 rounded shimmer" />
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-8 rounded-xl shimmer" />
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex flex-col flex-1 gap-3">
        {/* Topbar */}
        <div className="flex items-center justify-between h-8">
          <div className="h-6 w-32 rounded shimmer" />
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-lg shimmer" />
            <div className="h-8 w-8 rounded-lg shimmer" />
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl shimmer" />
          ))}
        </div>

        {/* Charts + sidebar */}
        <div className="flex-1 grid grid-cols-[1fr_230px] gap-3">
          <div className="grid grid-cols-2 gap-3 h-full">
            <div className="rounded-2xl shimmer" />
            <div className="rounded-2xl shimmer" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-32 rounded-2xl shimmer" />
            <div className="flex-1 rounded-2xl shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
