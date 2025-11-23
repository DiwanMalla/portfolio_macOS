export interface WallpaperOption {
  id: string;
  name: string;
  src: string;
  thumbnail: string;
  glow: string;
}

export const wallpaperOptions: WallpaperOption[] = [
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

export const wallpaperMap: Record<string, WallpaperOption> =
  wallpaperOptions.reduce((acc, wallpaper) => {
    acc[wallpaper.id] = wallpaper;
    return acc;
  }, {} as Record<string, WallpaperOption>);

export const defaultWallpaperId = "default";
