"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { heroContent } from "@/constants/profile";

export default function IntroText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Clean entrance animation for the name
    tl.fromTo(
      nameRef.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        delay: 0.3,
        ease: "power3.out",
      }
    );

    // Subtle glow pulse on the name
    gsap.to(nameRef.current, {
      textShadow:
        "0 0 80px rgba(59, 130, 246, 0.6), 0 4px 20px rgba(0, 0, 0, 0.3)",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });

    // Line animation
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1, ease: "expo.out" },
      "-=0.8"
    ).to(lineRef.current, {
      boxShadow: "0 0 25px rgba(59, 130, 246, 0.7)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Typewriter effect for title
    const title = heroContent.title;
    let currentIndex = 0;

    const typeWriter = () => {
      if (currentIndex < title.length) {
        setDisplayedTitle(title.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, 80 + Math.random() * 40);
      } else {
        setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 530);
      }
    };

    setTimeout(typeWriter, 1600);

    // Subtle floating particles
    if (containerRef.current) {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 rounded-full bg-blue-400/40";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        containerRef.current.appendChild(particle);

        gsap.to(particle, {
          x: "random(-80, 80)",
          y: "random(-80, 80)",
          opacity: "random(0.1, 0.5)",
          duration: "random(4, 7)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
    >
      {/* Ambient glow behind name */}
      <div className="absolute w-[500px] h-[150px] bg-blue-500/15 rounded-full blur-[80px] animate-pulse" />

      <div className="overflow-hidden">
        <h1
          ref={nameRef}
          className="text-7xl md:text-9xl font-bold text-white tracking-tight drop-shadow-2xl pb-4"
          style={{
            textShadow:
              "0 0 40px rgba(59, 130, 246, 0.4), 0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          {heroContent.headline}
        </h1>
      </div>

      <div
        ref={lineRef}
        className="w-40 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent rounded-full mb-6"
      />

      <div className="overflow-hidden h-10">
        <p
          ref={titleRef}
          className="text-xl md:text-2xl text-white/90 font-medium uppercase tracking-[0.25em] drop-shadow-lg flex items-center justify-center"
        >
          <span className="text-white">{displayedTitle}</span>
          <span
            ref={cursorRef}
            className={`ml-1 inline-block w-[3px] h-6 bg-blue-400 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.1s" }}
          />
        </p>
      </div>

      {/* Decorative code brackets - more subtle */}
      <div className="absolute left-[8%] top-1/2 -translate-y-1/2 text-blue-500/10 text-8xl font-extralight">
        {"<"}
      </div>
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 text-blue-500/10 text-8xl font-extralight">
        {"/>"}
      </div>
    </div>
  );
}
