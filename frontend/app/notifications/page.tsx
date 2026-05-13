"use client";
import { AppShell }   from "@/src/shared/components/app-shell";
import { useNotifStore } from "@/src/store/useNotificationStore";
import { GlassCard }  from "@/src/shared/ui/glass-card";
import { Button }     from "@/src/shared/ui/button";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

const KIND_CLR = {
  success:"#34d399", warning:"#fbbf24", info:"#4f8ef7", error:"#fb7185",
};

export default function NotificationsPage() {
  const { items, unread, markAllRead, clearAll, markRead } = useNotifStore();

  return (
    <AppShell requiredModule="notifications">
      <div className="max-w-[900px] mx-auto animate-[fade-in_0.4s_ease_forwards]">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[11px] font-mono border border-white/[0.08] text-[#9aa3bb]"
              style={{ background:"rgba(255,255,255,0.04)" }}>
              <Bell size={10} /> NOTIFICATIONS
            </div>
            <h1 className="text-[26px] font-display font-700 text-white tracking-tight">Notifications</h1>
            <p className="text-[13px] text-[#5c667e] mt-1.5 font-mono">{unread} unread · {items.length} total</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Button variant="ghost" size="sm" icon={<CheckCheck size={13}/>} onClick={markAllRead}>Mark all read</Button>
            <Button variant="danger" size="sm" icon={<Trash2 size={13}/>} onClick={clearAll}>Clear all</Button>
          </div>
        </div>

        <GlassCard padding="none">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell size={32} className="text-[#363d52] mb-3" />
              <p className="text-[13px] font-medium text-[#5c667e]">No notifications</p>
              <p className="text-[11px] text-[#363d52] font-mono mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
              {items.map(n => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={cn(
                    "flex items-start gap-4 px-6 py-4 cursor-pointer transition-colors hover:bg-white/[0.02]",
                    !n.read && "bg-white/[0.015]",
                  )}
                >
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: KIND_CLR[n.kind], boxShadow: !n.read ? `0 0 8px ${KIND_CLR[n.kind]}80` : undefined, opacity: n.read ? 0.4 : 1 }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className={cn("text-[13px] font-medium leading-snug", n.read ? "text-[#9aa3bb]" : "text-[#e4e9f5]")}>{n.title}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {n.module && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                            style={{ background:`${KIND_CLR[n.kind]}15`, color: KIND_CLR[n.kind] }}>
                            {n.module}
                          </span>
                        )}
                        {!n.read && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:"#4f8ef7" }} />}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#5c667e] mt-0.5 leading-relaxed">{n.body}</p>
                    <p className="text-[10px] text-[#363d52] font-mono mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </AppShell>
  );
}
