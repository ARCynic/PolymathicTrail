import logo2 from "../assets/logo_forest.png";
import logos from "../assets/logo_simsea.png";
import log from "../assets/loooo.png"
import poker from "../assets/poker01.png"
import satire from "../assets/stamp_satire.png"
/**
 * @typedef {"text"|"image"|"contact"} SneakpeekVariant
 *
 * @typedef {Object} SneakpeekItem
 * @property {string} id
 * @property {SneakpeekVariant} variant
 * @property {string} title
 * @property {string} summary
 * @property {string[]} [tags]
 * @property {string} [img]          // only for image/contact cards
 * @property {number} height         // layout hint for Masonry
 * @property {string} [to]           // internal route (ONLY if you want click navigation)
 * @property {string} [glare]        // optional preset key if you want different glare styles later
 */

/** @type {SneakpeekItem[]} */
export const RESEARCH_SNEAKPEEK = [
  {
    id: "r_dels_regulation",
    variant: "text",
    title: "Regulation Architecture (DELS)",
    summary:
      "Exploring how constraints, incentives, and enforcement can be modeled as legible systems—without losing human nuance.",
    tags: ["systems", "governance", "modeling"],
    height: 520,
  },
  {
    id: "r_multi_agent",
    variant: "text",
    title: "Multi-Agent Dynamics",
    summary:
      "Studying coordination, conflict, and emergent behavior in agent swarms—especially where incentives don’t align.",
    tags: ["agents", "emergence", "simulation"],
    height: 560,
  },
  {
    id: "r_tools_attention",
    variant: "text",
    title: "Ergonomics of Attention",
    summary:
      "How interfaces shape decision-making under load—and how to design tools that stay calm under complexity.",
    tags: ["ux", "cognition", "decision-making"],
    height: 500,
  },
  {
    id: "r_learning_feedback",
    variant: "text",
    title: "Feedback Loops in Learning",
    summary:
      "What makes feedback feel helpful instead of punitive—timing, framing, and the cost of being wrong.",
    tags: ["learning", "feedback", "behavior"],
    height: 540,
  },
  {
    id: "r_myth_fact",
    variant: "text",
    title: "Myth vs Fact: Pattern Recognition",
    summary:
      "A small framework for analyzing how people classify claims—biases, speed/accuracy tradeoffs, and domain effects.",
    tags: ["myth", "truth", "analytics"],
    height: 520,
  },

];

/** @type {SneakpeekItem[]} */
export const CREATIVE_SNEAKPEEK = [
  {
    id: "c_simsea_arcade",
    variant: "image",
    title: "Simulation Sea",
    summary:
      "Small simulations and assessments—designed as calm interfaces with strange edges.",
    tags: ["games", "simulation", "web"],
    img: logos,
    height: 760,
    href: "", // optional: only if you want click navigation later
    glare: "ice",
  },
  {
    id: "c_journey_chords",
    variant: "image",
    title: "Journey Chords",
    summary:
      "A tour planner for bands—routing, costs, constraints, and sanity checks without the noise.",
    tags: ["product", "planning", "tools"],
    img: log,
    href: "",
    height: 700,
    glare: "soft",
  },

  {
    id: "c_cognitive_forest",
    variant: "image",
    title: "Cognitive Forest",
    summary:
      "Short writings and small tools about attention, bias, meaning, and modern life.",
    tags: ["Cognition", "Projection", "Paradox"],
    img: logo2,
    href: "",
    height: 680,
    glare: "soft",
  },
    {
    id: "c_sirius_pokerbot",
    variant: "image",
    title: "Sirius PokerBot",
    summary:
      "Decision logic + table dynamics—an experiment in strategy, uncertainty, and readable reasoning.",
    tags: ["ai", "game", "strategy"],
    img: poker,
    href: "",
    height: 720,
    glare: "ice",
  },
  {
    id: "c_satirical_theatre",
    variant: "image",
    title: "Satirical Theatre",
    summary:
      "Short scenes that expose incentives, status, and institutional nonsense.",
    tags: ["Bias", "Hypocrisy", "Denial"],
    img: satire,
    href: "",
    height: 740,
    glare: "ice",
  },

  // CONTACT CARD (in-grid, image card, internal route)
];

export const SNEAKPEEK = {
  research: RESEARCH_SNEAKPEEK,
  creative: CREATIVE_SNEAKPEEK,
};

export default SNEAKPEEK;