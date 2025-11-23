import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { defaultWallpaperId } from "@/constants/wallpapers";

export interface WindowData {
  id: string;
  title: string;
  component: string;
  icon?: string;
  isMinimized?: boolean;
  isMaximized?: boolean;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  zIndex?: number;
  [key: string]: any;
}

export interface StoreState {
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
  windows: WindowData[];
  activeWindow: string | null;
  openWindow: (windowData: WindowData) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  setActiveWindow: (id: string) => void;
  updateWindowPosition: (
    id: string,
    position: { x: number; y: number }
  ) => void;
  updateWindowSize: (
    id: string,
    size: { width: number; height: number }
  ) => void;
}

const useStore = create<StoreState>()(
  immer((set) => ({
    // Wallpaper state
    wallpaper: defaultWallpaperId,
    setWallpaper: (wallpaper) =>
      set((state) => {
        state.wallpaper = wallpaper;
      }),

    // Windows state
    windows: [],
    activeWindow: null,

    openWindow: (windowData) =>
      set((state) => {
        const exists = state.windows.find((w) => w.id === windowData.id);
        if (exists) {
          exists.isMinimized = false;
          state.activeWindow = windowData.id;
          // Bring to front
          const maxZ = Math.max(0, ...state.windows.map((w) => w.zIndex || 0));
          exists.zIndex = maxZ + 1;
        } else {
          state.windows.push({
            isMinimized: false,
            isMaximized: false,
            position: { x: 100, y: 100 },
            size: { width: 800, height: 600 },
            zIndex: state.windows.length + 1,
            ...windowData, // Allow overriding defaults
          });
          state.activeWindow = windowData.id;
        }
      }),

    closeWindow: (id) =>
      set((state) => {
        state.windows = state.windows.filter((w) => w.id !== id);
        if (state.activeWindow === id) {
          state.activeWindow =
            state.windows[state.windows.length - 1]?.id || null;
        }
      }),

    minimizeWindow: (id) =>
      set((state) => {
        const window = state.windows.find((w) => w.id === id);
        if (window) {
          window.isMinimized = true;
        }
        if (state.activeWindow === id) {
          state.activeWindow = null;
        }
      }),

    maximizeWindow: (id) =>
      set((state) => {
        const window = state.windows.find((w) => w.id === id);
        if (window) {
          window.isMaximized = !window.isMaximized;
        }
      }),

    setActiveWindow: (id) =>
      set((state) => {
        state.activeWindow = id;
        const window = state.windows.find((w) => w.id === id);
        if (window) {
          window.isMinimized = false;
          // Update z-index
          const maxZ = Math.max(...state.windows.map((w) => w.zIndex || 0), 0);
          window.zIndex = maxZ + 1;
        }
      }),

    updateWindowPosition: (id, position) =>
      set((state) => {
        const window = state.windows.find((w) => w.id === id);
        if (window) {
          window.position = position;
        }
      }),

    updateWindowSize: (id, size) =>
      set((state) => {
        const window = state.windows.find((w) => w.id === id);
        if (window) {
          window.size = size;
        }
      }),
  }))
);

export default useStore;
