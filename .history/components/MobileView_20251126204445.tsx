"use client";

import React, { useState, useEffect } from "react";
import { useProjects, Project } from "@/contexts/ProjectsContext";
import { windowRegistry, WindowConfig } from "@/constants/apps";
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
const MobileStatusBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-12 bg-black/90 text-white flex items-center justify-between px-6 safe-area-top">
      <div className="text-sm font-semibold">
        {time.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </div>
      <div className="w-32 h-8 bg-black rounded-3xl" />
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z" />
        </svg>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
        </svg>
      </div>
    </div>
  );
};

// App Icon Component
const MobileAppIcon = ({
  app,
  onClick,
}: {
  app: WindowConfig;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-2 active:scale-95 transition-transform"
  >
    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-lg overflow-hidden relative">
      <Image
        src={app.icon}
        alt={app.title}
        fill
        className="object-contain p-2"
      />
    </div>
    <span className="text-xs text-white font-medium drop-shadow-lg truncate max-w-[70px]">
      {app.title}
    </span>
  </button>
);

// Home Indicator Component
const HomeIndicator = () => (
  <div className="h-8 flex items-center justify-center pb-2">
    <div className="w-32 h-1 bg-white/50 rounded-full" />
  </div>
);

// Navigation types
type NavigationState =
  | { type: "home" }
  | { type: "app"; appId: string }
  | { type: "project"; project: Project };

export default function MobileView() {
  const { projects } = useProjects();
  const [navigation, setNavigation] = useState<NavigationState>({
    type: "home",
  });

  // Convert windowRegistry to array
  const apps = Object.values(windowRegistry);

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

  // Render content based on navigation state
  const renderContent = () => {
    if (navigation.type === "home") {
      return (
        <div className="flex-1 flex flex-col">
          <MobileStatusBar />
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-4 gap-4 justify-items-center">
              {apps.map((app) => (
                <MobileAppIcon
                  key={app.id}
                  app={app}
                  onClick={() => handleAppClick(app.id)}
                />
              ))}
            </div>
          </div>
          <HomeIndicator />
        </div>
      );
    }

    if (navigation.type === "project") {
      return (
        <div className="flex-1 flex flex-col bg-gray-900">
          <div className="h-12 bg-gray-800 flex items-center px-4 gap-3">
            <button
              onClick={handleBack}
              className="text-blue-400 flex items-center gap-1"
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
              Back
            </button>
            <span className="text-white font-medium truncate flex-1 text-center pr-10">
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
      <div className="flex-1 flex flex-col bg-gray-900">
        <div className="h-12 bg-gray-800 flex items-center px-4 gap-3">
          <button
            onClick={handleBack}
            className="text-blue-400 flex items-center gap-1"
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
          <span className="text-white font-medium flex-1 text-center pr-10">
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
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project) => (
                <button
                  key={project._id}
                  onClick={() => handleSelectProject(project)}
                  className="bg-gray-800 rounded-xl p-3 text-left active:bg-gray-700 transition-colors"
                >
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-gray-700 relative">
                    {project.images && project.images[0] && (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-white font-medium text-sm truncate">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                    {project.description
                      ?.replace(/\*\*/g, "")
                      .substring(0, 100)}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags?.slice(0, 3).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full"
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
