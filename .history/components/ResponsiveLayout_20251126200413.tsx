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

// Custom hook to handle client-side only rendering
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useLayoutEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

export default function ResponsiveLayout() {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted) return;

    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasMounted]);

  // Prevent hydration mismatch by showing nothing until mounted
  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
