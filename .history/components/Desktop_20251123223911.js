"use client";

import { useEffect, useState } from "react";
import useStore from "@/store/useStore";
import { wallpapers } from "@/constants/wallpapers";
import AnimatedWallpaper from "./AnimatedWallpaper";

export default function Desktop({ children }) {
  const wallpaper = useStore((state) => state.wallpaper);
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    // Prevent context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const wallpaperUrl = wallpapers[wallpaper] || wallpapers.default;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {use3D ? (
        <AnimatedWallpaper />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${wallpaperUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
