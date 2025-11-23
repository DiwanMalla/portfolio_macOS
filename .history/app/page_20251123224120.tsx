"use client";

import Desktop from "@/components/Desktop";
import MenuBar from "@/components/MenuBar";
import Dock from "@/components/Dock";
import WindowManager from "@/components/WindowManager";
import IntroText from "@/components/IntroText";

export default function Home() {
  return (
    <Desktop>
      <IntroText />
      <MenuBar />
      <WindowManager />
      <Dock />
    </Desktop>
  );
}
