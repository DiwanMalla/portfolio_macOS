"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable);

export default function DesktopIcon({ icon, label, onDoubleClick }) {
  const iconRef = useRef(null);

  useGSAP(() => {
    Draggable.create(iconRef.current, {
      type: "x,y",
      bounds: "parent",
      inertia: true,
      onDragStart: function () {
        gsap.to(this.target, { scale: 1.1, duration: 0.2 });
      },
      onDragEnd: function () {
        gsap.to(this.target, { scale: 1, duration: 0.2 });
      },
    });
  }, []);

  return (
    <div
      ref={iconRef}
      className="absolute flex flex-col items-center gap-1 w-24 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer group"
      onDoubleClick={onDoubleClick}
    >
      <div className="relative w-16 h-16 drop-shadow-xl">
        <Image
          src={icon}
          alt={label}
          fill
          className="object-contain"
          draggable={false}
        />
      </div>
      <span className="text-white text-xs font-medium drop-shadow-md px-2 py-0.5 rounded-sm bg-transparent group-hover:bg-blue-600/80 transition-colors text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
