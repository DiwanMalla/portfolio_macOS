export const profile = {
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

export const heroContent = {
  headline: profile.name,
  title: profile.title,
  tagline: "Crafting cinematic, Mac OS-style interfaces on the web.",
};

export const menuConfig = {
  branding: `${profile.name.split(" ")[0]} • Portfolio`,
  menus: ["File", "Edit", "View", "Go", "Window", "Help"],
};

export const contactInfo = {
  email: profile.email,
  phone: profile.phone,
  timezone: "GMT+5:45 (Kathmandu)",
  location: profile.location,
};

export const socialLinks = [
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

export const terminalCommands = {
  help: [
    "Available commands:",
    "  about    - Learn about me",
    "  skills   - View my technical skills",
    "  projects - See recent highlights",
    "  contact  - Get my contact info",
    "  clear    - Clear terminal",
  ],
  about: [
    `Hi, I'm ${profile.name}, a ${profile.title.toLowerCase()} focused on crafting beautiful interfaces.`,
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
