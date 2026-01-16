// src/data/sitemap.js
export const SITE_MAP = {
  nodes: [
    { id: "home", label: "Home", to: "/", pos: { x: 0.5, y: 0.5 } },

    { id: "arcade", label: "SimSea", to: "/arcade", pos: { x: 0.82, y: 0.28 } },
    { id: "research", label: "Research", to: "/research", pos: { x: 0.18, y: 0.28 } },
    { id: "work", label: "Work", to: "/work", pos: { x: 0.82, y: 0.72 } },
    { id: "writing", label: "Writing", to: "/writing", pos: { x: 0.18, y: 0.72 } },

    { id: "tool", label: "Tool", to: "/tool", pos: { x: 0.5, y: 0.12 } },
    { id: "about", label: "About", to: "/about", pos: { x: 0.5, y: 0.88 } },
  ],

  edges: [
    { from: "home", to: "arcade" },
    { from: "home", to: "research" },
    { from: "home", to: "work" },
    { from: "home", to: "writing" },
    { from: "home", to: "tool" },
    { from: "home", to: "about" },
  ],
};
