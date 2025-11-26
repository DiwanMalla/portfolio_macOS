"use client";

import React, { useState, useEffect } from "react";
import { useProjects } from "@/contexts/ProjectsContext";
import { apps as defaultApps } from "@/constants/apps";
import AboutMe from "./windows/AboutMe";
import Blog from "./windows/Blog";
import Contact from "./windows/Contact";
import Resume from "./windows/Resume";
import Safari from "./windows/Safari";
import Terminal from "./windows/Terminal";
import Trash from "./windows/Trash";
import Photos from "./windows/Photos";
import { Project } from "@/constants/projects";

// Status Bar Component
const TabletStatusBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-7 bg-black/50 backdrop-blur-xl text-white flex items-center justify-between px-4 text-xs">
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

// Dock Component
const TabletDock = ({
  apps,
  onAppClick,
}: {
  apps: { id: string; title: string; icon: string }[];
  onAppClick: (appId: string) => void;
}) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
    <div className="flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30">
      {apps.slice(0, 8).map((app) => (
        <button
          key={app.id}
          onClick={() => onAppClick(app.id)}
          className="group relative"
        >
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-active:scale-95 overflow-hidden">
            <img src={app.icon} alt={app.title} className="w-10 h-10 object-contain" />
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {app.title.replace(".app", "").replace(".txt", "").replace(".pdf", "")}
          </span>
        </button>
      ))}
    </div>
  </div>
);

// Home Indicator Component
const HomeIndicator = () => (
  <div className="h-6 flex items-center justify-center">
    <div className="w-32 h-1 bg-white/50 rounded-full" />
  </div>
);

// Navigation types
type NavigationState =
  | { type: "home" }
  | { type: "app"; appId: string }
  | { type: "project"; project: Project };

export default function TabletView() {
  const { projects } = useProjects();
  const [navigation, setNavigation] = useState<NavigationState>({ type: "home" });

  const apps = defaultApps.map((app) => {
    if (app.id === "finder") {
      return { ...app, title: "Projects", icon: "/icons/projects.png" };
    }
    return app;
  });

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
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-lg overflow-hidden">
                    <img src={app.icon} alt={app.title} className="w-14 h-14 object-contain" />
                  </div>
                  <span className="text-sm text-white font-medium drop-shadow-lg">
                    {app.title.replace(".app", "").replace(".txt", "").replace(".pdf", "")}
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
        <div className="flex-1 flex flex-col bg-gray-900">
          <div className="h-12 bg-gray-800 flex items-center px-6 gap-4">
            <button
              onClick={handleBack}
              className="text-blue-400 flex items-center gap-1 hover:text-blue-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Projects
            </button>
            <span className="text-white font-medium flex-1 text-center pr-20">
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
    return (
      <div className="flex-1 flex flex-col bg-gray-900">
        <div className="h-12 bg-gray-800 flex items-center px-6 gap-4">
          <button
            onClick={handleBack}
            className="text-blue-400 flex items-center gap-1 hover:text-blue-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </button>
          <span className="text-white font-medium flex-1 text-center pr-14">
            {apps.find((a) => a.id === appId)?.title.replace(".app", "").replace(".txt", "").replace(".pdf", "")}
          </span>
        </div>
        <div className="flex-1 overflow-auto">
          {renderAppContent(appId)}
        </div>
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
                  key={project.id}
                  onClick={() => handleSelectProject(project)}
                  className="bg-gray-800 rounded-xl p-4 text-left hover:bg-gray-700 active:bg-gray-600 transition-colors"
                >
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-700">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-white font-medium text-base">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full"
                      >
                        {tech}
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
