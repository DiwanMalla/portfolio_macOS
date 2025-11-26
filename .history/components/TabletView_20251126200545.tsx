"use client";

import { useState } from "react";
import Image from "next/image";
import { desktopShortcuts, windowRegistry, dockApps } from "@/constants/apps";
import { heroContent } from "@/constants/profile";
import { wallpaperMap, defaultWallpaperId } from "@/constants/wallpapers";
import useStore from "@/store/useStore";
import {
  Home,
} from "lucide-react";

// Import window components
import Terminal from "./windows/Terminal";
import Safari from "./windows/Safari";
import Photos from "./windows/Photos";
import Blog from "./windows/Blog";
import Finder from "./windows/Finder";
import Resume from "./windows/Resume";
import Contact from "./windows/Contact";
import Trash from "./windows/Trash";
import AboutMe from "./windows/AboutMe";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const windowComponents: Record<string, React.ComponentType<any>> = {
  terminal: Terminal,
  safari: Safari,
  photos: Photos,
  blog: Blog,
  finder: Finder,
  resume: Resume,
  contact: Contact,
  trash: Trash,
  aboutme: AboutMe,
};

interface AppItem {
  id: string;
  label: string;
  icon: string;
  component: string;
}

export default function TabletView() {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const wallpaper = useStore((state) => state.wallpaper);
  const wallpaperUrl = wallpaperMap[wallpaper]?.src || wallpaperMap[defaultWallpaperId].src;

  // Combine desktop shortcuts and dock apps for tablet grid
  const allApps: AppItem[] = [
    ...desktopShortcuts.map((s) => ({
      id: s.target,
      label: s.label,
      icon: s.icon,
      component: windowRegistry[s.target]?.component || s.target,
    })),
    ...dockApps
      .filter((app) => !desktopShortcuts.some((s) => s.target === app.id))
      .map((app) => ({
        id: app.id,
        label: app.name,
        icon: app.icon,
        component: windowRegistry[app.id]?.component || app.id,
      })),
  ];

  const handleOpenApp = (app: AppItem) => {
    setActiveApp(app.id);
  };

  const handleCloseApp = () => {
    setActiveApp(null);
  };

  // Render active app (iPad-style split view capable)
  if (activeApp) {
    const config = windowRegistry[activeApp];
    const AppComponent = windowComponents[config?.component || activeApp];

    return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col overflow-hidden">
        {/* iPadOS-style status bar */}
        <div className="h-6 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 text-white text-xs">
          <span className="font-medium">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="font-semibold tracking-wide">
            {config?.title || activeApp}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-0.5 bg-white rounded-sm"
                  style={{ height: 3 + i * 1.5 }}
                />
              ))}
            </div>
            <span className="text-[10px]">100%</span>
          </div>
        </div>

        {/* App content */}
        <div className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900">
          {AppComponent ? (
            <AppComponent />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>App not found</p>
            </div>
          )}
        </div>

        {/* iPadOS Dock */}
        <div className="h-20 bg-black/30 backdrop-blur-2xl border-t border-white/10 flex items-center justify-center gap-3 px-6 pb-2">
          {/* Back/Home button */}
          <button
            onClick={handleCloseApp}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mr-4"
          >
            <Home size={24} className="text-white" />
          </button>

          {/* App icons in dock */}
          {dockApps.slice(0, 6).map((app) => (
            <button
              key={app.id}
              onClick={() => {
                const appItem = allApps.find((a) => a.id === app.id);
                if (appItem) handleOpenApp(appItem);
              }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                activeApp === app.id
                  ? "bg-white/30 ring-2 ring-white/50"
                  : "bg-white/10 backdrop-blur-xl"
              }`}
            >
              <Image
                src={app.icon}
                alt={app.name}
                width={36}
                height={36}
                className="object-contain"
              />
            </button>
          ))}
        </div>

        {/* Home indicator */}
        <div className="h-2 flex justify-center pb-1 bg-black/30">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      {/* iPadOS-style status bar */}
      <div className="h-6 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 text-white text-xs z-50">
        <span className="font-medium">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-white rounded-sm"
                style={{ height: 3 + i * 1.5 }}
              />
            ))}
          </div>
          <span className="text-[10px]">100%</span>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${wallpaperUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* iPad Home Screen Grid */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          {/* Hero section */}
          <div className="text-center mb-8">
            <div className="w-28 h-28 rounded-3xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mb-4 mx-auto shadow-2xl">
              DM
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {heroContent.headline}
            </h1>
            <p className="text-white/80 text-xl tracking-wider">
              {heroContent.title}
            </p>
          </div>

          {/* Apps Grid - iPad style 5 columns */}
          <div className="grid grid-cols-5 gap-6 max-w-3xl">
            {allApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleOpenApp(app)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-xl flex items-center justify-center shadow-xl group-hover:bg-white/25 transition-all group-hover:scale-105">
                  <Image
                    src={app.icon}
                    alt={app.label}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span className="text-white text-sm font-medium drop-shadow-md">
                  {app.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* iPadOS Dock */}
      <div className="h-24 bg-black/30 backdrop-blur-2xl border-t border-white/10 flex items-center justify-center gap-4 px-8 pb-4">
        {dockApps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              const appItem = allApps.find((a) => a.id === app.id);
              if (appItem) handleOpenApp(appItem);
            }}
            className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-xl flex items-center justify-center shadow-lg hover:bg-white/25 transition-all hover:scale-105"
          >
            <Image
              src={app.icon}
              alt={app.name}
              width={40}
              height={40}
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {/* Home indicator */}
      <div className="h-2 flex justify-center pb-1 bg-black/30">
        <div className="w-32 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
