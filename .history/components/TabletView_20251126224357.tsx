"use client";

import React, { useState, useEffect } from "react";
import { useProjects, Project } from "@/contexts/ProjectsContext";
import { windowRegistry, WindowConfig } from "@/constants/apps";
import { heroContent, profile } from "@/constants/profile";
import AboutMe from "./windows/AboutMe";
import Blog from "./windows/Blog";
import Contact from "./windows/Contact";
import Resume from "./windows/Resume";
import Safari from "./windows/Safari";
import Terminal from "./windows/Terminal";
import Trash from "./windows/Trash";
import Photos from "./windows/Photos";
import Image from "next/image";

// Status Bar Component
const TabletStatusBar = ({ light = false }: { light?: boolean }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`h-7 ${
        light ? "bg-transparent" : "bg-white/70 dark:bg-black/50"
      } backdrop-blur-xl text-gray-900 dark:text-white flex items-center justify-between px-4 text-xs`}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">
          {time.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span>
          {time.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z" />
        </svg>
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-3 bg-white/40 rounded-sm" />
          <div className="w-1.5 h-4 bg-white/60 rounded-sm" />
          <div className="w-1.5 h-5 bg-white/80 rounded-sm" />
          <div className="w-1.5 h-6 bg-white rounded-sm" />
        </div>
        <div className="flex items-center">
          <div className="w-6 h-3 border border-white rounded-sm flex items-center justify-end pr-0.5">
            <div className="w-4 h-2 bg-green-400 rounded-xs" />
          </div>
          <div className="w-0.5 h-1.5 bg-white rounded-r-sm ml-0.5" />
        </div>
      </div>
    </div>
  );
};

// Tablet Intro Screen Component
const TabletIntroScreen = ({ onUnlock }: { onUnlock: () => void }) => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const title = heroContent.title;
    let currentIndex = 0;

    const typeWriter = () => {
      if (currentIndex < title.length) {
        setDisplayedTitle(title.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, 80 + Math.random() * 40);
      } else {
        const cursorInterval = setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
      }
    };

    setTimeout(typeWriter, 800);
  }, []);

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-12 cursor-pointer"
      onClick={onUnlock}
    >
      {/* Ambient glow */}
      <div className="absolute w-[500px] h-[300px] bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-[100px] animate-pulse" />

      {/* Name with theme-aware background */}
      <div className="px-8 py-6 rounded-3xl bg-white/10 dark:bg-black/30 backdrop-blur-xl mb-6">
        <h1
          className="text-7xl md:text-8xl font-bold text-gray-900 dark:text-white tracking-tight text-center relative z-10"
          style={{
            textShadow:
              "0 0 60px rgba(59, 130, 246, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          {heroContent.headline}
        </h1>
      </div>

      {/* Decorative line */}
      <div className="w-32 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent rounded-full mb-6" />

      {/* Title with typewriter effect - theme aware */}
      <div className="px-6 py-3 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-md">
        <p className="text-xl md:text-2xl text-gray-800 dark:text-white/90 font-medium uppercase tracking-[0.25em] text-center flex items-center">
          <span>{displayedTitle}</span>
          <span
            className={`ml-1 inline-block w-0.5 h-6 bg-blue-500 dark:bg-blue-400 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.1s" }}
          />
        </p>
      </div>

      {/* Location & Availability - theme aware */}
      <div className="flex items-center gap-6 mt-6 px-4 py-2 rounded-xl bg-white/10 dark:bg-black/30 backdrop-blur-sm">
        <p className="flex items-center gap-2 text-gray-700 dark:text-white/60">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {profile.location}
        </p>
        <span className="w-1 h-1 bg-gray-500 dark:bg-white/40 rounded-full" />
        <p className="text-green-600 dark:text-green-400">
          {profile.availability}
        </p>
      </div>

      {/* Tap indicator - theme aware */}
      <div className="absolute bottom-20 flex flex-col items-center gap-3 animate-bounce">
        <p className="text-gray-600 dark:text-white/50 text-sm uppercase tracking-wider px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm">
          Tap anywhere to explore
        </p>
        <svg
          className="w-8 h-8 text-gray-600 dark:text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </div>
  );
};

// Dock Component
const TabletDock = ({
  apps,
  onAppClick,
}: {
  apps: WindowConfig[];
  onAppClick: (appId: string) => void;
}) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
    <div className="flex items-center gap-3 px-4 py-2 bg-gray-200/70 dark:bg-white/20 backdrop-blur-2xl rounded-2xl border border-gray-300/50 dark:border-white/30">
      {apps.slice(0, 8).map((app) => (
        <button
          key={app.id}
          onClick={() => onAppClick(app.id)}
          className="group relative"
        >
          <div className="w-14 h-14 rounded-xl bg-white/30 dark:bg-white/10 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-active:scale-95 overflow-hidden relative">
            <Image
              src={app.icon}
              alt={app.title}
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {app.title}
          </span>
        </button>
      ))}
    </div>
  </div>
);

// Home Indicator Component
const HomeIndicator = () => (
  <div className="h-6 flex items-center justify-center">
    <div className="w-32 h-1 bg-gray-800/50 dark:bg-white/50 rounded-full" />
  </div>
);

// Navigation types
type NavigationState =
  | { type: "intro" }
  | { type: "home" }
  | { type: "app"; appId: string }
  | { type: "project"; project: Project };

export default function TabletView() {
  const { projects } = useProjects();
  const [navigation, setNavigation] = useState<NavigationState>({
    type: "intro",
  });

  // Convert windowRegistry to array
  const apps = Object.values(windowRegistry);

  const handleUnlock = () => {
    setNavigation({ type: "home" });
  };

  const handleAppClick = (appId: string) => {
    setNavigation({ type: "app", appId });
  };

  const handleBack = () => {
    if (navigation.type === "project") {
      setNavigation({ type: "app", appId: "finder" });
    } else {
      setNavigation({ type: "home" });
    }
  };

  const handleSelectProject = (project: Project) => {
    setNavigation({ type: "project", project });
  };

  const renderContent = () => {
    if (navigation.type === "intro") {
      return (
        <div className="flex-1 flex flex-col">
          <TabletStatusBar light />
          <TabletIntroScreen onUnlock={handleUnlock} />
          <HomeIndicator />
        </div>
      );
    }

    if (navigation.type === "home") {
      return (
        <div className="flex-1 flex flex-col">
          <TabletStatusBar />
          <div className="flex-1 overflow-auto p-8">
            <div className="grid grid-cols-6 gap-6 justify-items-center max-w-4xl mx-auto">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  className="flex flex-col items-center gap-2 p-3 active:scale-95 transition-transform"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/20 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-lg overflow-hidden relative">
                    <Image
                      src={app.icon}
                      alt={app.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <span className="text-sm font-medium px-2 py-0.5 rounded bg-white/60 dark:bg-black/40 text-gray-900 dark:text-white backdrop-blur-sm">
                    {app.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <TabletDock apps={apps} onAppClick={handleAppClick} />
          <HomeIndicator />
        </div>
      );
    }

    if (navigation.type === "project") {
      return (
        <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 flex items-center px-6 gap-4">
            <button
              onClick={handleBack}
              className="text-blue-500 dark:text-blue-400 flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Projects
            </button>
            <span className="text-gray-900 dark:text-white font-medium flex-1 text-center pr-20">
              {navigation.project.title}
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <Safari project={navigation.project} />
          </div>
          <HomeIndicator />
        </div>
      );
    }

    // App view
    const appId = navigation.appId;
    const currentApp = apps.find((a) => a.id === appId);
    return (
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
        <div className="h-12 bg-gray-200 dark:bg-gray-800 flex items-center px-6 gap-4">
          <button
            onClick={handleBack}
            className="text-blue-500 dark:text-blue-400 flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Home
          </button>
          <span className="text-gray-900 dark:text-white font-medium flex-1 text-center pr-14">
            {currentApp?.title || "App"}
          </span>
        </div>
        <div className="flex-1 overflow-auto">{renderAppContent(appId)}</div>
        <HomeIndicator />
      </div>
    );
  };

  const renderAppContent = (appId: string) => {
    switch (appId) {
      case "finder":
        return (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {projects.map((project) => (
                <button
                  key={project._id}
                  onClick={() => handleSelectProject(project)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 transition-colors shadow-sm"
                >
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700 relative">
                    {project.images && project.images[0] && (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-medium text-base">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                    {project.description
                      ?.replace(/\*\*/g, "")
                      .substring(0, 150)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags?.slice(0, 4).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case "aboutme":
        return <AboutMe />;
      case "blog":
        return <Blog />;
      case "contact":
        return <Contact />;
      case "resume":
        return <Resume />;
      case "safari":
        return <Safari />;
      case "terminal":
        return <Terminal />;
      case "trash":
        return <Trash />;
      case "photos":
        return <Photos />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>App not found</p>
          </div>
        );
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url('/wallpapers/default.jpg')` }}
    >
      {renderContent()}
    </div>
  );
}
