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
  Loader2,
  ExternalLink,
  Folder,
  LayoutGrid,
  Smartphone,
  Database,
  Globe,
  ChevronLeft,
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

// Tablet-optimized Finder component
function TabletFinder({
  onOpenProject,
}: {
  onOpenProject: (project: Project) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { projects, loading } = useProjects();

  const categories = [
    { id: "all", label: "All Projects", icon: LayoutGrid },
    { id: "Web Development", label: "Web Dev", icon: Globe },
    { id: "Mobile App Development", label: "Mobile Apps", icon: Smartphone },
    { id: "Database Management", label: "Database", icon: Database },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.projectCategory.includes(activeCategory));

  return (
    <div className="h-full flex bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-56 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
          Categories
        </h3>
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-colors ${
                activeCategory === cat.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <Icon size={16} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {activeCategory === "all" ? "All Projects" : activeCategory}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredProjects.length} items
          </span>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 size={32} className="animate-spin text-blue-500" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-gray-500">
            <p>No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <button
                key={project._id}
                onClick={() => onOpenProject(project)}
                className="flex flex-col bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all text-left group"
              >
                <div className="relative aspect-video w-full">
                  {project.images && project.images[0] ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Folder size={40} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Tablet-optimized Project Detail component
function TabletProjectDetail({ project }: { project: Project }) {
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900">
      {/* Hero Image */}
      {project.images && project.images[0] && (
        <div className="relative w-full h-64">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 backdrop-blur text-white text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          {project.client && (
            <span>
              <strong className="text-gray-700 dark:text-gray-300">
                Client:
              </strong>{" "}
              {project.client}
            </span>
          )}
          {project.projectCategory && project.projectCategory.length > 0 && (
            <span>
              <strong className="text-gray-700 dark:text-gray-300">
                Category:
              </strong>{" "}
              {project.projectCategory.join(", ")}
            </span>
          )}
          {project.createdAt && (
            <span>
              <strong className="text-gray-700 dark:text-gray-300">
                Date:
              </strong>{" "}
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.description}
          </ReactMarkdown>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 1 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Project Gallery
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {project.images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-xl overflow-hidden shadow-md"
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
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg"
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

export default function TabletView() {
  const [navigation, setNavigation] = useState<NavigationState>({
    type: "home",
  });
  const [navigationHistory, setNavigationHistory] = useState<NavigationState[]>(
    []
  );
  const wallpaper = useStore((state) => state.wallpaper);
  const wallpaperUrl =
    wallpaperMap[wallpaper]?.src || wallpaperMap[defaultWallpaperId].src;

  // Combine desktop shortcuts and dock apps for tablet grid
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

  const handleGoHome = () => {
    setNavigationHistory([]);
    setNavigation({ type: "home" });
  };

  // Status bar component
  const StatusBar = ({ title }: { title?: string }) => (
    <div className="h-7 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 text-white text-xs">
      <span className="font-medium">
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      {title && (
        <span className="font-semibold tracking-wide">{title}</span>
      )}
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-0.5 bg-white rounded-sm"
              style={{ height: 3 + i * 1.5 }}
            />
          ))}
        </div>
        <span className="text-[10px]">100%</span>
      </div>
    </div>
  );

  // Dock component
  const Dock = ({ showBack = false }: { showBack?: boolean }) => (
    <div className="h-20 bg-black/30 backdrop-blur-2xl border-t border-white/10 flex items-center justify-center gap-3 px-6 pb-2">
      {/* Back/Home button */}
      {showBack && (
        <button
          onClick={navigationHistory.length > 0 ? handleBack : handleGoHome}
          className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mr-4 hover:bg-white/20 transition-colors"
        >
          {navigationHistory.length > 0 ? (
            <ChevronLeft size={24} className="text-white" />
          ) : (
            <Home size={24} className="text-white" />
          )}
        </button>
      )}

      {/* App icons in dock */}
      {dockApps.slice(0, 6).map((app) => (
        <button
          key={app.id}
          onClick={() => {
            const appItem = allApps.find((a) => a.id === app.id);
            if (appItem) handleOpenApp(appItem);
          }}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 ${
            navigation.type === "app" && navigation.appId === app.id
              ? "bg-white/30 ring-2 ring-white/50"
              : "bg-white/10 backdrop-blur-xl hover:bg-white/20"
          }`}
        >
          <Image
            src={app.icon}
            alt={app.name}
            width={36}
            height={36}
            className="object-contain"
          />
        </button>
      ))}
    </div>
  );

  // Render project detail
  if (navigation.type === "project") {
    return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col overflow-hidden">
        <StatusBar title={navigation.project.title} />

        {/* App content */}
        <div className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <TabletProjectDetail project={navigation.project} />
        </div>

        <Dock showBack />

        {/* Home indicator */}
        <div className="h-2 flex justify-center pb-1 bg-black/30">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
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
        <StatusBar title={navigation.title} />

        {/* App content */}
        <div className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900">
          {isFinderApp ? (
            <TabletFinder onOpenProject={handleOpenProject} />
          ) : AppComponent ? (
            <AppComponent />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center p-8">
                <Folder size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg">App content coming soon</p>
              </div>
            </div>
          )}
        </div>

        <Dock showBack />

        {/* Home indicator */}
        <div className="h-2 flex justify-center pb-1 bg-black/30">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
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
        <div className="absolute inset-0 bg-black/20" />

        {/* iPad Home Screen Grid */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          {/* Hero section */}
          <div className="text-center mb-8">
            <div className="w-28 h-28 rounded-3xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mb-4 mx-auto shadow-2xl">
              DM
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {heroContent.headline}
            </h1>
            <p className="text-white/80 text-xl tracking-wider">
              {heroContent.title}
            </p>
          </div>

          {/* Apps Grid - iPad style 5 columns */}
          <div className="grid grid-cols-5 gap-6 max-w-3xl">
            {allApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleOpenApp(app)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-xl flex items-center justify-center shadow-xl group-hover:bg-white/25 transition-all group-hover:scale-105">
                  <Image
                    src={app.icon}
                    alt={app.label}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span className="text-white text-sm font-medium drop-shadow-md">
                  {app.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dock />

      {/* Home indicator */}
      <div className="h-2 flex justify-center pb-1 bg-black/30">
        <div className="w-32 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
