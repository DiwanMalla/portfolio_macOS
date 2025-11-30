"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Wifi, Battery } from "lucide-react";
import { menuConfig } from "@/constants/profile";

export default function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(dayjs().format("ddd MMM D  h:mm A"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-6 bg-black/30 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-4 text-white text-xs font-medium">
      {/* Left side - Apple logo and app name */}
      <div className="flex items-center gap-4">
        <div className="relative w-4 h-4">
          <Image 
            src="/icons/diwan-logo.png" 
            alt="Logo" 
            fill 
            className="object-contain"
          />
        </div>
        <span className="font-semibold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-linear-to-r from-white via-sky-200 to-white/80 drop-shadow-sm">
          {menuConfig.branding}
        </span>
        {menuConfig.menus.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      {/* Right side - System controls */}
      <div className="flex items-center gap-3">
        <Wifi size={14} />
        <Battery size={14} />
        <span className="tracking-wide">{time}</span>
      </div>
    </div>
  );
}
