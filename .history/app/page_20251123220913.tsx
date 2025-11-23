"use client";

import Desktop from "@/components/Desktop";

export default function Home() {
  return (
    <Desktop>
      <div className="h-full w-full flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h1 className="text-white text-4xl font-bold">Mac OS Portfolio</h1>
          <p className="text-white/80 mt-2">
            Desktop & Wallpaper Setup Complete ✅
          </p>
        </div>
      </div>
    </Desktop>
  );
}
