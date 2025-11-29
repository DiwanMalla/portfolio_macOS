"use client";

import { useEffect, useState, ReactNode } from "react";
import useStore from "@/store/useStore";
import { wallpaperMap, defaultWallpaperId } from "@/constants/wallpapers";
import AnimatedWallpaper from "./AnimatedWallpaper";
import Spotlight from "./Spotlight";

interface DesktopProps {
  children: ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
  const wallpaper = useStore((state) => state.wallpaper);
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    // Prevent context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const wallpaperAsset =
    wallpaperMap[wallpaper] || wallpaperMap[defaultWallpaperId];
  const wallpaperUrl =
    wallpaperAsset?.src || wallpaperMap[defaultWallpaperId].src;
  const glowColor = wallpaperAsset?.glow || "rgba(59, 130, 246, 0.25)";

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {use3D ? (
        <AnimatedWallpaper />
      ) : (
        <>
          <div
            className="absolute inset-0 animate-slow-zoom"
            style={{
              backgroundImage: `url(${wallpaperUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/35 to-black/65 opacity-80" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${glowColor}, transparent 55%)`,
            }}
          />
        </>
      )}
      <div className="relative z-10 h-full w-full">
        {children}
        <Spotlight />
      </div>
    </div>
  );
}
