import React, { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Layout/Navbar.jsx";
import Footer from "../components/Layout/Footer.jsx";
import Threads from "../components/effects/Threads.jsx";
import ElectricBorder from "../components/UI/ElectricBorder.jsx";
import Card from "../components/UI/Card.jsx";
import Button from "../components/UI/Button.jsx";

import SneakPeekCard from "../components/home/SneakPeekCard.jsx";

import { QUOTES } from "../data/quotes.js";
import { RESEARCH_SNEAKPEEK, CREATIVE_SNEAKPEEK } from "../data/sneakpeek.js";

const cx = (...c) => c.filter(Boolean).join(" ");
const THREADS_COLOR = [0.2, 1.0, 0.9];
function Panel({ children, className = "" }) {
  return (
    <ElectricBorder
      color="#9dd9fcff"
      speed={0.45}
      chaos={0.12}
      thickness={0.9}
      className={cx("rounded-[28px]", className)}
    >
      <div className="rounded-[28px] bg-black/30 backdrop-blur-sm ring-2 ring-white/10">
        {children}
      </div>
    </ElectricBorder>
  );
}

export default function Home2() {
  // Quote rotation (every 20s)
  const safeQuotes = useMemo(() => (Array.isArray(QUOTES) ? QUOTES : []), []);

  // initialize randomly without setState in an effect
  const [quoteIndex, setQuoteIndex] = useState(() =>
    safeQuotes.length ? Math.floor(Math.random() * safeQuotes.length) : 0
  );

  useEffect(() => {
  if (!safeQuotes.length) return;

  const id = window.setInterval(() => {
    setQuoteIndex((prev) => {
      if (safeQuotes.length === 1) return 0;

      let next = prev;
      while (next === prev) {
        next = Math.floor(Math.random() * safeQuotes.length);
      }
      return next;
    });
  }, 20000);

  return () => window.clearInterval(id);
}, [safeQuotes.length]);

  const q = safeQuotes[quoteIndex] || { text: "", author: "" };

  const researchItems = Array.isArray(RESEARCH_SNEAKPEEK) ? RESEARCH_SNEAKPEEK : [];
  const creativeItems = Array.isArray(CREATIVE_SNEAKPEEK) ? CREATIVE_SNEAKPEEK : [];

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <Threads
  color={THREADS_COLOR}   // cyan/green tint; adjust later
  amplitude={1.2}
  distance={0.2}
  enableMouseInteraction={false}
/>
      </div>

      {/* Vignette / contrast overlay */}
      {/* <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px circle at 20% -10%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(900px circle at 90% 10%, rgba(124,92,255,0.10), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.60), rgba(0,0,0,0.75))",
        }}
      /> */}

      <Navbar />

      <main className="relative z-10">
        {/* Outer container with extra X padding so cards never touch edges */}
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          {/* HERO */}
          <Panel className="mt-4">
            <div className="px-5 py-8 sm:px-8 sm:py-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                {/* Left */}
                <div className="max-w-2xl">
                  <p className="text-base sm:text-lg leading-relaxed text-white/75">
                    Polymathic Trail is a personal lab for exploring philosophy,
                    cognition, art, and music through independent research,
                    simulations, and creative practice in AI, education, and sound.
                  </p>

                  <div className="mt-6">
                    <Button to="/about" variant="primary" className="rounded-full px-6">
                      Learn More
                    </Button>
                  </div>
                </div>

                {/* Right: Quote card */}
                <div className="lg:pl-10">
                  <Card className="max-w-xl lg:ml-auto">
                    <div className="text-white/80">
                      <p className="text-sm sm:text-base leading-relaxed">
                        “{q.text}”
                      </p>
                      <div className="mt-2 h-px w-full bg-white/10" />
                      <p className="mt-1 text-xs sm:text-sm text-white/55">
                        — {q.author}
                      </p>

                      {/* subtle hint */}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Panel>

          {/* RESEARCH SNEAK PEEKS */}
          <Panel className="mt-6">
            <div className="px-5 py-7 sm:px-8 sm:py-9">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Research Sneak Peeks
                </h2>
                <p className="text-sm text-white/55">
                  Visit Research Space for detailed reads.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {researchItems.map((item) => (
                  <SneakPeekCard
                    key={item.id}
                    variant="research"
                    title={item.title}
                    summary={item.summary}
                    tags={item.tags}
                    // NOTE: if/when you wire Paper.jsx to this id, this becomes live.
                    // Until then, the CTA still renders and the card looks correct.
                    to={`/paper/${item.id}`}
                    ctaLabel="OVERVIEW"
                  />
                ))}
              </div>
            </div>
          </Panel>

          {/* CREATIVE SNEAK PEEKS */}
          <Panel className="mt-6">
            <div className="px-5 py-7 sm:px-8 sm:py-9">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Creative Sneak Peeks
                </h2>
                <p className="text-sm text-white/55">Click to visit.</p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                {creativeItems.map((item) => (
                  <SneakPeekCard
                    key={item.id}
                    variant="creative"
                    title={item.title}
                    summary={item.summary}
                    tags={item.tags}
                    img={item.img}
                    href={item.href || undefined}
                    ctaLabel={item.href ? "VISIT" : "COMING SOON!"}
                    hoverLine={item.tags?.length ? item.tags.slice(0, 3).join("  •  ") : undefined}
                  />
                ))}
              </div>
            </div>
          </Panel>

          {/* CONTACT */}
          <Panel className="mt-6 mb-10">
            <div className="px-5 py-7 sm:px-8 sm:py-9">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Contact</h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                <Card className="h-full">
                  <h3 className="text-base font-semibold text-white">General</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Thoughtful feedback and questions matter, they refine the work and help me
                    keep learning and improving.
                  </p>

                  <div className="mt-5">
                    <Button variant="secondary" to="/contact" className="rounded-xl">
                      Go to contact form
                    </Button>
                  </div>
                </Card>

                <Card className="h-full">
                  <h3 className="text-base font-semibold text-white">Collaborate</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Collaboration can help deliver real outcomes, by combining effort, trust,
                    and long-term care on ecological projects.
                  </p>

                  <div className="mt-5">
                    <Button variant="secondary" href="" className="rounded-xl">
                      Coming Soon!
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </Panel>
        </div>
      </main>

      <Footer />
    </div>
  );
}