"use client";

import { useState, useEffect } from "react";
import MobileView from "./MobileView";
import TabletView from "./TabletView";

// Desktop components
import Desktop from "./Desktop";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import WindowManager from "./WindowManager";
import IntroText from "./IntroText";
import DesktopGrid from "./DesktopGrid";

type DeviceType = "mobile" | "tablet" | "desktop" | null;

function getDeviceType(width: number): "mobile" | "tablet" | "desktop" {
  if (width < 768) return "mobile"; // iPhone
  if (width < 1024) return "tablet"; // iPad
  return "desktop"; // macOS
}

export default function ResponsiveLayout() {
  // Start with null to indicate we haven't determined the device yet
  const [deviceType, setDeviceType] = useState<DeviceType>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set initial device type
    setDeviceType(getDeviceType(window.innerWidth));
    setMounted(true);

    // Listen for resize events
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show a loading screen while determining device type
  if (!mounted || deviceType === null) {
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
