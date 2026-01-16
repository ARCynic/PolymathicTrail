import React from "react";
import { Link } from "react-router-dom";

const cx = (...c) => c.filter(Boolean).join(" ");

// 1. Extracted CTA Component
const CardCta = ({ ctaLabel, linkKind, to, href }) => {
  if (!(typeof ctaLabel === "string" && ctaLabel.trim().length > 0))
    return null;

  const baseClasses =
    "inline-flex items-center justify-center rounded-xl bg-white/8 px-4 py-2 ring-2 ring-white/10 text-xs font-bold uppercase tracking-[0.22em] text-white/80 hover:bg-white/12 hover:text-white hover:ring-white/60 transition";

  if (linkKind === "internal") {
    return (
      <Link to={to} className={baseClasses}>
        {ctaLabel}
      </Link>
    );
  }

  if (linkKind === "external") {
    return (
      <a href={href} className={baseClasses} rel="noreferrer">
        {ctaLabel}
      </a>
    );
  }

  // disabled/no-link state
  return (
    <span
      className={cx(
        "inline-flex items-center justify-center rounded-xl",
        "bg-white/5 px-4 py-2",
        "ring-2 ring-white/10",
        "text-xs font-bold uppercase tracking-[0.22em]",
        "text-white/35"
      )}
    >
      {ctaLabel}
    </span>
  );
};

// 2. Extracted Wrapper Component
const CardWrapper = ({ linkKind, to, href, children }) => {
  if (linkKind === "internal")
    return (
      <Link to={to} className="block">
        {children}
      </Link>
    );
  if (linkKind === "external")
    return (
      <a href={href} className="block" rel="noreferrer">
        {children}
      </a>
    );
  return <>{children}</>;
};

export default function SneakPeekCard({
  title,
  summary,
  tags = [],
  img,

  // internal
  to,
  // external (same tab)
  href,

  ctaLabel,
  hoverLine,
  variant = "creative",
  className = "",
}) {
  const overlayText =
    hoverLine ||
    (tags?.length
      ? tags.slice(0, 3).join("  •  ")
      : "Run generation  •  Compare outputs  •  Iterate");

  const isResearch = variant === "research";
  const hasLeftPane = !isResearch && Boolean(img);

  // prefer href if provided; otherwise use to
  const linkKind = href ? "external" : to ? "internal" : "none";

  return (
    <article
      className={cx(
        "group/sneak relative block overflow-hidden rounded-[22px]",
        "ring-1 ring-white/10 bg-black/35 backdrop-blur-md",
        "transition-transform duration-300 ease-out hover:-translate-y-[2px]",
        "hover:ring-cyan-300/25 hover:shadow-[0_20px_70px_-30px_rgba(34,211,238,0.35)]",
        className
      )}
    >
      <CardWrapper linkKind={linkKind} to={to} href={href}>
        {/* subtle outer glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/sneak:opacity-100"
          style={{
            background:
              "radial-gradient(800px circle at 70% -10%, rgba(34,211,238,0.18), transparent 55%)",
          }}
        />

        <div
          className={cx(
            "relative grid",
            hasLeftPane
              ? "grid-cols-1 md:grid-cols-[1.25fr_0.95fr]"
              : "grid-cols-1"
          )}
        >
          {hasLeftPane ? (
            <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[220px]">
              <div className="absolute inset-0">
                <img
                  src={img}
                  alt=""
                  draggable={false}
                  className={cx(
                    "h-full w-full object-contain",
                    "transition duration-500 ease-out",
                    "group-hover/sneak:scale-[1.04]"
                  )}
                />
              </div>

              <div
                aria-hidden="true"
                className={cx(
                  "absolute inset-0 transition-opacity duration-300",
                  "bg-gradient-to-br from-black/70 via-black/30 to-black/20",
                  "opacity-0 group-hover/sneak:opacity-100"
                )}
              />

              <div
                aria-hidden="true"
                className={cx(
                  "pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300",
                  "group-hover/sneak:opacity-100"
                )}
                style={{
                  background:
                    "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.10) 45%, transparent 55%)",
                  transform: "rotate(8deg)",
                }}
              />

              <div
                className={cx(
                  "absolute inset-x-6 top-1/2 -translate-y-1/2",
                  "text-cyan-200/80 font-semibold tracking-[0.18em] uppercase",
                  "text-[11px] sm:text-xs",
                  "opacity-0 translate-y-2 transition duration-300",
                  "group-hover/sneak:opacity-100 group-hover/sneak:translate-y-0"
                )}
              >
                {overlayText}
              </div>
            </div>
          ) : null}

          <div
            className={cx(
              "relative",
              hasLeftPane
                ? "border-t border-white/10 md:border-t-0 md:border-l md:border-white/10"
                : ""
            )}
          >
            <div className="flex h-full flex-col justify-center p-6 sm:p-7">
              <h3
                className={cx(
                  "text-2xl sm:text-[28px] font-semibold tracking-tight",
                  "text-white transition-colors duration-300",
                  "group-hover/sneak:text-cyan-200"
                )}
              >
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/65 max-w-prose">
                {summary}
              </p>

              <div className="mt-3">
                <CardCta
                  ctaLabel={ctaLabel}
                  linkKind={linkKind}
                  to={to}
                  href={href}
                />
              </div>
            </div>
          </div>
        </div>
      </CardWrapper>
    </article>
  );
}