"use client";

import { desktopShortcuts, windowRegistry } from "@/constants/apps";
import DesktopIcon from "./ui/DesktopIcon";
import useStore from "@/store/useStore";

export default function DesktopGrid() {
  const openWindow = useStore((state) => state.openWindow);

  const handleOpen = (shortcut) => {
    const targetId = shortcut.target;
    const config = windowRegistry[targetId];

    if (config) {
      openWindow({
        id: config.id,
        title: config.title,
        component: config.component,
        size: config.defaultSize,
        position: config.defaultPosition,
      });
    }
  };

  return (
    <div className="desktop-container absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full pointer-events-auto">
        {desktopShortcuts.map((item, i) => (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            style={{
              top: 40 + i * 110,
              right: 20,
            }}
            onDoubleClick={() => handleOpen(item)}
          />
        ))}
      </div>
    </div>
  );
}
