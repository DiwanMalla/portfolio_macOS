export interface Profile {
  name: string;
  title: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  website: string;
  resume: string;
  avatar: string;
  summary: string;
}

export const profile: Profile = {
  name: "Diwan Malla",
  title: "Full Stack Developer",
  location: "Kathmandu, Nepal",
  availability: "Open to collaborating on bold ideas",
  email: "hello@diwanmalla.com",
  phone: "+977-9800-00000",
  website: "https://diwanmalla.com",
  resume: "/files/resume.pdf",
  avatar: "/images/adrian.jpg",
  summary:
    "I blend motion, 3D, and systems thinking to build immersive, Apple-inspired product experiences.",
};

export interface HeroContent {
  headline: string;
  title: string;
  tagline: string;
}

export const heroContent: HeroContent = {
  headline: profile.name,
  title: profile.title,
  tagline: "Crafting cinematic, Mac OS-style interfaces on the web.",
};

export interface MenuConfig {
  branding: string;
  menus: string[];
}

export const menuConfig: MenuConfig = {
  branding: `${profile.name.split(" ")[0]} • Portfolio`,
  menus: ["File", "Edit", "View", "Go", "Window", "Help"],
};

export interface ContactInfo {
  email: string;
  phone: string;
  timezone: string;
  location: string;
}

export const contactInfo: ContactInfo = {
  email: profile.email,
  phone: profile.phone,
  timezone: "GMT+5:45 (Kathmandu)",
  location: profile.location,
};

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  handle: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/diwanmalla",
    handle: "@diwanmalla",
    icon: "/icons/github.svg",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://linkedin.com/in/diwanmalla",
    handle: "linkedin.com/in/diwanmalla",
    icon: "/icons/linkedin.svg",
  },
  {
    id: "twitter",
    label: "Twitter",
    url: "https://x.com/diwanmalla",
    handle: "@diwanmalla",
    icon: "/icons/twitter.svg",
  },
];

export interface TerminalCommands {
  [key: string]: string[];
}

export const terminalCommands: TerminalCommands = {
  help: [
    "Available commands:",
    "  about    - Learn about me",
    "  skills   - View my technical skills",
    "  projects - See recent highlights",
    "  contact  - Get my contact info",
    "  chat     - Talk to Diwan's AI digital twin",
    "  clear    - Clear terminal",
  ],
  about: [
    `Hi, I'm ${
      profile.name
    }, a ${profile.title.toLowerCase()} focused on crafting beautiful interfaces.`,
    profile.summary,
  ],
  skills: [
    "Frontend : Next.js, React 19, TypeScript, Tailwind CSS",
    "Backend  : Node.js, Express, MongoDB, PostgreSQL",
    "Tooling  : GSAP, Three.js, Zustand, Vercel, Docker",
  ],
  projects: [
    "1. Mac OS Portfolio — immersive desktop web experience",
    "2. Launchpad — real-time startup analytics dashboard",
    "3. Canvas — collaborative design system playground",
  ],
  contact: [
    `Email  : ${contactInfo.email}`,
    `LinkedIn: ${socialLinks[1].url}`,
    `GitHub : ${socialLinks[0].url}`,
    `Website: ${profile.website}`,
  ],
};
