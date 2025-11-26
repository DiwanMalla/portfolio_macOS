"use client";

import { useState } from "react";
import Image from "next/image";
import { desktopShortcuts, windowRegistry, dockApps } from "@/constants/apps";
import { heroContent } from "@/constants/profile";
import { wallpaperMap, defaultWallpaperId } from "@/constants/wallpapers";
import useStore from "@/store/useStore";
import { useProjects, Project } from "@/contexts/ProjectsContext";
import {
  Home,
  FolderOpen,
  ChevronLeft,
  Loader2,
  ExternalLink,
  Folder,
  LayoutGrid,
  Smartphone,
  Database,
  Globe,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Import window components
import Terminal from "./windows/Terminal";
import Photos from "./windows/Photos";
import Blog from "./windows/Blog";
import Resume from "./windows/Resume";
import Contact from "./windows/Contact";
import Trash from "./windows/Trash";
import AboutMe from "./windows/AboutMe";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const windowComponents: Record<string, React.ComponentType<any>> = {
  terminal: Terminal,
  photos: Photos,
  blog: Blog,
  resume: Resume,
  contact: Contact,
  trash: Trash,
  aboutme: AboutMe,
};

interface AppItem {
  id: string;
  label: string;
  icon: string;
  component: string;
}

// Mobile-optimized Finder component
function MobileFinder({
  onOpenProject,
}: {
  onOpenProject: (project: Project) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { projects, loading } = useProjects();

  const categories = [
    { id: "all", label: "All", icon: LayoutGrid },
    { id: "Web Development", label: "Web", icon: Globe },
    { id: "Mobile App Development", label: "Mobile", icon: Smartphone },
    { id: "Database Management", label: "Database", icon: Database },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.projectCategory.includes(activeCategory));

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 scrollbar-hide">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Icon size={14} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 size={24} className="animate-spin text-blue-500" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            <p>No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProjects.map((project) => (
              <button
                key={project._id}
                onClick={() => onOpenProject(project)}
                className="flex flex-col bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 active:scale-95 transition-transform text-left"
              >
                <div className="relative aspect-video w-full">
                  {project.images && project.images[0] ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Folder size={32} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-800 dark:text-white line-clamp-2">
                    {project.title}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {project.tags[0]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Mobile-optimized Project Detail component
function MobileProjectDetail({ project }: { project: Project }) {
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900">
      {/* Hero Image */}
      {project.images && project.images[0] && (
        <div className="relative w-full aspect-video">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          {project.client && <span>Client: {project.client}</span>}
          {project.createdAt && (
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          )}
        </div>

        {/* Description */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.description}
          </ReactMarkdown>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 1 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Gallery
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {project.images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${project.title} ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {project.livePreview && (
          <a
            href={project.livePreview}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-6 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl active:scale-95 transition-transform"
          >
            <ExternalLink size={18} />
            View Live Project
          </a>
        )}
      </div>
    </div>
  );
}

// Navigation state type
type NavigationState =
  | { type: "home" }
  | { type: "app"; appId: string; appComponent: string; title: string }
  | { type: "project"; project: Project };

export default function MobileView() {
  const [navigation, setNavigation] = useState<NavigationState>({
    type: "home",
  });
  const [activeTab, setActiveTab] = useState<"home" | "apps">("home");
  const [navigationHistory, setNavigationHistory] = useState<NavigationState[]>(
    []
  );
  const wallpaper = useStore((state) => state.wallpaper);
  const wallpaperUrl =
    wallpaperMap[wallpaper]?.src || wallpaperMap[defaultWallpaperId].src;

  // Combine desktop shortcuts and dock apps for mobile grid
  const allApps: AppItem[] = [
    ...desktopShortcuts.map((s) => ({
      id: s.target,
      label: s.label,
      icon: s.icon,
      component: windowRegistry[s.target]?.component || s.target,
    })),
    ...dockApps
      .filter((app) => !desktopShortcuts.some((s) => s.target === app.id))
      .map((app) => ({
        id: app.id,
        label: app.name,
        icon: app.icon,
        component: windowRegistry[app.id]?.component || app.id,
      })),
  ];

  const handleOpenApp = (app: AppItem) => {
    setNavigationHistory((prev) => [...prev, navigation]);
    setNavigation({
      type: "app",
      appId: app.id,
      appComponent: app.component,
      title: windowRegistry[app.id]?.title || app.label,
    });
  };

  const handleOpenProject = (project: Project) => {
    setNavigationHistory((prev) => [...prev, navigation]);
    setNavigation({ type: "project", project });
  };

  const handleBack = () => {
    if (navigationHistory.length > 0) {
      const prev = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((h) => h.slice(0, -1));
      setNavigation(prev);
    } else {
      setNavigation({ type: "home" });
    }
  };

  // Status bar component
  const StatusBar = ({ dark = false }: { dark?: boolean }) => (
    <div
      className={`h-11 flex items-center justify-between px-6 text-sm ${
        dark ? "bg-black text-white" : "bg-black/50 backdrop-blur-xl text-white"
      }`}
    >
      <span className="font-semibold">
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 bg-white rounded-sm"
              style={{ height: 4 + i * 2 }}
            />
          ))}
        </div>
        <span className="ml-2 text-xs">100%</span>
      </div>
    </div>
  );

  // Render project detail
  if (navigation.type === "project") {
    return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col overflow-hidden">
        <StatusBar dark />

        {/* Header with back button */}
        <div className="h-12 bg-gray-800 flex items-center px-4 border-b border-gray-700">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-blue-400 active:text-blue-300"
          >
            <ChevronLeft size={20} />
            <span className="text-sm">Back</span>
          </button>
          <span className="flex-1 text-center text-white font-medium pr-16 truncate text-sm">
            {navigation.project.title}
          </span>
        </div>

        {/* Project content */}
        <div className="flex-1 overflow-hidden">
          <MobileProjectDetail project={navigation.project} />
        </div>
      </div>
    );
  }

  // Render active app
  if (navigation.type === "app") {
    const isFinderApp = navigation.appComponent === "finder";
    const AppComponent = windowComponents[navigation.appComponent];

    return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col overflow-hidden">
        <StatusBar dark />

        {/* App header with back button */}
        <div className="h-12 bg-gray-800 flex items-center px-4 border-b border-gray-700">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-blue-400 active:text-blue-300"
          >
            <ChevronLeft size={20} />
            <span className="text-sm">Back</span>
          </button>
          <span className="flex-1 text-center text-white font-medium pr-16 text-sm">
            {navigation.title}
          </span>
        </div>

        {/* App content */}
        <div className="flex-1 overflow-hidden">
          {isFinderApp ? (
            <MobileFinder onOpenProject={handleOpenProject} />
          ) : AppComponent ? (
            <AppComponent />
          ) : (
            <div className="h-full flex items-center justify-center text-white bg-gray-900">
              <div className="text-center p-8">
                <Folder size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">App content coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Home screen
  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      <StatusBar />

      {/* Content area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${wallpaperUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />

        {activeTab === "home" ? (
          /* Home Screen */
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
            {/* Profile */}
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-3 mx-auto shadow-lg">
                DM
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {heroContent.headline}
              </h1>
              <p className="text-white/80 text-sm tracking-wider">
                {heroContent.title}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 mt-4 w-full max-w-xs">
              {allApps.slice(0, 6).map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleOpenApp(app)}
                  className="flex flex-col items-center gap-1.5 p-2 active:scale-95 transition-transform"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-lg">
                    <Image
                      src={app.icon}
                      alt={app.label}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-white text-[10px] font-medium line-clamp-1">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Apps Grid */
          <div className="relative z-10 h-full overflow-y-auto py-4 px-4">
            <h2 className="text-white text-base font-semibold mb-3 px-1">
              All Apps
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {allApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleOpenApp(app)}
                  className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-lg">
                    <Image
                      src={app.icon}
                      alt={app.label}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-white text-[9px] font-medium text-center line-clamp-1 w-full">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* iOS-style Tab Bar */}
      <div className="h-16 bg-black/60 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-8">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === "home" ? "text-blue-400" : "text-white/60"
          }`}
        >
          <Home size={22} />
          <span className="text-[10px]">Home</span>
        </button>
        <button
          onClick={() => setActiveTab("apps")}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === "apps" ? "text-blue-400" : "text-white/60"
          }`}
        >
          <FolderOpen size={22} />
          <span className="text-[10px]">Apps</span>
        </button>
      </div>

      {/* Home indicator */}
      <div className="h-1 flex justify-center pb-2 bg-black">
        <div className="w-28 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
