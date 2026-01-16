import React, { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card, { InnerCard } from "../components/UI/Card.jsx";
import Tag from "../components/UI/Tag.jsx";
import { findWorkItem } from "../data/workStatus.js";

const cx = (...c) => c.filter(Boolean).join(" ");

const KIND_LABEL = {
  project: "Project",
  research: "Research",
  writing: "Writing",
};

const STATUS_LABEL = {
  planning: "Planning",
  design: "In Design",
  building: "Under Construction",
};

function prettySlug(slug = "") {
  return slug
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function WorkStatus() {
  const { kind = "project", slug = "" } = useParams();
  const navigate = useNavigate();

  const item = useMemo(() => findWorkItem(kind, slug), [kind, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [kind, slug]);

  const title = item?.title || prettySlug(slug) || "Work In Progress";
  const kindLabel = KIND_LABEL[kind] || "Work";
  const statusLabel = STATUS_LABEL[item?.status] || STATUS_LABEL.design;

  const blurb =
    item?.blurb ||
    "This page is being prepared. A clearer brief, references, and previews will appear here soon.";

  const focus = item?.focus || ["Outline content", "Draft structure", "Prepare first publishable version"];
  const next = item?.next || ["Publish initial update", "Add visuals/examples", "Open for feedback"];

  return (
    <div className="relative z-10 mx-auto max-w-6xl space-y-8 pt-6 pb-24">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="bg-white/5 text-white/80">{kindLabel}</Tag>
          <Tag className="bg-white/5 text-white/80">{statusLabel}</Tag>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-white/70">{blurb}</p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className={cx(
              "inline-flex items-center justify-center rounded-xl",
              "bg-white/5 px-4 py-2",
              "ring-1 ring-white/10",
              "text-sm font-semibold text-white/80",
              "hover:bg-white/10 hover:text-white hover:ring-white/20",
              "transition"
            )}
          >
            ← Back
          </button>

          <Link
            to="/about#contact"
            className={cx(
              "inline-flex items-center justify-center rounded-xl",
              "bg-white/10 px-4 py-2",
              "ring-1 ring-white/10",
              "text-sm font-semibold text-white/85",
              "hover:bg-white/15 hover:text-white hover:ring-white/20",
              "transition"
            )}
          >
            Contact →
          </Link>

          <Link
            to="/collaborate"
            className={cx(
              "inline-flex items-center justify-center rounded-xl",
              "bg-white/5 px-4 py-2",
              "ring-1 ring-white/10",
              "text-sm font-semibold text-white/75",
              "hover:bg-white/10 hover:text-white hover:ring-white/20",
              "transition"
            )}
          >
            Collaborate →
          </Link>
        </div>
      </header>

      <Card className="bg-black/30 text-white backdrop-blur">
        <h2 className="text-lg font-semibold text-white">Current Focus</h2>
        <div className="mt-4 grid gap-3">
          {focus.map((t, i) => (
            <InnerCard key={i} className="text-sm text-white/70">
              {t}
            </InnerCard>
          ))}
        </div>
      </Card>

      <Card className="bg-black/30 text-white backdrop-blur">
        <h2 className="text-lg font-semibold text-white">What’s Next</h2>
        <div className="mt-4 grid gap-3">
          {next.map((t, i) => (
            <InnerCard key={i} className="text-sm text-white/70">
              {t}
            </InnerCard>
          ))}
        </div>
      </Card>
    </div>
  );
}