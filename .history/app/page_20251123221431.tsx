"use client";

import Desktop from "@/components/Desktop";
import MenuBar from "@/components/MenuBar";
import Dock from "@/components/Dock";
import WindowManager from "@/components/WindowManager";

export default function Home() {
  return (
    <Desktop>
      <MenuBar />
      <WindowManager />
      <Dock />
      <div className="h-full w-full flex items-center justify-center pt-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h1 className="text-white text-4xl font-bold">Mac OS Portfolio</h1>
          <p className="text-white/80 mt-2">Windows Complete ✅</p>
          <p className="text-white/60 text-sm mt-4">
            Click dock icons to open windows!
          </p>
        </div>
      </div>
    </Desktop>
  );
}
