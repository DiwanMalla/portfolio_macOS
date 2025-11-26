"use client";

import { useState, useEffect, useLayoutEffect } from "react";
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

// Custom hook for detecting device type with SSR support
function useDeviceType() {
  const [mounted, setMounted] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  // Use useLayoutEffect to detect device before paint
  useLayoutEffect(() => {
    setDeviceType(getDeviceType(window.innerWidth));
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { deviceType, mounted };
}

export default function ResponsiveLayout() {
  const { deviceType, mounted } = useDeviceType();

  // Show a loading screen while determining device type on SSR
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
