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
  contact: {
    id: "contact",
    title: "Contact Me",
    component: "contact",
    icon: "/images/contact.png",
    category: "system",
    defaultSize: { width: 900, height: 600 },
    defaultPosition: { x: 150, y: 150 },
    description: "Get in touch form and details.",
  },
  resume: {
    id: "resume",
    title: "Resume",
    component: "resume",
    icon: "/images/pdf.png",
    category: "system",
    defaultSize: { width: 800, height: 800 },
    defaultPosition: { x: 200, y: 50 },
    description: "My professional resume.",
  },
  finder: {
    id: "finder",
    title: "Projects",
    component: "finder",
    icon: "/images/finder.png",
    category: "system",
    defaultSize: { width: 800, height: 500 },
    defaultPosition: { x: 100, y: 100 },
    description: "Project explorer.",
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    component: "terminal",
    icon: "/images/terminal.png",
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
  figma: {
    id: "figma",
    title: "Figma",
    component: "figma",
    icon: "/images/figma.png",
    category: "design",
    defaultSize: { width: 960, height: 620 },
    defaultPosition: { x: 180, y: 140 },
    description: "Design explorations and principles.",
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
  windowDockEntry("figma"),
  {
    id: "trash",
    name: "Trash",
    icon: "/images/trash.png",
    type: "system",
  },
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
    icon: "/images/folder.png",
    target: "safari",
    type: "folder",
  },
  {
    id: "projects-folder",
    label: "Projects",
    icon: "/images/folder.png",
    target: "safari",
    type: "folder",
  },
  {
    id: "resume-file",
    label: "Resume.pdf",
    icon: "/images/pdf.png",
    target: "resume",
    type: "file",
  },
  {
    id: "contact-file",
    label: "Contact.txt",
    icon: "/images/txt.png",
    target: "contact",
    type: "file",
  },
];
