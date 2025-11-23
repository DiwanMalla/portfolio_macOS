"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useStore from "@/store/useStore";

gsap.registerPlugin(Draggable);

export default function Window({ windowData }) {
  const windowRef = useRef(null);
  const headerRef = useRef(null);
  const draggableRef = useRef(null);

  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    setActiveWindow,
    updateWindowPosition,
    activeWindow,
  } = useStore();

  const isActive = activeWindow === windowData.id;

  useEffect(() => {
    if (!windowRef.current || !headerRef.current) return;

    // Initialize draggable
    draggableRef.current = Draggable.create(windowRef.current, {
      trigger: headerRef.current,
      bounds: "body",
      onDrag: function () {
        updateWindowPosition(windowData.id, {
          x: this.x,
          y: this.y,
        });
      },
      onPress: () => {
        setActiveWindow(windowData.id);
      },
    });

    // Entry animation
    gsap.fromTo(
      windowRef.current,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out",
      }
    );

    return () => {
      if (draggableRef.current) {
        draggableRef.current[0].kill();
      }
    };
  }, [windowData.id, setActiveWindow, updateWindowPosition]);

  const handleClose = () => {
    gsap.to(windowRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => closeWindow(windowData.id),
    });
  };

  const handleMinimize = () => {
    gsap.to(windowRef.current, {
      scale: 0,
      y: window.innerHeight,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => minimizeWindow(windowData.id),
    });
  };

  const handleMaximize = () => {
    maximizeWindow(windowData.id);
  };

  if (windowData.isMinimized) return null;

  const style = {
    left: windowData.position.x,
    top: windowData.position.y,
    width: windowData.isMaximized ? "100vw" : windowData.size.width,
    height: windowData.isMaximized
      ? "calc(100vh - 24px)"
      : windowData.size.height,
    zIndex: windowData.zIndex,
  };

  return (
    <div
      ref={windowRef}
      className={`fixed rounded-lg overflow-hidden shadow-2xl transition-all ${
        isActive ? "ring-2 ring-blue-500" : ""
      }`}
      style={style}
      onClick={() => setActiveWindow(windowData.id)}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-4 cursor-move"
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            aria-label="Close"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            aria-label="Minimize"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            aria-label="Maximize"
          />
        </div>

        {/* Window Title */}
        <div className="flex-1 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
          {windowData.title}
        </div>

        {/* Spacer for centering */}
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-40px)] bg-white dark:bg-gray-900 overflow-auto">
        <div className="p-6 text-gray-800 dark:text-gray-200">
          <h2 className="text-2xl font-bold mb-4">{windowData.title}</h2>
          <p>Content for {windowData.title} window will go here.</p>
        </div>
      </div>
    </div>
  );
}
