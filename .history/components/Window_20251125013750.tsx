"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useStore, { WindowData } from "@/store/useStore";
import { X, Minus, Maximize2 } from "lucide-react";

// Window components
import Terminal from "./windows/Terminal";
import Safari from "./windows/Safari";
import Photos from "./windows/Photos";
import Figma from "./windows/Figma";
import Finder from "./windows/Finder";
import Resume from "./windows/Resume";
import Contact from "./windows/Contact";
import ProjectDetail from "./windows/ProjectDetail";

gsap.registerPlugin(Draggable);

const windowComponents: Record<string, React.ComponentType<any>> = {
  terminal: Terminal,
  safari: Safari,
  photos: Photos,
  figma: Figma,
  finder: Finder,
  resume: Resume,
  contact: Contact,
  projectDetail: ProjectDetail,
};

interface WindowProps {
  windowData: WindowData;
}

export default function Window({ windowData }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[] | null>(null);

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

    const ctx = gsap.context(() => {
      // Initialize draggable
      try {
        draggableRef.current = Draggable.create(windowRef.current, {
          trigger: headerRef.current,
          bounds: "body",
          // inertia: true, // Requires InertiaPlugin
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
      } catch (error) {
        console.warn("Failed to create Draggable:", error);
      }

      // Entry animation
      gsap.fromTo(
        windowRef.current,
        {
          scale: 0.95,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }, windowRef);

    return () => {
      ctx.revert();
      // Draggable is killed by ctx.revert() automatically if created inside context?
      // Actually Draggable needs manual kill usually, but let's check.
      // To be safe, we kill it manually if it exists.
      if (draggableRef.current && draggableRef.current[0]) {
        draggableRef.current[0].kill();
      }
    };
  }, [windowData.id, setActiveWindow, updateWindowPosition]);

  const handleClose = () => {
    gsap.to(windowRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => closeWindow(windowData.id),
    });
  };

  const handleMinimize = () => {
    gsap.to(windowRef.current, {
      scale: 0.7,
      opacity: 0,
      y: window.innerHeight / 2,
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => minimizeWindow(windowData.id),
    });
  };

  const handleMaximize = () => {
    maximizeWindow(windowData.id);
  };

  if (windowData.isMinimized) return null;

  const style: React.CSSProperties = {
    left: windowData.position?.x,
    top: windowData.position?.y,
    width: windowData.isMaximized ? "100vw" : windowData.size?.width,
    height: windowData.isMaximized
      ? "calc(100vh - 24px)"
      : windowData.size?.height,
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
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
            aria-label="Close"
          >
            <X
              size={8}
              className="text-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
            aria-label="Minimize"
          >
            <Minus
              size={8}
              className="text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
            aria-label="Maximize"
          >
            <Maximize2
              size={8}
              className="text-green-900 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>

        {/* Window Title */}
        <div className="flex-1 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
          {windowData.title}
        </div>

        {/* Spacer for centering */}
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-40px)] overflow-hidden">
        {windowComponents[windowData.component] ? (
          (() => {
            const WindowComponent = windowComponents[windowData.component];
            return <WindowComponent {...windowData} />;
          })()
        ) : (
          <div className="h-full bg-white dark:bg-gray-900 overflow-auto">
            <div className="p-6 text-gray-800 dark:text-gray-200">
              <h2 className="text-2xl font-bold mb-4">{windowData.title}</h2>
              <p>Content for {windowData.title} window will go here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
