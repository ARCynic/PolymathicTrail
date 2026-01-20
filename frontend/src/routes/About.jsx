import React, { useMemo, useState } from "react";

import Navbar from "../components/Layout/Navbar.jsx";
import Footer from "../components/Layout/Footer.jsx";

import { LiquidChrome } from "../components/effects/LiquidChrome.jsx";
import ElectricBorder from "../components/UI/ElectricBorder.jsx";
import Card from "../components/UI/Card.jsx";
import Tag from "../components/UI/Tag.jsx";
import Button from "../components/UI/Button.jsx";

const cx = (...c) => c.filter(Boolean).join(" ");

function Panel({ children, className = "" }) {
  return (
    <ElectricBorder
      color="#9dd9fcff"
      speed={0.45}
      chaos={0.12}
      thickness={0.9}
      className={cx("rounded-[28px]", className)}
    >
      <div className="rounded-[28px] bg-black/40 backdrop-blur-md ring-1 ring-white/10">
        {children}
      </div>
    </ElectricBorder>
  );
}

function FieldLabel({ children }) {
  return <div className="text-[12px] font-medium text-white/55">{children}</div>;
}

function InputBase({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={cx(
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80 outline-none",
        "placeholder:text-white/30 focus:border-cyan-300/30 focus:ring-2 focus:ring-cyan-300/10",
        className
      )}
    />
  );
}

function SelectBase({ className = "", children, ...props }) {
  return (
    <select
      {...props}
      className={cx(
        "w-full appearance-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80 outline-none",
        "focus:border-cyan-300/30 focus:ring-2 focus:ring-cyan-300/10",
        className
      )}
    >
      {children}
    </select>
  );
}

function TextareaBase({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={cx(
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80 outline-none",
        "placeholder:text-white/30 focus:border-cyan-300/30 focus:ring-2 focus:ring-cyan-300/10",
        className
      )}
    />
  );
}

export default function About() {
  // --- Contact form backend-ready setup (same as CogForest) ---
  const [topic, setTopic] = useState("Feedback");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const SUBMISSIONS_ENABLED = false;

  const API_BASE = import.meta.env.VITE_API_BASE || "https://api.mydomain.tld";
  const CONTACT_ENDPOINT = `${API_BASE.replace(/\/$/, "")}/contact`;

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const tooShort = msg.trim().length > 0 && msg.trim().length < 10;

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`[Polymathic Trail] ${topic}`);
    const body = encodeURIComponent(
      `Topic: ${topic}\nName: ${name || "(not provided)"}\nEmail: ${
        email || "(not provided)"
      }\n\nMessage:\n${msg || "(empty)"}\n`
    );
    return `mailto:contact@polymathictrail.org?subject=${subject}&body=${body}`;
  }, [topic, name, email, msg]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!SUBMISSIONS_ENABLED) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const payload = {
        email: email || "",
        name: name || "",
        subject: topic,
        message: msg || "",
      };

      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Request failed (${res.status})`);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong.");
    }
  }
  // -----------------------------------------------------------

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <LiquidChrome
          baseColor={[0.0, 0.01, 0.01]}
          speed={0.1}
          amplitude={0.3}
          frequencyX={3}
          frequencyY={2}
          interactive={false}
          className="h-full w-full"
        />
      </div>

      {/* Contrast overlay */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px circle at 20% -10%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(900px circle at 90% 10%, rgba(124,92,255,0.10), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.60), rgba(0,0,0,0.75))",
        }}
      />

      <Navbar />

      <main className="relative z-10">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="pt-8 sm:pt-10">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              About ARCynic & Polymathic Trail
            </h1>
          </div>

          {/* About Panel */}
          <Panel className="mt-6">
            <div className="px-5 py-7 sm:px-8 sm:py-9">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  About ARCynic
                </h2>

                {/* small icon pill (decorative) */}
                <div className="shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
                  ᯓ★
                </div>
              </div>

              <div className="mt-4 space-y-4 text-sm sm:text-[15px] leading-relaxed text-white/70">
                <p>
                  “ARCynic” is an autodidact who prefers to learn by taking key
                  ideas apart and rebuilding them, examining both the technical
                  mechanisms and the human dynamics involved.
                </p>

                <p>
                  His work grows out of long-term close observation—sometimes
                  from inside systems, sometimes from outside them, often in
                  solitude. His background includes science, programming,
                  self-directed research, and years of practical teaching:
                  tutoring students, experimenting with AI tools, building small
                  simulations, and exploring how music, language, and emotion
                  interact.
                </p>

                <p>
                  His projects often involve cross-domain synthesis, moving
                  between technical systems and human behavior. Some focus on
                  translating long-term observations into models and concrete
                  implementations. Other projects remain open-ended. These
                  include a self-directed approach to learning multiple
                  instruments through melody, rhythm, and groove, along with
                  short written fragments that grow out of sustained observation
                  and imagination.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  About Polymathic Trail ..•°જ⁀➴
                </h2>

                <div className="mt-4 space-y-4 text-sm sm:text-[15px] leading-relaxed text-white/70">
                  <p>
                    This site makes ARCynic’s observations public, so other
                    self-directed learners can reason with them, test them, or
                    borrow whatever perspectives they find useful.
                  </p>

                  <p>
                    The site can be read as a working notebook, a lab, a
                    library—or maybe a rehearsal room. It brings together
                    independent research, simulations, code experiments, music
                    sketches, language-learning ideas, and short philosophical
                    pieces around a shared question:
                  </p>

                  <p className="text-white/85">
                    How do complex systems learn, adapt, and break?
                  </p>

                  <p>
                    The focus is on feedback-driven systems: humans,
                    organisations, AI models, education systems. The domains
                    differ, but the recurring issues are similar—load,
                    regulation, drift, failure, and recovery. The aim is to
                    collect those recurring structures and turn them into
                    something usable: conceptual frameworks, interactive tools,
                    and small, concrete examples.
                  </p>

                  <p>
                    If something here sparks your interest or overlaps with
                    questions you’re already working through—whether to learn
                    more, contribute, or collaborate—reach out via the{" "}
                    <a
                      href="#contact"
                      className="text-cyan-300/90 hover:text-cyan-200 underline underline-offset-4"
                    >
                      Contact form
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </Panel>

          {/* Research & Practice */}
          <Panel className="mt-6">
            <div className="px-5 py-6 sm:px-8 sm:py-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                Research & Practice
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {[
                  "Systems Architecture",
                  "Cybernetics",
                  "AI & Tooling",
                  "Teaching & Writing",
                  "Music & Art",
                  "Games & Simulation",
                ].map((label) => (
                  <Tag key={label} tone="cyan" size="sm" className="text-base sm:text-lg">
                    {label}
                  </Tag>
                ))}
              </div>
            </div>
          </Panel>

          {/* Now / Next */}
          <Panel className="mt-6">
            <div className="px-5 py-7 sm:px-8 sm:py-9">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Now / Next
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-base font-semibold text-white">Now</h3>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    <li className="flex gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/25" />
                      <span>Prototyping Journey Chords - A tour planner for Bands.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/25" />
                      <span>Writing short creative essays.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/25" />
                      <span>Prototyping Sirius PokerBot</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-white">Next</h3>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    <li className="flex gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/25" />
                      <span>Formalising Architecture of Regulation using DELS.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/25" />
                      <span>Multi Agent System Implementation.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/25" />
                      <span>Prototype of German Language AI Tutor.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Panel>

          {/* Contact */}
          <div id="contact" className="pt-2" />
          <div className="mt-10">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Contact
            </h2>
          </div>

          <Panel className="mt-5 mb-10">
            <div className="px-5 py-7 sm:px-8 sm:py-9">
              <p className="text-sm sm:text-base font-semibold text-white/90">
                You can use this form if you’re working on related projects, stuck
                on a systems / cognition / learning problem, or just want a
                perspective on something in this space—whether it’s feedback,
                questions, collaborations, or simply to send a note.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <FieldLabel>Topic</FieldLabel>
                    <SelectBase value={topic} onChange={(e) => setTopic(e.target.value)}>
                      <option>Feedback</option>
                      <option>Question</option>
                      <option>Collaboration</option>
                      <option>Other</option>
                    </SelectBase>
                  </div>

                  <div className="grid gap-2">
                    <FieldLabel>Name</FieldLabel>
                    <InputBase
                      placeholder="Optional"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <FieldLabel>Email</FieldLabel>
                  <InputBase
                    placeholder="Optional (so I can reply)"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <FieldLabel>Message</FieldLabel>
                  <TextareaBase
                    placeholder="Write your message..."
                    rows={7}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                  <div className="text-xs text-white/35">
                    (Minimum 10 characters.)
                    {tooShort ? <span className="ml-2 text-rose-300/80">Too short.</span> : null}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-white/40">
                    Submission via form is currently disabled. Please hit "Email instead" to contact for the time being.
                    {status === "error" ? (
                      <span className="ml-2 text-rose-300/90">{errorMsg}</span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="secondary" href={mailtoHref} className="rounded-xl px-6">
                      Email instead
                    </Button>

                    <Button variant="secondary" disabled className="rounded-xl px-6">
                      {status === "submitting" ? "Sending…" : "Send"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Panel>
        </div>
      </main>

      <Footer />
    </div>
  );
}