"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DayNightTheme } from "@/hooks/useDayNightCycle";

interface AnimatedWallpaperProps {
  theme: DayNightTheme;
}

export default function AnimatedWallpaper({ theme }: AnimatedWallpaperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight | null;
    point1: THREE.PointLight | null;
    point2: THREE.PointLight | null;
  }>({ ambient: null, point1: null, point2: null });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    scene.background = new THREE.Color(theme.backgroundColor);
    scene.fog = new THREE.FogExp2(theme.fogColor, 0.02);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, theme.ambientLight);
    scene.add(ambientLight);
    lightsRef.current.ambient = ambientLight;

    const pointLight1 = new THREE.PointLight(theme.pointLight1Color, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    lightsRef.current.point1 = pointLight1;

    const pointLight2 = new THREE.PointLight(theme.pointLight2Color, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);
    lightsRef.current.point2 = pointLight2;

    // Objects
    const objects: THREE.Mesh[] = [];
    const geometry = new THREE.IcosahedronGeometry(1, 1);

    // Create a cloud of geometric shapes
    for (let i = 0; i < 50; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
        shininess: 100,
        flatShading: true,
        transparent: true,
        opacity: 0.8,
        wireframe: Math.random() > 0.5, // Mix of wireframe and solid
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Random position spread
      mesh.position.x = (Math.random() - 0.5) * 40;
      mesh.position.y = (Math.random() - 0.5) * 40;
      mesh.position.z = (Math.random() - 0.5) * 20;

      // Random scale
      const scale = Math.random() * 1.5 + 0.5;
      mesh.scale.set(scale, scale, scale);

      // Random rotation speed
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        floatSpeed: Math.random() * 0.01 + 0.005,
        initialY: mesh.position.y,
        timeOffset: Math.random() * 100,
      };

      scene.add(mesh);
      objects.push(mesh);
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.01;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.01;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      // Smooth camera movement
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate objects
      objects.forEach((obj) => {
        obj.rotation.x += obj.userData.rotSpeedX;
        obj.rotation.y += obj.userData.rotSpeedY;

        // Floating motion
        obj.position.y =
          obj.userData.initialY +
          Math.sin(time * obj.userData.floatSpeed + obj.userData.timeOffset) *
            2;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const container = containerRef.current;

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update lights when theme changes
  useEffect(() => {
    if (lightsRef.current.ambient) {
      lightsRef.current.ambient.intensity = theme.ambientLight;
    }
    if (lightsRef.current.point1) {
      lightsRef.current.point1.color.setHex(theme.pointLight1Color);
    }
    if (lightsRef.current.point2) {
      lightsRef.current.point2.color.setHex(theme.pointLight2Color);
    }
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(theme.backgroundColor);
      sceneRef.current.fog = new THREE.FogExp2(theme.fogColor, 0.02);
    }
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}
