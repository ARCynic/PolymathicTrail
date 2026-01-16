// import React, { useEffect, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { SITE_MAP } from "../../data/sitemap.js";

// const PERSPECTIVE = 900;
// const RADIUS = 240;

// // --- stable seeded random (so sizes don’t change on refresh) ---
// function seeded01(str) {
//   let h = 2166136261;
//   for (let i = 0; i < str.length; i++) {
//     h ^= str.charCodeAt(i);
//     h = Math.imul(h, 16777619);
//   }
//   return (h >>> 0) / 4294967295;
// }

// class Node3D {
//   constructor(id, label, x, y, to) {
//     this.id = id;
//     this.label = label;
//     this.to = to;

//     // Larger nodes (stable)
//     if (id === "home") {
//       this.baseSize = 34;
//     } else {
//       const r = seeded01(id);
//       this.baseSize = 14 + r * 10; // 14..24
//     }

//     // Spherical distribution
//     const theta = x * Math.PI * 2;
//     const phi = (y - 0.5) * Math.PI;

//     this.x = RADIUS * Math.cos(phi) * Math.cos(theta);
//     this.y = RADIUS * Math.sin(phi);
//     this.z = RADIUS * Math.cos(phi) * Math.sin(theta);

//     this.sx = 0;
//     this.sy = 0;
//     this.scale = 1;

//     this.rx = 0;
//     this.ry = 0;
//     this.rz = 0;
//   }

//   rotate(angleY, angleX) {
//     // Y rotation
//     let cos = Math.cos(angleY);
//     let sin = Math.sin(angleY);
//     let x1 = this.x * cos - this.z * sin;
//     let z1 = this.z * cos + this.x * sin;

//     // X rotation
//     cos = Math.cos(angleX);
//     sin = Math.sin(angleX);
//     let y1 = this.y * cos - z1 * sin;
//     let z2 = z1 * cos + this.y * sin;

//     this.rx = x1;
//     this.ry = y1;
//     this.rz = z2;
//   }

//   project(width, height) {
//     // push back slightly to avoid clipping
//     this.scale = PERSPECTIVE / (PERSPECTIVE + this.rz + 260);
//     this.sx = width / 2 + this.rx * this.scale;
//     this.sy = height / 2 + this.ry * this.scale;
//   }
// }

// export default function SiteMapPreview({ height = 400 }) {
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const rafRef = useRef(0);

//   // Model
//   const { nodes, edges, adjacency } = useMemo(() => {
//     const rawNodes = SITE_MAP?.nodes || [];
//     const rawEdges = SITE_MAP?.edges || [];

//     const nodes = rawNodes.map(
//       (n) => new Node3D(n.id, n.label, n.pos?.x ?? 0.5, n.pos?.y ?? 0.5, n.to)
//     );
//     const nodesById = Object.fromEntries(nodes.map((n) => [n.id, n]));

//     const edges = rawEdges
//       .map((e) => ({ from: nodesById[e.from], to: nodesById[e.to] }))
//       .filter((e) => e.from && e.to);

//     // adjacency computed (not used right now, but kept if you later want neighbor effects)
//     const adjacency = {};
//     nodes.forEach((n) => (adjacency[n.id] = new Set()));
//     edges.forEach((e) => {
//       adjacency[e.from.id].add(e.to.id);
//       adjacency[e.to.id].add(e.from.id);
//     });

//     return { nodes, edges, adjacency };
//   }, []);

//   // Resize + DPR scaling (no per-frame resize checks)
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;

//     const ctx = canvas.getContext("2d");

//     const resize = () => {
//       const dpr = window.devicePixelRatio || 1;
//       const cssW = container.offsetWidth;
//       const cssH = height;

//       canvas.style.width = `${cssW}px`;
//       canvas.style.height = `${cssH}px`;
//       canvas.width = Math.floor(cssW * dpr);
//       canvas.height = Math.floor(cssH * dpr);

//       // Draw in CSS pixels
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     };

//     resize();
//     const ro = new ResizeObserver(resize);
//     ro.observe(container);

//     return () => ro.disconnect();
//   }, [height]);

//   // Animation loop (no hover logic at all)
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");

//     let rotationY = 0;
//     let rotationX = 0;
//     let t = 0;

//     const animate = () => {
//       const cssW = canvas.clientWidth;
//       const cssH = canvas.clientHeight;

//       t += 1;

//       // keep rotation alive (subtle)
//       rotationY += 0.006;
//       rotationX = Math.sin(t * 0.006) * 0.25; // gentle tilt breathing

//       // project
//       for (const n of nodes) {
//         n.rotate(rotationY, rotationX);
//         n.project(cssW, cssH);
//       }

//       // painter order: far first
//       const drawNodes = [...nodes].sort((a, b) => a.scale - b.scale);

//       // clear
//       ctx.clearRect(0, 0, cssW, cssH);

//       // --- EDGES: more visible + glow + alternating dim/pulse ---
//       // Draw glow pass
//       ctx.save();
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";

//       for (let i = 0; i < edges.length; i++) {
//         const e = edges[i];
//         const { from, to } = e;

//         const avgScale = (from.scale + to.scale) * 0.5;
//         if (avgScale < 0.18) continue;

//         // alternating/pulsing brightness
//         const phase = t * 0.02 + i * 0.85;
//         const pulse = (Math.sin(phase) + 1) * 0.5; // 0..1

//         const alpha = 0.12 + pulse * 0.22; // visible
//         const width = (1.2 + pulse * 1.2) * Math.max(0.6, avgScale);

//         // Glow stroke
//         ctx.beginPath();
//         ctx.moveTo(from.sx, from.sy);
//         ctx.lineTo(to.sx, to.sy);

//         ctx.strokeStyle = `rgba(140, 180, 255, ${alpha * 0.55})`;
//         ctx.lineWidth = width * 3.2;

//         ctx.shadowBlur = 18;
//         ctx.shadowColor = `rgba(80, 200, 255, ${alpha})`;
//         ctx.stroke();

//         // Core stroke
//         ctx.beginPath();
//         ctx.moveTo(from.sx, from.sy);
//         ctx.lineTo(to.sx, to.sy);

//         ctx.shadowBlur = 0;
//         ctx.strokeStyle = `rgba(230, 245, 255, ${alpha})`;
//         ctx.lineWidth = width;
//         ctx.stroke();
//       }
//       ctx.restore();

//       // --- NODES: bigger + new colors + glow ---
//       for (const n of drawNodes) {
//         const size = n.baseSize * n.scale;

//         // depth-based alpha
//         const alpha = Math.min(1, Math.max(0.18, (n.scale - 0.18) * 1.15));

//         // color scheme:
//         // home: neon-cyan
//         // others: icy-lavender with depth tint
//         const isHome = n.id === "home";

//         const coreColor = isHome
//           ? `rgba(34, 211, 238, ${0.95 * alpha})`
//           : `rgba(170, 140, 255, ${0.9 * alpha})`;

//         const glowColor = isHome
//           ? `rgba(34, 211, 238, ${0.55 * alpha})`
//           : `rgba(140, 180, 255, ${0.45 * alpha})`;

//         // outer glow blob
//         ctx.save();
//         ctx.beginPath();
//         ctx.arc(n.sx, n.sy, size * 1.65, 0, Math.PI * 2);
//         ctx.fillStyle = glowColor;
//         ctx.shadowBlur = 22;
//         ctx.shadowColor = glowColor;
//         ctx.fill();
//         ctx.restore();

//         // core node
//         ctx.beginPath();
//         ctx.arc(n.sx, n.sy, size, 0, Math.PI * 2);
//         ctx.fillStyle = coreColor;
//         ctx.fill();

//         // label (keep your style: only if close-ish or home)
//         if (n.scale > 0.62 || isHome) {
//           const fontSize = Math.max(10, size * 0.85);
//           ctx.fillStyle = `rgba(255,255,255, ${0.82 * alpha})`;
//           ctx.font = `${isHome ? "bold" : "normal"} ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
//           ctx.textAlign = "center";
//           ctx.textBaseline = "middle";
//           ctx.fillText(n.label, n.sx, n.sy + size + fontSize);
//         }
//       }

//       rafRef.current = requestAnimationFrame(animate);
//     };

//     rafRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [nodes, edges, adjacency, height]);

//   return (
//     <div className="w-full select-none" ref={containerRef}>
//       {/* header + button */}
//       <div className="flex items-center justify-between gap-3 mb-2 px-2">
//         <div className="text-lg font-semibold text-white tracking-wide">
//           SITE <span className="text-cyan-400">MAP</span>
//         </div>

//         {/* ONLY navigation entry point */}
//         <button
//           onClick={() => navigate("/map")}
//           className="px-4 py-2 rounded-xl border border-cyan-500/30 bg-black/30 text-cyan-200/80 text-xs font-mono uppercase tracking-widest hover:bg-cyan-500/10 hover:text-cyan-100 transition-all"
//         >
//           Open full map →
//         </button>
//       </div>

//       <div
//         className="relative w-full bg-black/40 rounded-2xl ring-1 ring-white/10 overflow-hidden"
//         style={{ height }}
//       >
//         {/* Background Grid */}
//         <div
//           className="absolute inset-0 opacity-20 pointer-events-none"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)",
//             backgroundSize: "40px 40px",
//             transform: "perspective(500px) rotateX(60deg) translateY(100px) scale(2)",
//           }}
//         />

//         <canvas ref={canvasRef} className="block w-full h-full relative z-10" />
//       </div>
//     </div>
//   );
// }