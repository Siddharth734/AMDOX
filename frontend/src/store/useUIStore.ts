import { create } from "zustand";

interface UIStore {
  sidebarOpen:   boolean;
  commandOpen:   boolean;
  toggleSidebar: () => void;
  setSidebar:    (v: boolean) => void;
  setCommand:    (v: boolean) => void;
}

export const useUIStore = create<UIStore>(set => ({
  sidebarOpen: true,
  commandOpen: false,
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebar:    v  => set({ sidebarOpen: v }),
  setCommand:    v  => set({ commandOpen: v }),
}));
