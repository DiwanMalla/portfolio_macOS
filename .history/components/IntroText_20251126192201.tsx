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

    // Animate each character of the name
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".char");

      tl.fromTo(
        chars,
        {
          y: 120,
          opacity: 0,
          rotateX: -90,
          scale: 0.5,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );

      // Add floating animation to each character
      chars.forEach((char, i) => {
        gsap.to(char, {
          y: "random(-8, 8)",
          duration: "random(2, 3)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      });

      // Add glow pulse animation
      gsap.to(chars, {
        textShadow:
          "0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1,
      });
    }

    // Line animation
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1, ease: "expo.out" },
      "-=0.5"
    ).to(lineRef.current, {
      boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)",
      duration: 1.5,
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
        setTimeout(typeWriter, 100 + Math.random() * 50);
      } else {
        // After typing is complete, start blinking cursor
        setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 530);
      }
    };

    // Start typewriter after name animation
    setTimeout(typeWriter, 1800);

    // Particles effect
    if (containerRef.current) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 rounded-full bg-blue-400/60";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        containerRef.current.appendChild(particle);

        gsap.to(particle, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          opacity: "random(0.2, 0.8)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }
  }, []);

  // Split name into characters
  const nameChars = heroContent.headline.split("").map((char, i) => (
    <span
      key={i}
      className={`char inline-block ${char === " " ? "w-6 md:w-10" : ""} text-white`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        opacity: 0,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
    >
      {/* Ambient glow behind name */}
      <div className="absolute w-[600px] h-[200px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />

      <div className="overflow-hidden perspective-[1000px]">
        <h1
          ref={nameRef}
          className="text-7xl md:text-9xl font-bold tracking-tighter drop-shadow-2xl pb-4"
          style={{
            textShadow: "0 0 60px rgba(59, 130, 246, 0.3)",
          }}
        >
          {nameChars}
        </h1>
      </div>

      <div
        ref={lineRef}
        className="w-32 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent rounded-full mb-6"
      />

      <div className="overflow-hidden h-10">
        <p
          ref={titleRef}
          className="text-xl md:text-2xl text-white/90 font-medium uppercase tracking-[0.3em] drop-shadow-lg flex items-center justify-center"
        >
          <span className="bg-linear-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent">
            {displayedTitle}
          </span>
          <span
            ref={cursorRef}
            className={`ml-1 inline-block w-[3px] h-6 bg-blue-400 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.1s" }}
          />
        </p>
      </div>

      {/* Decorative code brackets */}
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 text-blue-500/20 text-9xl font-light animate-pulse">
        {"<"}
      </div>
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 text-blue-500/20 text-9xl font-light animate-pulse">
        {"/>"}
      </div>
    </div>
  );
}
