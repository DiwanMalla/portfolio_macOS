"use client";

import { useState } from "react";
import Image from "next/image";
import { dockApps } from "@/constants/dockApps";
import useStore from "@/store/useStore";
import { Tooltip } from "react-tooltip";

export default function Dock() {
  const [hoveredApp, setHoveredApp] = useState(null);
  const openWindow = useStore((state) => state.openWindow);
  const windows = useStore((state) => state.windows);

  const handleAppClick = (app) => {
    if (app.type === "window") {
      openWindow({
        id: app.id,
        title: app.name,
        component: app.id,
      });
    }
  };

  const isAppOpen = (appId) => {
    return windows.some((w) => w.id === appId && !w.isMinimized);
  };

  return (
    <>
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-white/20 backdrop-blur-2xl rounded-2xl px-3 py-2 border border-white/30 shadow-2xl">
          <div className="flex items-end gap-2">
            {dockApps.map((app, index) => {
              const scale = hoveredApp === index ? 1.5 : 1;
              const translateY = hoveredApp === index ? -8 : 0;

              return (
                <div
                  key={app.id}
                  className="relative"
                  onMouseEnter={() => setHoveredApp(index)}
                  onMouseLeave={() => setHoveredApp(null)}
                  onClick={() => handleAppClick(app)}
                  data-tooltip-id={`dock-${app.id}`}
                  data-tooltip-content={app.name}
                >
                  <div
                    className="w-12 h-12 cursor-pointer transition-all duration-300 ease-out relative"
                    style={{
                      transform: `scale(${scale}) translateY(${translateY}px)`,
                    }}
                  >
                    <Image
                      src={app.icon}
                      alt={app.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Running indicator */}
                  {isAppOpen(app.id) && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full" />
                  )}

                  <Tooltip
                    id={`dock-${app.id}`}
                    place="top"
                    className="!bg-gray-800/90 !text-white !text-xs !px-2 !py-1 !rounded-md"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
