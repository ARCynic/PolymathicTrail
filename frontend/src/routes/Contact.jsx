import React, { useState } from "react";
import BlurText from "../components/home/BlurText";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import LiquidChrome from "../components/effects/LiquidChrome";
const cx = (...c) => c.filter(Boolean).join(" ");

export default function Contact() {
  const [topic, setTopic] = useState("Feedback");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  // VITE_API_BASE=https://api.mydomain.tld
  const API_BASE = import.meta.env.VITE_API_BASE || "https://echo.polymathictrail.space";
  const CONTACT_ENDPOINT = `${API_BASE.replace(/\/$/, "")}/contact`;

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const tooShort = msg.trim().length > 0 && msg.trim().length < 10;

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus("submitting");
    setErrorMsg("");

    try {
      const payload = {
        email: email || "",
        name: name || "",
        subject: topic, // topic stored as subject in backend
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

  if (status === "success") {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-0 min-h-[calc(100svh-17rem)] flex items-center">
      <section className="w-full">
        <div
          className={cx(
            "rounded-3xl p-6 sm:p-8",
            "bg-black/45 backdrop-blur-md ring-1 ring-white/10",
            "transition",
            "hover:ring-emerald-200/30",
            "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_18px_60px_rgba(16,185,129,0.10)]",
            "text-center"
          )}
        >
          <div className="flex justify-center">
          <BlurText
            text="Message received!"
            delay={120}
            animateBy="words"
            direction="top"
            className="text-2xl font-semibold tracking-tight text-white"
          />
          </div>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/70">
            Thanks — I’ll read it soon.
          </p>

          <div className="mt-5 flex justify-center">
            <a
              href="/"
              className={cx(
                "inline-flex items-center justify-center rounded-xl px-5 py-3",
                "text-sm font-bold uppercase tracking-[0.10em]",
                "bg-gradient-to-r from-cyan-300 to-emerald-300 text-black",
                "ring-1 ring-emerald-200/40",
                "transition hover:brightness-110"
              )}
            >
              Back to home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

 const sendDisabled = status === "submitting" || tooShort || msg.trim().length === 0;

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
    
          {/* Vignette / contrast overlay */}
          <div
            className="pointer-events-none fixed inset-0 -z-10"
            style={{
              background:
                "radial-gradient(1200px circle at 20% -10%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(900px circle at 90% 10%, rgba(124,92,255,0.10), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.60), rgba(0,0,0,0.75))",
            }}
          />
    
          <Navbar />
    
          <main className="relative z-10">
            {/* Outer container with extra X padding so cards never touch edges */}
            <div className="mx-auto w-full max-w-5xl px-2 sm:px-0">
        
      {/* Page header card */}
      <section className="mt-2">
        <div
          className={cx(
            "rounded-3xl p-6 sm:p-8",
            "bg-black/45 backdrop-blur-md ring-1 ring-white/10",
            "transition",
            "hover:ring-emerald-200/30",
            "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_18px_60px_rgba(16,185,129,0.10)]"
          )}
        >
          <div className="flex justify-center">
            <BlurText
              text="Contact"
              delay={120}
              animateBy="words"
              direction="top"
              className="text-2xl font-semibold tracking-tight text-white"
            />
          </div>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/70 text-center">
          You can use this form if you’re working on related projects, stuck
                on a systems / cognition / learning problem, or just want a
                perspective on something in this space—whether it’s feedback,
                questions, collaborations, or simply to send a note. Feedback is how people (and projects) get less wrong over time. It can shape what I might do next.
          </p>
        </div>
      </section>

      {/* Form card */}
      <section className="mt-6">
        <div className="rounded-3xl bg-black/60 ring-1 ring-white/10 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-[12px] font-medium text-white/55">Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={cx(
                    "w-full appearance-none rounded-xl border border-white/10 bg-black/30 px-4 py-3",
                    "text-sm text-white/80 outline-none",
                    "focus:border-emerald-200/30 focus:ring-2 focus:ring-emerald-200/10"
                  )}
                >
                  <option>Feedback</option>
                  <option>Question</option>
                  <option>Collaboration</option>
                  <option>Note</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-[12px] font-medium text-white/55">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Optional"
                  className={cx(
                    "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3",
                    "text-sm text-white/80 outline-none placeholder:text-white/30",
                    "focus:border-emerald-200/30 focus:ring-2 focus:ring-emerald-200/10"
                  )}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-[12px] font-medium text-white/55">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Optional (so I can reply)"
                type="email"
                className={cx(
                  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3",
                  "text-sm text-white/80 outline-none placeholder:text-white/30",
                  "focus:border-emerald-200/30 focus:ring-2 focus:ring-emerald-200/10"
                )}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-[12px] font-medium text-white/55">Message</label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Write your message..."
                rows={7}
                className={cx(
                  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3",
                  "text-sm text-white/80 outline-none placeholder:text-white/30",
                  "focus:border-emerald-200/30 focus:ring-2 focus:ring-emerald-200/10"
                )}
              />
              <div className="text-xs text-white/40">
                (Minimum 10 characters.)
                {tooShort ? <span className="ml-2 text-rose-300/80">Too short.</span> : null}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
              <div className="text-xs text-white/45">
                {/* kept layout, removed mailto instructions */}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={sendDisabled}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-5 py-3",
                    "text-sm font-bold uppercase tracking-[0.10em]",
                    "bg-gradient-to-r from-cyan-300 to-emerald-300 text-black",
                    "ring-1 ring-emerald-200/40",
                    "transition",
                    // Hover behavior changed here:
                    // - instead of brightness tweak, use subtle lift + stronger ring/shadow
                    !sendDisabled && "hover:-translate-y-[1px] hover:shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_18px_60px_rgba(16,185,129,0.16)] hover:ring-emerald-200/60",
                    sendDisabled && "opacity-60 cursor-not-allowed"
                  )}
                  title={
                        status === "submitting"
                          ? "Sending…"
                          : (msg.trim().length === 0 || tooShort)
                            ? "Message must be at least 10 characters."
                            : "Send"
                      }
                >
                  {status === "submitting" ? "Sending…" : "Send"}
                </button>
              </div>
            </div>

            {status === "error" ? (
              <div className="text-sm text-rose-300/90">
                {errorMsg || "Something went wrong. Try again later."}
              </div>
            ) : null}
          </form>
        </div>
      </section>

      <div className="h-4" />
    </div>
          </main>
    
          <Footer />
        </div>
  );
}