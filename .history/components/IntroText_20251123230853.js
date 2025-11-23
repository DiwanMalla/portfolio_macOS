"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { heroContent } from "@/constants/profile";

export default function IntroText() {
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Split text animation simulation (simple version without SplitText plugin)
    tl.fromTo(
      nameRef.current,
      { y: 100, opacity: 0, skewY: 10 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.5, delay: 0.5 }
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1, ease: "expo.out" },
        "-=1"
      )
      .fromTo(
        titleRef.current,
        { y: 20, opacity: 0, letterSpacing: "0em" },
        { y: 0, opacity: 1, letterSpacing: "0.2em", duration: 1.5 },
        "-=0.8"
      );
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none">
      <div className="overflow-hidden">
        <h1
          ref={nameRef}
          className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-white/60 tracking-tighter drop-shadow-2xl pb-4"
        >
          {heroContent.headline}
        </h1>
      </div>

      <div
        ref={lineRef}
        className="w-32 h-1 bg-blue-500/80 rounded-full mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      />

      <div className="overflow-hidden">
        <p
          ref={titleRef}
          className="text-xl md:text-2xl text-white/90 font-medium uppercase tracking-widest drop-shadow-lg"
        >
          {heroContent.title}
        </p>
      </div>
    </div>
  );
}
