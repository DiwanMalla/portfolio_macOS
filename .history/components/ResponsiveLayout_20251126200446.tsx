"use client";

import { useSyncExternalStore } from "react";
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

// Subscribe to window resize events
function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

// Get current device type (client-side only)
function getSnapshot(): DeviceType {
  return getDeviceType(window.innerWidth);
}

// Server-side snapshot (default to desktop)
function getServerSnapshot(): DeviceType {
  return "desktop";
}

export default function ResponsiveLayout() {
  const deviceType = useSyncExternalStore(
    subscribeToResize,
    getSnapshot,
    getServerSnapshot
  );

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
