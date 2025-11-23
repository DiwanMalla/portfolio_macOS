"use client";

import Desktop from "@/components/Desktop";
import MenuBar from "@/components/MenuBar";
import Dock from "@/components/Dock";
import WindowManager from "@/components/WindowManager";
import IntroText from "@/components/IntroText";
import DesktopGrid from "@/components/DesktopGrid";

export default function Home() {
  return (
    <Desktop>
      <IntroText />
      <DesktopGrid />
      <MenuBar />
      <WindowManager />
      <Dock />
    </Desktop>
  );
}
