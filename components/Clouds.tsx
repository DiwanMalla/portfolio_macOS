"use client";

import { useEffect, useRef } from "react";

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  opacity: number;
}

export default function Clouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate clouds
    const generateClouds = () => {
      const clouds: Cloud[] = [];
      const cloudCount = 8;

      for (let i = 0; i < cloudCount; i++) {
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.4), // Upper 40% of screen
          width: Math.random() * 150 + 100,
          height: Math.random() * 40 + 30,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.3 + 0.2,
        });
      }

      cloudsRef.current = clouds;
    };

    generateClouds();

    // Draw a cloud shape
    const drawCloud = (cloud: Cloud) => {
      ctx.save();
      ctx.globalAlpha = cloud.opacity;
      ctx.fillStyle = "white";

      // Draw multiple overlapping circles to create cloud shape
      const circles = 5;
      for (let i = 0; i < circles; i++) {
        const offsetX = (i - circles / 2) * (cloud.width / circles);
        const radius = cloud.height / 2 + Math.random() * 10;
        
        ctx.beginPath();
        ctx.arc(
          cloud.x + offsetX,
          cloud.y + Math.sin(i) * 5,
          radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.restore();
    };

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cloudsRef.current.forEach((cloud) => {
        drawCloud(cloud);

        // Move cloud
        cloud.x += cloud.speed;

        // Reset cloud position when it goes off screen
        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width;
          cloud.y = Math.random() * (canvas.height * 0.4);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
