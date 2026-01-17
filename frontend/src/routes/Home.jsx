import React, { useMemo, useEffect, useState } from "react";
import QUOTES from "../data/quotes.js";
import { Link } from "react-router-dom";

import Card from "../components/UI/Card.jsx"; // ✅ MISSING IMPORT (this was breaking the page)

import LiquidChrome from "../components/effects/LiquidChrome.jsx";

import { RESEARCH_SNEAKPEEK, CREATIVE_SNEAKPEEK } from "../data/sneakpeek.js";
import SneakPeekCard from "../components/home/SneakPeekCard.jsx";
function nextRandomIndex(current, len) {
  if (len <= 1) return current;
  let n = current;
  while (n === current) n = Math.floor(Math.random() * len);
  return n;
}
export default function Home() {
  const [quoteIdx, setQuoteIdx] = useState(() =>
  QUOTES.length ? Math.floor(Math.random() * QUOTES.length) : 0
);
const CHROME_OPACITY = 0.35;
useEffect(() => {
  if (!QUOTES?.length) return;
  const id = setInterval(() => {
    setQuoteIdx((prev) => nextRandomIndex(prev, QUOTES.length));
  }, 20000);
  return () => clearInterval(id);
}, []);
  return (
    <div className="relative min-h-screen -mt-0 sm:-mt-0">
      {/* Fullscreen Ether (Home only) - unchanged */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0
        }}
        aria-hidden="true"
      >
        <div
  style={{
    position: "relative",
    width: "100%",
    height: "100%",
    opacity: CHROME_OPACITY,
  }}
>
  <LiquidChrome
    baseColor={[0.0, 0.01, 0.01]}
    speed={0.1}
    amplitude={0.3}
    interactive={true}
  />
</div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.80), rgba(0,0,0,0.30), rgba(0,0,0,0.85))"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 grid gap-1 lg:grid-cols-[1fr_1px]">
        <div className="space-y-2">
          {/* Intro + Quote (same panel) */}
          <Card className="p-2" borderColor="#1f1a17ff">
            <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-8 pl-4 sm:pl-8 py-2">
                <p className="max-w-2xl text-balance leading-relaxed text-white/75 sm:text-xl">
                  Polymathic Trail is a personal lab for exploring philosophy, cognition, art, and music through independent research, simulations, and creative practice in AI, education, and sound.
                </p>

                <div className="flex flex-wrap justify-left gap-8">
                  <ActionLink to="/about">Learn More</ActionLink>
                </div>
              </div>

              <div className="flex items-start lg:items-center">
                <Card borderColor="rgba(160, 190, 194, 0.48)">
                  <blockquote className="max-w-md text-sm text-lg leading-snug text-white/80 sm:text-base">
                    <span className="text-cyan-200/80">“</span>
                    {QUOTES?.[quoteIdx]?.text}
                    <span className="text-cyan-200/80">”</span>
                    <footer className="mt-1 text-sm text-white/50">
                      — ({QUOTES?.[quoteIdx]?.author})
                    </footer>
                  </blockquote>
                </Card>
              </div>
            </div>
          </Card>
          
          {/* Highlights + (Counter+Feedback) inline only when >= 500px */}
          <div className="grid gap-2 ">
            {/* Highlights (kept separate) */}
            <Card className="p-6">
              <HighlightsPreview />
            </Card>

            {/* Right side: counter + feedback stacked, so heights match */}
            <div className="grid gap-2">
              <Card className="p-6" borderColor = "#385566ff">
                <TrailCounter />
              </Card>

              <Card className="p-6" borderColor = "#1a0a27ff">
                <FeedbackPanel />
              </Card>
            </div>
          </div>
        </div>

        {/* Right rail (unchanged) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 h-[calc(100vh-2rem)] rounded-3xl bg-white/2" />
        </aside>
      </div>
    </div>
  );
}

/* -------------------- Panels -------------------- */

function HighlightsPreview() {
  const items = useMemo(() => RESEARCH_SNEAKPEEK.slice(0, 6), []);

  return (
    <div className="flex flex-col">
      <div className="flex items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">Research Sneak Peeks</h2>
          <p className="mt-0 text-sm text-white/65">Visit Research Space for detailed reads.</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 grid-cols-1 md:grid-cols-3">
        {items.map((it) => (
          <SneakPeekCard
            key={it.id}
            variant="research"
            title={it.title}
            summary={it.summary}
            tags={it.tags}
            // no img for research
            // ctaLabel="Details at Research Space"
            // no `to` (hover-only)
          />
        ))}
      </div>
    </div>
  );
}

function TrailCounter() {
  const items = useMemo(() => CREATIVE_SNEAKPEEK.slice(0, 6), []);

  return (
    <div className="flex flex-col">
      <div className="flex items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">Creative Sneak Peeks</h2>
          <p className="mt-0 text-sm text-white/65">Click to visit.</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 grid-cols-1 md:grid-cols-2">
        {items.map((it) => (
          <SneakPeekCard
            key={it.id}
            variant={it.variant}
            title={it.title}
            summary={it.summary}
            tags={it.tags}
            img={it.img}
            to={it.to}
            ctaLabel="VISIT"
          />
        ))}
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function FeedbackPanel() {
  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-lg font-semibold text-white">Contact</h2>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* General feedback */}
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <p className="text-sm font-semibold text-white/85">General</p>
          <p className="mt-1 text-sm text-white/60">
            Thoughtful feedback and questions matter—they refine the work and help me keep learning and improving.
          </p>

          <div className="mt-4">
            <Link
              to="/about#contact"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 ring-1 ring-white/10 hover:ring-white/20 transition"
            >
              Go to contact form
            </Link>
          </div>
        </div>

        {/* Collaboration */}
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
          <p className="text-sm font-semibold text-white/85">Collaborate</p>
          <p className="mt-1 text-sm text-white/60">
            Collaboration can help deliver real outcomes — by combining effort, trust, and long-term care on ecological projects.
          </p>

          <div className="mt-4">
            <Link
              to="/collaborate"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 ring-1 ring-white/10 hover:ring-white/20 transition"
            >
              Explore collaborations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Primitives -------------------- */

function Surface({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-3xl bg-black/30 backdrop-blur",
        "transition duration-200",
        "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_10px_40px_rgba(255,255,255,0.06)]",
        "hover:bg-black/35",
        className
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function ActionLink({ to, children, subtle = false }) {
  return (
    <Link
      to={to}
      className={[
        "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold",
        subtle
          ? "bg-white/5 text-white hover:bg-white/10"
          : "bg-cyan-400/10 text-white hover:bg-cyan-400/15"
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function SocialDot({ label }) {
  return (
    <button
      type="button"
      onClick={() => console.log(label)}
      className="group inline-flex items-center gap-2"
      aria-label={label}
    >
      <span className="h-10 w-10 rounded-full bg-white/5 transition group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_30px_rgba(255,255,255,0.08)]" />
      <span className="text-xs text-white/50 group-hover:text-white/70">{label}</span>
    </button>
  );
}