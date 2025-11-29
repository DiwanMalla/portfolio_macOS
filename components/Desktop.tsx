"use client";

import { useEffect, useState, ReactNode } from "react";
import useStore from "@/store/useStore";
import { wallpaperMap, defaultWallpaperId } from "@/constants/wallpapers";
import AnimatedWallpaper from "./AnimatedWallpaper";
import Spotlight from "./Spotlight";
import { useDayNightCycle } from "@/hooks/useDayNightCycle";

interface DesktopProps {
  children: ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
  const wallpaper = useStore((state) => state.wallpaper);
  const [use3D, setUse3D] = useState(false);
  const { theme, currentHour } = useDayNightCycle();

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

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {use3D ? (
        <AnimatedWallpaper theme={theme} />
      ) : (
        <>
          {/* Base wallpaper */}
          <div
            className="absolute inset-0 animate-slow-zoom transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${wallpaperUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          
          {/* Day/Night gradient overlay */}
          <div 
            className="absolute inset-0 transition-all duration-[3000ms] ease-in-out"
            style={{
              background: theme.skyGradient,
              opacity: 0.3,
            }}
          />
          
          {/* Darkening overlay */}
          <div 
            className="absolute inset-0 transition-all duration-[3000ms] ease-in-out"
            style={{
              backgroundColor: theme.overlayColor,
            }}
          />
          
          {/* Glow effect */}
          <div
            className="absolute inset-0 transition-all duration-[3000ms] ease-in-out"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${theme.glowColor}, transparent 55%)`,
            }}
          />
          
          {/* Time indicator */}
          <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="text-lg">
                {theme.timeOfDay === "dawn" && "🌅"}
                {theme.timeOfDay === "day" && "☀️"}
                {theme.timeOfDay === "dusk" && "🌇"}
                {theme.timeOfDay === "night" && "🌙"}
              </span>
              <span className="capitalize font-medium">{theme.timeOfDay}</span>
              <span className="text-white/50">•</span>
              <span>{currentHour}:00</span>
            </div>
          </div>
        </>
      )}
      <div className="relative z-10 h-full w-full">
        {children}
        <Spotlight />
      </div>
    </div>
  );
}
