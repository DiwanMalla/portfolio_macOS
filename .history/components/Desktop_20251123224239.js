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
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        </>
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
