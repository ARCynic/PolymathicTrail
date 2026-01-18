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
    () => "",
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
            About ARCynic & Polymathic Trail
          </h1>
        </header>

        <Card
          className="bg-black/30 text-white backdrop-blur"
          borderColor="#46b6f7"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                About ARCynic
              </h2>
            </div>
            <Tag className="bg-white/5 text-white/80">ᯓ★</Tag>
          </div>
          <div className="mt-3 space-y-3 text-white/75">
            <p>
              “ARCynic” is an autodidact who prefers to learn by taking key ideas apart and rebuilding them, examining both the technical mechanisms and the human dynamics involved.
            </p>
            <p>
              His work grows out of long-term close observation—sometimes from inside systems, sometimes from outside them, often in solitude. His background includes science, programming, self-directed research, and years of practical teaching: tutoring students, experimenting with AI tools, building small simulations, and exploring how music, language, and emotion interact.
            </p>
            <p>
              His projects often involve cross-domain synthesis, moving between technical systems and human behavior. Some focus on translating long-term observations into models and concrete implementations. Other projects remain open-ended. These include a self-directed approach to learning multiple instruments through melody, rhythm, and groove, along with short written fragments that grow out of sustained observation and imagination.
            </p>
          </div>
          <br></br>
          <h2 className="text-lg font-semibold text-white">About Polymathic Trail</h2>
          <div className="mt-3 space-y-3 text-white/75">
            <p>
              This site makes ARCynic’s observations public, so other self-directed learners can reason with them, test them, or borrow whatever perspectives they find useful.
            </p>
            <p>
              The site can be read as a working notebook, a lab, a library—or maybe a rehearsal room. It brings together independent
              research, simulations, code experiments, music sketches,
              language-learning ideas, and short philosophical pieces around a
              shared question:
            </p>
            <p>How do complex systems learn, adapt, and break?</p>
            <p>
              The focus is on feedback-driven systems: humans, organisations, AI
              models, education systems. The domains differ, but the recurring
              issues are similar—load, regulation, drift, failure, and recovery.
              The aim is to collect those recurring structures and turn them into something usable: conceptual frameworks, interactive tools, and small, concrete examples.
            </p>
            <p>
              If something here sparks your interest or overlaps with questions you’re already working through—whether to learn more, contribute, or collaborate—reach out via the{' '}
              <a 
                href="#contact" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline decoration-cyan-300/50 underline-offset-4"
              >
                Contact form
              </a>.
            </p>
          </div>
        </Card>

        <Card
          className="bg-black/30 text-white backdrop-blur"
          borderColor="rgba(70, 182, 247, 0)"
        >
          <h2 className="text-3xl font-semibold text-white">Research & Practice</h2>
          <div className="p-2 mt-3 flex flex-wrap gap-2">
            {[
              "Systems Architecture",
              "Cybernetics",
              "AI & Tooling",
              "Teaching & Writing",
              "Music & Art",
              "Games & Simulation",
            ].map((t) => (
              <Tag key={t} className="bg-white/5 text-white/80 text-base md:text-lg">
                {t}
              </Tag>
            ))}
          </div>
        </Card>

        <Card
          className="bg-black/30 text-white backdrop-blur"
          borderColor="rgba(70, 182, 247, 0)"
        >
          <h2 className="text-2xl font-semibold text-white">Now / Next</h2>
          <div className="mt-3 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xl font-semibold text-white/90">Now</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-white/70">
                <li>Protoyping Journey Chords- A tour planner for Bands.</li>
                <li>Writing short creative essays.</li>
                <li>Prototyping Sirius PokerBot</li>
              </ul>
            </div>
            <div>
              <p className="text-xl font-semibold text-white/90">Next</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-white/70">
                <li>Formalising Architechture of Regulation using DELS.</li>
                <li>Multi Agent System Implementation.</li>
                <li>Prototype of German Language AI Tutor.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Added ID here for the link to scroll to */}
        <header id="contact" className="flex space-y-2 scroll-mt-24">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Contact
          </h1>
          
        </header>

        {/* CONTACT */}
        <Card className="bg-black/30 text-white backdrop-blur">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                You can use this form if you’re working on related projects, stuck on a systems / cognition / learning problem, or just want a perspective on something in this space—whether it’s feedback, questions, collaborations, or simply to send a note.
              </h2>
            </div>
            
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