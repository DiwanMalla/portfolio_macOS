"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Command,
  ArrowRight,
  AppWindow,
  Folder,
  Calculator,
  Moon,
  Sun,
  Monitor,
  Power,
  RefreshCw,
} from "lucide-react";
import useStore from "@/store/useStore";
import { windowRegistry } from "@/constants/apps";
import { featuredProjects } from "@/constants/projects";
import Image from "next/image";

interface SearchResult {
  id: string;
  title: string;
  type: "app" | "project" | "command" | "math";
  icon?: string;
  description?: string;
  action: () => void;
  preview?: string;
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

    // Math Calculations
    try {
      // Basic math regex
      if (/^[\d\s\+\-\*\/\(\)\.]+$/.test(query)) {
        // eslint-disable-next-line no-eval
        const result = eval(query);
        if (!isNaN(result) && isFinite(result)) {
          results.push({
            id: "math-result",
            title: result.toString(),
            type: "math",
            description: "Calculation Result",
            action: () => {
              navigator.clipboard.writeText(result.toString());
              toggleSpotlight();
            },
            preview: query,
          });
        }
      }
    } catch (e) {
      // Ignore invalid math
    }

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
            if (project.link) {
              window.open(project.link, "_blank");
            }
            toggleSpotlight();
          },
        });
      }
    });

    // System Commands
    const commands = [
      {
        id: "toggle-dark",
        title: "Toggle Dark Mode",
        keywords: ["dark", "light", "mode", "theme"],
        action: () => document.documentElement.classList.toggle("dark"),
        icon: <Moon className="w-5 h-5" />,
      },
      {
        id: "reload",
        title: "Reload Window",
        keywords: ["reload", "refresh", "restart"],
        action: () => window.location.reload(),
        icon: <RefreshCw className="w-5 h-5" />,
      },
      {
        id: "sleep",
        title: "Sleep",
        keywords: ["sleep", "lock"],
        action: () => {
          /* Add sleep logic */
        },
        icon: <Power className="w-5 h-5" />,
      },
    ];

    commands.forEach((cmd) => {
      if (
        cmd.title.toLowerCase().includes(lowerQuery) ||
        cmd.keywords.some((k) => k.includes(lowerQuery))
      ) {
        results.push({
          id: cmd.id,
          title: cmd.title,
          type: "command",
          description: "System Command",
          action: () => {
            cmd.action();
            toggleSpotlight();
          },
        });
      }
    });
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
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4 bg-black/40 backdrop-blur-md transition-all duration-200"
      onClick={() => toggleSpotlight()}
    >
      <div
        className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center px-5 py-5 border-b border-gray-200/50 dark:border-gray-700/50 gap-4">
          <div className="w-10 h-10 relative flex items-center justify-center shrink-0">
            <Image
              src="/icons/3d/search.png"
              alt="Search"
              width={48}
              height={48}
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent border-none outline-none text-2xl text-gray-900 dark:text-white placeholder-gray-400 font-light"
          />
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-100/50 dark:bg-gray-800/50 px-2.5 py-1 rounded-md border border-gray-200/50 dark:border-gray-700/50">
            <Command className="w-3.5 h-3.5" />
            <span>K</span>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto py-2 scrollbar-hide">
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={result.action}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full px-4 py-3 flex items-center gap-4 transition-all duration-150 ${
                  index === selectedIndex
                    ? "bg-blue-500/10 dark:bg-blue-500/20"
                    : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center transition-transform duration-200 ${
                    index === selectedIndex ? "scale-110" : ""
                  }`}
                >
                  {result.icon ? (
                    <Image
                      src={result.icon}
                      alt={result.title}
                      width={40}
                      height={40}
                      className={`object-contain drop-shadow-md ${
                        result.icon?.includes("/icons/3d/")
                          ? "mix-blend-screen"
                          : ""
                      }`}
                    />
                  ) : result.type === "project" ? (
                    <Image
                      src="/icons/3d/projects.png"
                      alt="Project"
                      width={32}
                      height={32}
                      className="object-contain drop-shadow-md mix-blend-screen"
                    />
                  ) : result.type === "math" ? (
                    <Calculator className="w-8 h-8 text-orange-500 drop-shadow-sm" />
                  ) : result.type === "command" ? (
                    <div className="text-gray-600 dark:text-gray-300 drop-shadow-sm">
                      {result.id === "toggle-dark" ? (
                        <Moon className="w-8 h-8" />
                      ) : (
                        <Monitor className="w-8 h-8" />
                      )}
                    </div>
                  ) : (
                    <AppWindow className="w-8 h-8 text-gray-500" />
                  )}
                </div>

                <div className="flex-1 text-left">
                  <h3
                    className={`font-medium text-base ${
                      index === selectedIndex
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {result.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {result.description}
                    </span>
                    {result.preview && (
                      <span className="text-xs text-gray-400 border-l border-gray-300 pl-2">
                        {result.preview}
                      </span>
                    )}
                  </div>
                </div>

                {index === selectedIndex && (
                  <div className="flex items-center gap-2 text-xs text-blue-500 font-medium animate-in fade-in slide-in-from-left-2">
                    <span>Open</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {query && results.length === 0 && (
          <div className="py-16 text-center text-gray-500 dark:text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm opacity-60">
              Try searching for apps, projects, or commands
            </p>
          </div>
        )}

        {/* Initial State */}
        {!query && (
          <div className="py-12 px-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Suggested
            </p>
            <div className="grid grid-cols-4 gap-4">
              {Object.values(windowRegistry)
                .slice(0, 4)
                .map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      openWindow(app);
                      toggleSpotlight();
                    }}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className="w-12 h-12 relative group-hover:scale-110 transition-transform duration-200">
                      <Image
                        src={app.icon}
                        alt={app.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {app.title}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200/50 dark:border-gray-700/50 px-4 py-2 flex items-center justify-between text-[10px] text-gray-400">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                ↩
              </kbd>{" "}
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                ↑↓
              </kbd>{" "}
              to navigate
            </span>
          </div>
          <span>Diwan AI Spotlight</span>
        </div>
      </div>
    </div>
  );
}
