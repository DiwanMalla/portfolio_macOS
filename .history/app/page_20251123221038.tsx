"use client";

import Desktop from "@/components/Desktop";
import MenuBar from "@/components/MenuBar";

export default function Home() {
  return (
    <Desktop>
      <MenuBar />
      <div className="h-full w-full flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h1 className="text-white text-4xl font-bold">Mac OS Portfolio</h1>
          <p className="text-white/80 mt-2">Menu Bar Complete ✅</p>
        </div>
      </div>
    </Desktop>
  );
}
