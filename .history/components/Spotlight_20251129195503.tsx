"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Command, ArrowRight, AppWindow, Folder } from "lucide-react";
import useStore from "@/store/useStore";
import { windowRegistry } from "@/constants/apps";
import { featuredProjects } from "@/constants/projects";
import Image from "next/image";

interface SearchResult {
  id: string;
  title: string;
  type: "app" | "project" | "command";
  icon?: string;
  description?: string;
  action: () => void;
}

export default function Spotlight() {
  const { isSpotlightOpen, toggleSpotlight, openWindow } = useStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isSpotlightOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
        setSelectedIndex(0);
      }, 50);
    }
  }, [isSpotlightOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSpotlight();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === " ") {
        e.preventDefault();
        toggleSpotlight();
      }
      if (e.key === "Escape" && isSpotlightOpen) {
        toggleSpotlight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpotlightOpen, toggleSpotlight]);

  // Generate results
  const results: SearchResult[] = [];

  if (query.trim()) {
    const lowerQuery = query.toLowerCase();

    // Apps
    Object.values(windowRegistry).forEach((app) => {
      if (
        app.title.toLowerCase().includes(lowerQuery) ||
        app.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          id: app.id,
          title: app.title,
          type: "app",
          icon: app.icon,
          description: "Application",
          action: () => {
            openWindow(app);
            toggleSpotlight();
          },
        });
      }
    });

    // Projects
    featuredProjects.forEach((project) => {
      if (
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          id: project.id,
          title: project.title,
          type: "project",
          description: "Project",
          action: () => {
            // Open Finder with project details or Safari with link
            // For now, let's open Safari with the project link
            // Or better, open the project detail window if we had one
            // We'll open Finder for now as a fallback or Safari
            if (project.link) {
              window.open(project.link, "_blank");
            }
            toggleSpotlight();
          },
        });
      }
    });

    // Commands (Easter eggs)
    if ("toggle dark mode".includes(lowerQuery)) {
      results.push({
        id: "dark-mode",
        title: "Toggle Dark Mode",
        type: "command",
        description: "System Command",
        action: () => {
          document.documentElement.classList.toggle("dark");
          toggleSpotlight();
        },
      });
    }
  }

  // Handle navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        results[selectedIndex].action();
      }
    }
  };

  if (!isSpotlightOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4 bg-black/20 backdrop-blur-sm transition-all duration-200"
      onClick={() => toggleSpotlight()}
    >
      <div
        className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center px-4 py-4 border-b border-gray-200/50 dark:border-gray-700/50 gap-3">
          <div className="w-6 h-6 relative flex items-center justify-center">
             {/* 3D Icon Placeholder - Replace with your 3D asset in public/icons/3d/search.png */}
             <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg opacity-20 blur-sm animate-pulse" />
             <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 relative z-10" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent border-none outline-none text-xl text-gray-900 dark:text-white placeholder-gray-400 font-light"
          />
          <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={result.action}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full px-4 py-3 flex items-center gap-4 transition-colors ${
                  index === selectedIndex
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm shadow-sm">
                  {result.icon ? (
                    <Image
                      src={result.icon}
                      alt={result.title}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  ) : result.type === "project" ? (
                    <Folder className="w-6 h-6" />
                  ) : (
                    <AppWindow className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-base">{result.title}</h3>
                  <p
                    className={`text-xs ${
                      index === selectedIndex
                        ? "text-blue-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {result.description}
                  </p>
                </div>
                {index === selectedIndex && (
                  <ArrowRight className="w-5 h-5 text-white/80" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {query && results.length === 0 && (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            <p>No results found for "{query}"</p>
          </div>
        )}
        
        {/* Initial State */}
        {!query && (
             <div className="py-8 px-6 text-center text-gray-400 dark:text-gray-500 text-sm">
                 <p>Type to search apps, projects, and commands...</p>
             </div>
        )}
      </div>
    </div>
  );
}
