export interface WindowConfig {
  id: string;
  title: string;
  component: string;
  icon: string;
  category: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
  description: string;
}

export interface WindowRegistry {
  [key: string]: WindowConfig;
}

export const windowRegistry: WindowRegistry = {
  aboutme: {
    id: "aboutme",
    title: "About Me",
    component: "aboutme",
    icon: "/icons/3d/aboutme.png",
    category: "system",
    defaultSize: { width: 800, height: 650 },
    defaultPosition: { x: 120, y: 50 },
    description: "My professional profile and background.",
  },
  contact: {
    id: "contact",
    title: "Contact Me",
    component: "contact",
    icon: "/icons/3d/contact.png",
    category: "system",
    defaultSize: { width: 900, height: 600 },
    defaultPosition: { x: 150, y: 150 },
    description: "Get in touch form and details.",
  },
  resume: {
    id: "resume",
    title: "Resume",
    component: "resume",
    icon: "/icons/3d/resume.png",
    category: "system",
    defaultSize: { width: 700, height: 550 },
    defaultPosition: { x: 200, y: 60 },
    description: "My professional resume.",
  },
  finder: {
    id: "finder",
    title: "Projects",
    component: "finder",
    icon: "/icons/3d/projects.png",
    category: "system",
    defaultSize: { width: 800, height: 500 },
    defaultPosition: { x: 100, y: 100 },
    description: "Project explorer.",
  },
  terminal: {
    id: "terminal",
    title: "Diwan AI",
    component: "terminal",
    icon: "/icons/3d/diwan-ai.png",
    category: "system",
    defaultSize: { width: 820, height: 520 },
    defaultPosition: { x: 160, y: 140 },
    description: "Interactive CLI to explore my profile.",
  },
  safari: {
    id: "safari",
    title: "Safari",
    component: "safari",
    icon: "/images/safari.png",
    category: "browser",
    defaultSize: { width: 980, height: 640 },
    defaultPosition: { x: 120, y: 120 },
    description: "Portfolio sections, links, and highlights.",
  },
  photos: {
    id: "photos",
    title: "Photos",
    component: "photos",
    icon: "/images/photos.png",
    category: "media",
    defaultSize: { width: 920, height: 600 },
    defaultPosition: { x: 200, y: 160 },
    description: "Gallery of projects and mood boards.",
  },
  blog: {
    id: "blog",
    title: "Blog",
    component: "blog",
    icon: "/icons/3d/blog.png",
    category: "content",
    defaultSize: { width: 900, height: 620 },
    defaultPosition: { x: 150, y: 80 },
    description: "Thoughts, tutorials and insights.",
  },
  trash: {
    id: "trash",
    title: "Trash",
    component: "trash",
    icon: "/images/trash.png",
    category: "system",
    defaultSize: { width: 600, height: 400 },
    defaultPosition: { x: 300, y: 200 },
    description: "Deleted items.",
  },
};

export interface DockApp {
  id: string;
  name: string;
  icon: string;
  type: string;
  category?: string;
  tooltip?: string;
  disabled?: boolean;
}

const windowDockEntry = (id: string): DockApp => {
  const windowConfig = windowRegistry[id];
  return {
    id: windowConfig.id,
    name: windowConfig.title,
    icon: windowConfig.icon,
    type: "window",
    category: windowConfig.category,
  };
};

export const dockApps: DockApp[] = [
  windowDockEntry("finder"),
  windowDockEntry("safari"),
  windowDockEntry("terminal"),
  windowDockEntry("photos"),
  windowDockEntry("blog"),
  windowDockEntry("trash"),
];

export interface DesktopShortcut {
  id: string;
  label: string;
  icon: string;
  target: string;
  type: "folder" | "file" | "app";
}

export const desktopShortcuts: DesktopShortcut[] = [
  {
    id: "about-folder",
    label: "About Me",
    icon: "/icons/3d/aboutme.png",
    target: "aboutme",
    type: "folder",
  },
  {
    id: "projects-folder",
    label: "Projects",
    icon: "/icons/3d/projects.png",
    target: "finder",
    type: "folder",
  },
  {
    id: "blog-folder",
    label: "Blog",
    icon: "/icons/3d/blog.png",
    target: "blog",
    type: "folder",
  },
  {
    id: "diwan-ai",
    label: "Diwan AI",
    icon: "/icons/3d/diwan-ai.png",
    target: "terminal",
    type: "app",
  },
  {
    id: "resume-file",
    label: "DiwanMalla.pdf",
    icon: "/icons/3d/resume.png",
    target: "resume",
    type: "file",
  },
  {
    id: "contact-file",
    label: "Contact.txt",
    icon: "/icons/3d/contact.png",
    target: "contact",
    type: "file",
  },
];
