import { create } from "zustand";
import type { Notification } from "@/src/types";

const INITIAL: Notification[] = [
  { id:"n1", title:"Payroll run completed",    body:"9,834 employees processed",       time:"2m ago",  read:false, kind:"success", module:"HR" },
  { id:"n2", title:"Low stock alert",          body:"ELEC-4421 below threshold",       time:"18m ago", read:false, kind:"warning", module:"Inventory" },
  { id:"n3", title:"Invoice pending review",   body:"INV-88234 needs attention",       time:"1h ago",  read:false, kind:"info",    module:"Finance" },
  { id:"n4", title:"ML model retrained",       body:"MAPE improved to 8.2%",           time:"2h ago",  read:true,  kind:"success", module:"Analytics" },
  { id:"n5", title:"Q2 board report exported", body:"PDF distributed to stakeholders", time:"3h ago",  read:true,  kind:"info",    module:"Finance" },
  { id:"n6", title:"Reorder PO created",       body:"PO-2026-4421 sent to vendor",     time:"4h ago",  read:true,  kind:"success", module:"Inventory" },
];

interface NotifStore {
  items:       Notification[];
  unread:      number;
  addNotif:    (n: Omit<Notification, "id">) => void;
  markRead:    (id: string) => void;
  markAllRead: () => void;
  clearAll:    () => void;
}

export const useNotifStore = create<NotifStore>(set => ({
  items:       INITIAL,
  unread:      INITIAL.filter(n => !n.read).length,

  addNotif: (n) => set(s => {
    const item = { ...n, id: `n${Date.now()}` };
    return { items: [item, ...s.items], unread: s.unread + (n.read ? 0 : 1) };
  }),

  markRead: (id) => set(s => {
    const items = s.items.map(n => n.id === id ? { ...n, read:true } : n);
    return { items, unread: items.filter(n => !n.read).length };
  }),

  markAllRead: () => set(s => ({ items: s.items.map(n => ({...n, read:true})), unread:0 })),
  clearAll:    () => set({ items:[], unread:0 }),
}));
