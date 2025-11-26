"use client";

import { useState } from "react";
import Image from "next/image";
import { desktopShortcuts, windowRegistry, dockApps } from "@/constants/apps";
import { heroContent } from "@/constants/profile";
import { wallpaperMap, defaultWallpaperId } from "@/constants/wallpapers";
import useStore from "@/store/useStore";
import {
  Home,
  FolderOpen,
  ChevronLeft,
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

export default function MobileView() {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"home" | "apps">("home");
  const wallpaper = useStore((state) => state.wallpaper);
  const wallpaperUrl = wallpaperMap[wallpaper]?.src || wallpaperMap[defaultWallpaperId].src;

  // Combine desktop shortcuts and dock apps for mobile grid
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

  // Render active app
  if (activeApp) {
    const config = windowRegistry[activeApp];
    const AppComponent = windowComponents[config?.component || activeApp];

    return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col overflow-hidden">
        {/* iOS-style status bar */}
        <div className="h-11 bg-black flex items-center justify-between px-6 text-white text-sm">
          <span className="font-semibold">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-white rounded-sm"
                  style={{ height: 4 + i * 2 }}
                />
              ))}
            </div>
            <span className="ml-2 text-xs">100%</span>
          </div>
        </div>

        {/* App header with back button */}
        <div className="h-12 bg-gray-800 flex items-center px-4 border-b border-gray-700">
          <button
            onClick={handleCloseApp}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
          >
            <ChevronLeft size={20} />
            <span className="text-sm">Back</span>
          </button>
          <span className="flex-1 text-center text-white font-medium pr-16">
            {config?.title || activeApp}
          </span>
        </div>

        {/* App content */}
        <div className="flex-1 overflow-hidden">
          {AppComponent ? (
            <AppComponent />
          ) : (
            <div className="h-full flex items-center justify-center text-white">
              <p>App not found</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      {/* iOS-style status bar */}
      <div className="h-11 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 text-white text-sm z-50">
        <span className="font-semibold">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-white rounded-sm"
                style={{ height: 4 + i * 2 }}
              />
            ))}
          </div>
          <span className="ml-2 text-xs">100%</span>
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
        <div className="absolute inset-0 bg-black/30" />

        {activeTab === "home" ? (
          /* Home Screen */
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
            {/* Profile */}
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-4 mx-auto shadow-lg">
                DM
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {heroContent.headline}
              </h1>
              <p className="text-white/80 text-lg tracking-wider">
                {heroContent.title}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {allApps.slice(0, 6).map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleOpenApp(app)}
                  className="flex flex-col items-center gap-2 p-3"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-lg">
                    <Image
                      src={app.icon}
                      alt={app.label}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Apps Grid */
          <div className="relative z-10 h-full overflow-y-auto py-6 px-4">
            <h2 className="text-white text-lg font-semibold mb-4 px-2">
              All Apps
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {allApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleOpenApp(app)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-lg">
                    <Image
                      src={app.icon}
                      alt={app.label}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-white text-[10px] font-medium text-center line-clamp-1">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* iOS-style Tab Bar */}
      <div className="h-20 bg-black/50 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-8 pb-4">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 ${
            activeTab === "home" ? "text-blue-400" : "text-white/60"
          }`}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => setActiveTab("apps")}
          className={`flex flex-col items-center gap-1 ${
            activeTab === "apps" ? "text-blue-400" : "text-white/60"
          }`}
        >
          <FolderOpen size={24} />
          <span className="text-xs">Apps</span>
        </button>
      </div>

      {/* Home indicator */}
      <div className="h-1 flex justify-center pb-2 bg-black">
        <div className="w-32 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
