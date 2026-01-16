// src/data/workStatus.js
// Lightweight “status page” lookup used by /work/:kind/:slug

export const WORK_ITEMS = [
  // --- Research ---
  {
    kind: "research",
    slug: "r_dels_regulation",
    title: "Regulation Architecture (DELS)",
    status: "design", // "planning" | "design" | "building"
    blurb:
      "This research page is being drafted and structured. A concise brief and references will appear here soon.",
    focus: ["Define scope + vocabulary", "Collect references + citations", "Draft the first public note"],
    next: ["Add diagrams + examples", "Publish initial write-up", "Open for review/feedback"],
  },
  {
    kind: "research",
    slug: "journey_chords",
    title: "Journey Chords",
    status: "planning",
    blurb:
      "A route planner that simulates tours day-by-day using constraints (sleep, max consecutive shows, travel limits) and tracks fatigue, risk hotspots, and profit vs survivability. Currently outlining the questions and experiments to run. Early notes are being organized.",
    focus: ["Frame hypotheses", "Choose environments/sim setups", "Decide evaluation metrics"],
    next: ["Run initial experiments", "Write summary notes", "Create visualizations"],
  },

  // --- Projects / Creative ---
  {
    kind: "project",
    slug: "sirius_pokerbot",
    title: "Sirius PokerBot",
    status: "building",
    blurb:
      "Active build. The experience is evolving—structure is stable, content and polish are in progress.",
    focus: ["Expand content library", "Improve interpretations", "Add visual assets (stamps/thumbnails)"],
    next: ["Collaboration hooks", "Better progression", "Public release checklist"],
  },
    {
    kind: "project",
    slug: "deep_sea_exploration",
    title: "Deep Sea Exploration",
    status: "building",
    blurb:
      "Active build. The experience is evolving—structure is stable, content and polish are in progress.",
    focus: ["Expand content library", "Improve interpretations", "Add visual assets (stamps/thumbnails)"],
    next: ["Collaboration hooks", "Better progression", "Public release checklist"],
  },
      {
    kind: "project",
    slug: "ecosystem_gen",
    title: "Ecosystem Gen",
    status: "building",
    blurb:
      "Active build. The experience is evolving—structure is stable, content and polish are in progress.",
    focus: ["Expand content library", "Improve interpretations", "Add visual assets (stamps/thumbnails)"],
    next: ["Collaboration hooks", "Better progression", "Public release checklist"],
  },

  // --- Writing (optional examples) ---
  {
    kind: "writing",
    slug: "w_short_essays",
    title: "Short Essays",
    status: "design",
    blurb:
      "A small collection is being curated. The page will include excerpts and a clean reading flow.",
    focus: ["Select pieces", "Edit for clarity", "Decide layout + cadence"],
    next: ["Publish first batch", "Add series navigation", "Invite comments"],
  },
];

export function findWorkItem(kind, slug) {
  return WORK_ITEMS.find((x) => x.kind === kind && x.slug === slug) || null;
}