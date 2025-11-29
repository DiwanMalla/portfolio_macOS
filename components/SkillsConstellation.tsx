"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface SkillNode {
  id: string;
  name: string;
  group: "core" | "frontend" | "backend" | "tools";
  connections: string[];
}

const skills: SkillNode[] = [
  // Core
  { id: "react", name: "React 19", group: "core", connections: ["next", "ts", "js", "mui", "tailwind"] },
  { id: "next", name: "Next.js 15", group: "core", connections: ["react", "ts", "node", "aws"] },
  { id: "ts", name: "TypeScript", group: "core", connections: ["react", "next", "node", "js"] },
  { id: "js", name: "JavaScript", group: "core", connections: ["react", "node", "ts"] },

  // Frontend
  { id: "tailwind", name: "Tailwind CSS", group: "frontend", connections: ["react", "css", "html"] },
  { id: "mui", name: "Material UI", group: "frontend", connections: ["react", "css"] },
  { id: "html", name: "HTML5", group: "frontend", connections: ["css", "js"] },
  { id: "css", name: "CSS3", group: "frontend", connections: ["html", "tailwind", "mui"] },
  { id: "framer", name: "Framer Motion", group: "frontend", connections: ["react"] },

  // Backend
  { id: "node", name: "Node.js", group: "backend", connections: ["express", "mongo", "js", "ts"] },
  { id: "express", name: "Express", group: "backend", connections: ["node", "api"] },
  { id: "python", name: "Python", group: "backend", connections: ["flask", "ai"] },
  { id: "flask", name: "Flask", group: "backend", connections: ["python", "api"] },
  { id: "mongo", name: "MongoDB", group: "backend", connections: ["node", "db"] },
  { id: "postgres", name: "PostgreSQL", group: "backend", connections: ["db", "node"] },
  { id: "aws", name: "AWS", group: "backend", connections: ["next", "node", "docker"] },
  { id: "api", name: "REST APIs", group: "backend", connections: ["node", "python"] },
  { id: "db", name: "Databases", group: "backend", connections: ["mongo", "postgres"] },

  // Tools & Others
  { id: "git", name: "Git", group: "tools", connections: ["github"] },
  { id: "github", name: "GitHub", group: "tools", connections: ["git", "actions"] },
  { id: "actions", name: "GitHub Actions", group: "tools", connections: ["github", "aws"] },
  { id: "docker", name: "Docker", group: "tools", connections: ["aws", "node"] },
  { id: "figma", name: "Figma", group: "tools", connections: ["css", "html"] },
  { id: "ai", name: "AI/ML", group: "tools", connections: ["python"] },
];

export default function SkillsConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0f172a"); // Slate-900
    scene.fog = new THREE.FogExp2("#0f172a", 0.002);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 2, 100); // Blue light
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Nodes & Lines
    const nodes: { mesh: THREE.Mesh; data: SkillNode; velocity: THREE.Vector3 }[] = [];
    const lines: { line: THREE.Line; start: THREE.Mesh; end: THREE.Mesh }[] = [];

    // Geometry & Materials
    const nodeGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    
    const materials = {
      core: new THREE.MeshPhongMaterial({ color: 0x3b82f6, emissive: 0x1d4ed8, emissiveIntensity: 0.5 }), // Blue
      frontend: new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0xbe185d, emissiveIntensity: 0.5 }), // Pink
      backend: new THREE.MeshPhongMaterial({ color: 0x10b981, emissive: 0x047857, emissiveIntensity: 0.5 }), // Emerald
      tools: new THREE.MeshPhongMaterial({ color: 0xf59e0b, emissive: 0xb45309, emissiveIntensity: 0.5 }), // Amber
      hover: new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1 }), // White glow
    };

    // Create Nodes
    skills.forEach((skill) => {
      const mesh = new THREE.Mesh(nodeGeometry, materials[skill.group].clone());
      
      // Random initial position
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );

      scene.add(mesh);
      nodes.push({ mesh, data: skill, velocity: new THREE.Vector3() });
    });

    // Create Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });

    skills.forEach((skill, i) => {
      skill.connections.forEach((targetId) => {
        const targetIndex = skills.findIndex((s) => s.id === targetId);
        if (targetIndex !== -1 && targetIndex > i) { // Avoid duplicates
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].mesh.position,
            nodes[targetIndex].mesh.position,
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
          lines.push({ line, start: nodes[i].mesh, end: nodes[targetIndex].mesh });
        }
      });
    });

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    container.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Physics Simulation (Simple Force Directed)
      nodes.forEach((node, i) => {
        // 1. Center Attraction (Gravity)
        const distToCenter = node.mesh.position.length();
        const gravityStrength = 0.01;
        node.velocity.add(node.mesh.position.clone().multiplyScalar(-gravityStrength * 0.05));

        // 2. Repulsion between all nodes
        nodes.forEach((otherNode, j) => {
          if (i === j) return;
          const diff = node.mesh.position.clone().sub(otherNode.mesh.position);
          const dist = diff.length();
          if (dist < 6) { // Repulsion radius
            const force = diff.normalize().multiplyScalar(0.05 / (dist * dist));
            node.velocity.add(force);
          }
        });

        // 3. Spring force for connections
        node.data.connections.forEach(connId => {
          const targetNode = nodes.find(n => n.data.id === connId);
          if (targetNode) {
            const diff = targetNode.mesh.position.clone().sub(node.mesh.position);
            const dist = diff.length();
            const targetDist = 5; // Ideal distance
            const force = diff.normalize().multiplyScalar((dist - targetDist) * 0.005);
            node.velocity.add(force);
          }
        });

        // Apply velocity and damping
        node.velocity.multiplyScalar(0.95); // Damping
        node.mesh.position.add(node.velocity);

        // Gentle rotation/float
        node.mesh.position.y += Math.sin(time + i) * 0.002;
      });

      // Update Lines
      lines.forEach(({ line, start, end }) => {
        const positions = line.geometry.attributes.position.array as Float32Array;
        positions[0] = start.position.x;
        positions[1] = start.position.y;
        positions[2] = start.position.z;
        positions[3] = end.position.x;
        positions[4] = end.position.y;
        positions[5] = end.position.z;
        line.geometry.attributes.position.needsUpdate = true;
      });

      // Camera Rotation (Slow orbit)
      camera.position.x = Math.sin(time * 0.1) * 40;
      camera.position.z = Math.cos(time * 0.1) * 40;
      camera.lookAt(0, 0, 0);

      // Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));

      if (intersects.length > 0) {
        const intersectedNode = nodes.find(n => n.mesh === intersects[0].object);
        if (intersectedNode) {
          if (hoveredSkill !== intersectedNode.data.name) {
            setHoveredSkill(intersectedNode.data.name);
            document.body.style.cursor = "pointer";
            
            // Highlight effect
            nodes.forEach(n => {
              if (n === intersectedNode || intersectedNode.data.connections.includes(n.data.id)) {
                (n.mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 1;
                n.mesh.scale.setScalar(1.2);
              } else {
                (n.mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.2;
                n.mesh.scale.setScalar(1);
              }
            });
          }
        }
      } else {
        if (hoveredSkill !== null) {
          setHoveredSkill(null);
          document.body.style.cursor = "default";
          
          // Reset styles
          nodes.forEach(n => {
            (n.mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.5;
            n.mesh.scale.setScalar(1);
          });
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Cleanup geometry/materials
      nodeGeometry.dispose();
      Object.values(materials).forEach(m => m.dispose());
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Overlay UI */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <div className="flex gap-4 text-xs font-medium text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" /> Core
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" /> Frontend
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> Backend
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" /> Tools
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredSkill && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white font-bold tracking-wide animate-in fade-in slide-in-from-top-2">
          {hoveredSkill}
        </div>
      )}
    </div>
  );
}
