export const wallpaperOptions = [
  {
    id: "default",
    name: "Aurora Drift",
    src: "/wallpapers/wallpaper.jpg",
    thumbnail: "/wallpapers/wallpaper.jpg",
    glow: "rgba(56, 189, 248, 0.32)",
  },
  {
    id: "nebula",
    name: "Nebula Bloom",
    src: "/wallpapers/default.jpg",
    thumbnail: "/wallpapers/default.jpg",
    glow: "rgba(249, 115, 22, 0.24)",
  },
];

export const wallpaperMap = wallpaperOptions.reduce((acc, wallpaper) => {
  acc[wallpaper.id] = wallpaper;
  return acc;
}, {});

export const defaultWallpaperId = "default";
