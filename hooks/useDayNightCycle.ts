import { useState, useEffect } from "react";

export type TimeOfDay = "dawn" | "day" | "dusk" | "night";

export interface DayNightTheme {
  timeOfDay: TimeOfDay;
  skyGradient: string;
  overlayColor: string;
  glowColor: string;
  ambientLight: number;
  pointLight1Color: number;
  pointLight2Color: number;
  fogColor: string;
  backgroundColor: string;
}

const themes: Record<TimeOfDay, DayNightTheme> = {
  dawn: {
    timeOfDay: "dawn",
    skyGradient: "linear-gradient(to bottom, #ff9a56 0%, #ff6b9d 50%, #c471ed 100%)",
    overlayColor: "rgba(255, 154, 86, 0.15)",
    glowColor: "rgba(255, 107, 157, 0.3)",
    ambientLight: 0.4,
    pointLight1Color: 0xff9a56,
    pointLight2Color: 0xff6b9d,
    fogColor: "#ff9a56",
    backgroundColor: "#2d1b3d",
  },
  day: {
    timeOfDay: "day",
    skyGradient: "linear-gradient(to bottom, #87ceeb 0%, #98d8e8 50%, #b0e0e6 100%)",
    overlayColor: "rgba(135, 206, 235, 0.1)",
    glowColor: "rgba(59, 130, 246, 0.25)",
    ambientLight: 0.6,
    pointLight1Color: 0xffffff,
    pointLight2Color: 0x87ceeb,
    fogColor: "#87ceeb",
    backgroundColor: "#4a90a4",
  },
  dusk: {
    timeOfDay: "dusk",
    skyGradient: "linear-gradient(to bottom, #ff6b35 0%, #f7931e 50%, #c471ed 100%)",
    overlayColor: "rgba(255, 107, 53, 0.2)",
    glowColor: "rgba(247, 147, 30, 0.35)",
    ambientLight: 0.3,
    pointLight1Color: 0xff6b35,
    pointLight2Color: 0xc471ed,
    fogColor: "#ff6b35",
    backgroundColor: "#3d2645",
  },
  night: {
    timeOfDay: "night",
    skyGradient: "linear-gradient(to bottom, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    overlayColor: "rgba(15, 12, 41, 0.4)",
    glowColor: "rgba(48, 43, 99, 0.4)",
    ambientLight: 0.2,
    pointLight1Color: 0x00ffff,
    pointLight2Color: 0xff00ff,
    fogColor: "#0f0c29",
    backgroundColor: "#050505",
  },
};

function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

export function useDayNightCycle() {
  const [theme, setTheme] = useState<DayNightTheme>(themes.night);
  const [currentHour, setCurrentHour] = useState<number>(0);

  useEffect(() => {
    const updateTheme = () => {
      const now = new Date();
      const hour = now.getHours();
      setCurrentHour(hour);
      const timeOfDay = getTimeOfDay(hour);
      setTheme(themes[timeOfDay]);
    };

    // Update immediately
    updateTheme();

    // Update every minute
    const interval = setInterval(updateTheme, 60000);

    return () => clearInterval(interval);
  }, []);

  return { theme, currentHour };
}
