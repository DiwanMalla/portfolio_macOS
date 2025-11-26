"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import MobileView from "./MobileView";
import TabletView from "./TabletView";

// Desktop components
import Desktop from "./Desktop";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import WindowManager from "./WindowManager";
import IntroText from "./IntroText";
import DesktopGrid from "./DesktopGrid";

type DeviceType = "mobile" | "tablet" | "desktop";

function getDeviceType(width: number): DeviceType {
  if (width < 768) return "mobile"; // iPhone
  if (width < 1024) return "tablet"; // iPad
  return "desktop"; // macOS
}

// Subscribe to window resize
function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot(): DeviceType {
  return getDeviceType(window.innerWidth);
}

// Server returns null to trigger loading state
function getServerSnapshot(): DeviceType | null {
  return null;
}

export default function ResponsiveLayout() {
  const [mounted, setMounted] = useState(false);

  // Get device type from window width
  const deviceType = useSyncExternalStore(
    subscribe,
    getSnapshot,
    // Return mobile as default for SSR to avoid flash
    () => "mobile" as DeviceType
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a loading screen while hydrating
  if (!mounted) {
    return (
      <div
        className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/wallpapers/default.jpg')` }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-white/70 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Mobile view (iPhone-style)
  if (deviceType === "mobile") {
    return <MobileView />;
  }

  // Tablet view (iPad-style)
  if (deviceType === "tablet") {
    return <TabletView />;
  }

  // Desktop view (macOS-style)
  return (
    <Desktop>
      <IntroText />
      <DesktopGrid />
      <MenuBar />
      <WindowManager />
      <Dock />
    </Desktop>
  );
}
