import React, { useEffect, useMemo, useState } from "react";

import LiquidChrome from "../components/effects/LiquidChrome.jsx";
import Card from "../components/UI/Card.jsx";
import Tag from "../components/UI/Tag.jsx";

export default function About() {
  const [topic, setTopic] = useState("Feedback");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Formspree endpoint (REPLACE with your real form id)
  const FORMSPREE_ENDPOINT = useMemo(
    () => "https://formspree.io/f/YOUR_FORMSPREE_ID",
    []
  );

  const canSend = message.trim().length >= 10;

  // ✅ inline status message (auto hides after 5s)
  const [status, setStatus] = useState(null); // { type: "success"|"error", text: string }
  const [isSending, setIsSending] = useState(false);
  const CHROME_OPACITY = 0.25;
  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 5000);
    return () => clearTimeout(t);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend || isSending) return;

    const safeTopic = topic || "Message";
    const safeName = name.trim() || "Anonymous";
    const safeEmail = email.trim() || "";

    // Formspree: send fields + optional subject
    const payload = {
      topic: safeTopic,
      name: safeName,
      email: safeEmail,
      message: message.trim(),
      _subject: `[SimSea] ${safeTopic} — ${safeName}`,
    };

    try {
      setIsSending(true);
      setStatus(null);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errText = "There was an issue sending your feedback.";
        try {
          const data = await res.json();
          if (data?.errors?.[0]?.message) errText = data.errors[0].message;
        } catch {
          // ignore json parse errors
        }
        setStatus({ type: "error", text: errText });
        return;
      }

      setStatus({ type: "success", text: "Your feedback is sent." });
      setMessage(""); // keep topic/name/email intact
    } catch {
      setStatus({
        type: "error",
        text: "There was an issue sending your feedback.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen">
      {/* Fullscreen Ether background (About only) */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div style={{
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

          {/* Readability overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.80), rgba(0,0,0,0.30), rgba(0,0,0,0.85))",
            }}
          />
        </div>
      </div>

      {/* Page content (forced above Ether) */}
      <div className="relative z-10 mx-auto max-w-6xl space-y-8 pt-2 pb-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            About this Site and the Owner.
          </h1>
        </header>

        <Card
          className="bg-black/30 text-white backdrop-blur"
          borderColor="#46b6f7"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                About this site
              </h2>
            </div>
            <Tag className="bg-white/5 text-white/80">ᯓ★</Tag>
          </div>
          <div className="mt-3 space-y-3 text-white/75">
            <p>
              This site is a working notebook. It sits somewhere between a lab,
              a library, and a rehearsal room. It brings together independent
              research, simulations, code experiments, music sketches,
              language-learning ideas, and short philosophical pieces around a
              shared question:
            </p>
            <p>How do complex systems learn, adapt, and break?</p>
            <p>
              The focus is on feedback-driven systems: humans, organisations, AI
              models, education systems. The domains differ, but the recurring
              issues are similar—load, regulation, drift, failure, and recovery.
              The aim here is to collect those recurring structures and turn
              them into something usable: conceptual frameworks, interactive
              tools, and small, concrete examples.
            </p>
          </div>
          <br></br>
          <h2 className="text-lg font-semibold text-white">About ARCynic</h2>
          <div className="mt-3 space-y-3 text-white/75">
            <p>
              I tend to learn by taking systems apart and then trying to rebuild
              them—from both the technical side and the human side.
            </p>
            <p>
              My background is a mix of maths, programming, self-directed
              research, and years of practical teaching: tutoring students,
              experimenting with AI tools, building small simulations, and
              exploring how music, language, and cognition interact. Most of
              what I do cuts across domains on purpose. I’m less interested in
              staying within one discipline than in tracking patterns that
              repeat.
            </p>
            <p>
              This site is a way to make that process visible. Some projects are
              closer to formal research (for example, the dynamic-equilibrium
              framework and coupled-agent simulations). Others are more
              exploratory (music-as-regulation sketches, short fables, or
              satirical pieces about institutions). Together they trace how
              ideas move from intuition, to sketch, to model, to implementation.
            </p>
            <p>
              If you find anything here useful—as a researcher, developer,
              teacher, musician, or just a curious reader—you’re welcome to
              borrow it, adapt it, or build on it. The material will change over
              time as projects evolve; it’s intended to remain in motion rather
              than finished.
            </p>
          </div>
        </Card>

        <Card
          className="bg-black/30 text-white backdrop-blur"
          borderColor="rgba(70, 182, 247, 0)"
        >
          <h2 className="text-lg font-semibold text-white">Creative Domains</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Systems Architecture",
              "AI & Tooling",
              "Teaching / writing",
              "Cybernetics",
              "Music & Art",
              "Games & Simulation",
            ].map((t) => (
              <Tag key={t} className="bg-white/5 text-white/80">
                {t}
              </Tag>
            ))}
          </div>
        </Card>

        <Card
          className="bg-black/30 text-white backdrop-blur"
          borderColor="rgba(70, 182, 247, 0)"
        >
          <h2 className="text-lg font-semibold text-white">Now / Next</h2>
          <div className="mt-3 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-white/90">Now</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-white/70">
                <li>Protoyping Journey Chords- A tour planner for Bands.</li>
                <li>Writing short creative essays.</li>
                <li>Prototyping Sirius PokerBot</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">Next</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-white/70">
                <li>Formalising Architechture of Regulation using DELS.</li>
                <li>Multi Agent System Implementation.</li>
                <li>Prototype of German Language AI Tutor.</li>
              </ul>
            </div>
          </div>
        </Card>

        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Contact
          </h1>
        </header>

        {/* CONTACT */}
        <Card className="bg-black/30 text-white backdrop-blur">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Feedback, questions, collaborations—send a note.
              </h2>
            </div>
            <Tag className="bg-white/5 text-white/80">📝</Tag>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-xs font-semibold tracking-wide text-white/70">
                  Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-11 rounded-xl bg-black/40 px-4 text-white/85 ring-1 ring-white/10 outline-none focus:ring-white/20"
                >
                  <option>Feedback</option>
                  <option>Question</option>
                  <option>Bug</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-semibold tracking-wide text-white/70">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-xl bg-black/40 px-4 text-white/85 ring-1 ring-white/10 outline-none focus:ring-white/20"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-xs font-semibold tracking-wide text-white/70">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl bg-black/40 px-4 text-white/85 ring-1 ring-white/10 outline-none focus:ring-white/20"
                placeholder="Optional (so I can reply)"
                type="email"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-xs font-semibold tracking-wide text-white/70">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] rounded-xl bg-black/40 p-4 text-white/85 ring-1 ring-white/10 outline-none focus:ring-white/20"
                placeholder="Write your message…"
              />
              <p className="text-xs text-white/50">
                (Minimum 10 characters.)
              </p>
            </div>

            {/* ✅ status card (auto hides after 5 seconds) */}
            {status && (
              <div
                className={[
                  "rounded-xl px-4 py-3 text-sm font-mono ring-1",
                  status.type === "success"
                    ? "bg-emerald-500/10 text-emerald-200 ring-emerald-400/20"
                    : "bg-rose-500/10 text-rose-200 ring-rose-400/20",
                ].join(" ")}
              >
                {status.text}
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-white/50">
                {isSending
                  ? "Sending…"
                  : "Sends via Formspree (no redirect)."}
              </p>

              <button
                type="submit"
                disabled={!canSend || isSending}
                className={[
                  "h-11 rounded-xl px-5 text-sm font-semibold",
                  "bg-white/10 text-white/85 ring-1 ring-white/10",
                  "hover:bg-white/15 hover:ring-white/20 transition",
                  !canSend || isSending
                    ? "opacity-50 cursor-not-allowed"
                    : "",
                ].join(" ")}
              >
                {isSending ? "Sending" : "Send"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}