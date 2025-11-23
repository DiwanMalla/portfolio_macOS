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
    </Desktop>
  );
}
