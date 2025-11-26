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
          // Update extra data if provided (e.g. project details)
          if (windowData.project) {
            exists.project = windowData.project;
          }
        } else {
          // Calculate cascading position
          const offset = 30;
          const basePos = { x: 100, y: 50 }; // y starts at 50 to be below MenuBar (24px)
          // Find the last window's position to cascade from, or use base
          const lastWindow = state.windows[state.windows.length - 1];
          let newPos = basePos;

          if (lastWindow && lastWindow.position) {
            newPos = {
              x: lastWindow.position.x + offset,
              y: lastWindow.position.y + offset,
            };
            // Reset if it goes too far off screen (simple heuristic)
            // Ensure y never goes below MenuBar height (24px)
            if (newPos.x > 400 || newPos.y > 400) {
              newPos = basePos;
            }
            if (newPos.y < 24) {
              newPos.y = 50;
            }
          }

          // Calculate max Z-index for new window
          const maxZ = Math.max(0, ...state.windows.map((w) => w.zIndex || 0));

          // Get window size, use defaults or provided size
          const windowSize = windowData.size || { width: 800, height: 600 };

          // Ensure window fits within viewport
          const viewportWidth =
            typeof window !== "undefined" ? window.innerWidth : 1200;
          const viewportHeight =
            typeof window !== "undefined" ? window.innerHeight : 800;
          const menuBarHeight = 24;
          const dockHeight = 80;

          // Constrain size to fit in viewport
          const constrainedWidth = Math.min(
            windowSize.width,
            viewportWidth - 40
          );
          const constrainedHeight = Math.min(
            windowSize.height,
            viewportHeight - menuBarHeight - dockHeight - 20
          );

          // Ensure position keeps window visible
          const maxX = viewportWidth - constrainedWidth - 20;
          const maxY = viewportHeight - constrainedHeight - dockHeight;
          const constrainedPos = {
            x: Math.min(Math.max(newPos.x, 10), maxX),
            y: Math.min(Math.max(newPos.y, menuBarHeight + 10), maxY),
          };

          state.windows.push({
            isMinimized: false,
            isMaximized: false,
            position: constrainedPos,
            size: { width: constrainedWidth, height: constrainedHeight },
            zIndex: maxZ + 1,
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
