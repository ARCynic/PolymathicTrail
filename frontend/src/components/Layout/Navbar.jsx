import React, { useMemo, useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logoUrl from "../../assets/logo.png";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const styles = {
    shell: "bg-black/60 ring-1 ring-white/10 backdrop-blur",
    pillBase: "bg-white/5 text-white ring-1 ring-white/10",
    pillHover: "hover:bg-cyan-300 hover:text-black hover:ring-cyan-200/30",
    pillActive: "bg-cyan-300 text-black ring-1 ring-cyan-200/30",
  };

  // Use `to` for internal routes, `href` for external URLs.
  const items = useMemo(
    () => [
      { label: "Home", to: "/", end: true },

      // Examples: switch these to real external URLs when ready
      { label: "Research Space", href: "" },
      { label: "Cognitive Forest", href: "https://cogforest.polymathictrail.space" },
      { label: "Learning Hub", href: "" },
      { label: "Simulation Sea", href: "" },

      // internal
      { label: "About", to: "/about" },
    ],
    []
  );

useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <header className="relative">
      {/* Spacer so content doesn't hide under absolute navbar */}
      {/* <div className="h-16 sm:h-34" aria-hidden="true" /> */}

      {/* Navbar band */}
      <div className="relative z-50 pt-4">
        <nav className="flex w-full items-center justify-between px-4 sm:px-8">
          {/* LEFT: brand */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              aria-label="Trailhead"
              className={cx(
  "group inline-flex items-center justify-center",
  "h-16 w-16 rounded-2xl",
  "bg-transparent",
  "transition"
              )}
            >
<img
  src={logoUrl}
  alt="Polymathic Trail"
  className={cx(
    "h-14 w-14 object-contain transition",
    "group-hover:scale-[1.24]",
    "drop-shadow-[0_0_10px_rgba(34,211,238,0.85)]",
    "group-hover:drop-shadow-[0_0_18px_rgba(34,211,238,0.95)]"
  )}
/>
            </Link>

            <div className="flex flex-col leading-tight">
              <span className="text-3xl font-semibold tracking-tight text-white leading-none">
                Polymathic Trail
              </span>

              <span className="mt-2 text-[12px] uppercase tracking-[0.22em] text-cyan-300/75">
                Research · Learning · Art & Music
              </span>
            </div>
          </div>

          {/* RIGHT: desktop pills */}
          <div className="hidden lg:flex items-center">
            <div className={cx("flex items-center rounded-full p-1", styles.shell)}>
              <ul className="flex items-stretch gap-1">
                {items.map((item) => (
                  <li key={item.to ?? item.href ?? item.label} className="flex">
                    <PillLink item={item} styles={styles} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile button */}
          {/* Mobile button */}
            <button
              className={cx(
                "lg:hidden inline-flex items-center justify-center",
                "p-2", // no fixed box size
                "bg-transparent ring-0 shadow-none", // no box
                "transition"
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-[7px]">
                <span
                  className={cx(
                    "h-[3px] w-8 rounded-full transition", // thicker + wider
                    "bg-cyan-200/95",
                    "shadow-[0_0_10px_rgba(34,211,238,0.55),0_0_22px_rgba(34,211,238,0.20)]"
                  )}
                  style={mobileOpen ? { transform: "translateY(10px) rotate(45deg)" } : undefined}
                />
                <span
                  className={cx(
                    "h-[3px] w-8 rounded-full transition",
                    "bg-cyan-200/95",
                    "shadow-[0_0_10px_rgba(34,211,238,0.55),0_0_22px_rgba(34,211,238,0.20)]"
                  )}
                  style={mobileOpen ? { opacity: 0 } : undefined}
                />
                <span
                  className={cx(
                    "h-[3px] w-8 rounded-full transition",
                    "bg-cyan-200/95",
                    "shadow-[0_0_10px_rgba(34,211,238,0.55),0_0_22px_rgba(34,211,238,0.20)]"
                  )}
                  style={mobileOpen ? { transform: "translateY(-10px) rotate(-45deg)" } : undefined}
                />
              </div>
            </button>
        </nav>

        {/* Mobile popover */}
        {mobileOpen ? (
  <div className="lg:hidden mx-auto mt-3 max-w-6xl px-4 sm:px-6">
    <div className="rounded-3xl p-2 bg-black/70 ring-1 ring-white/10 backdrop-blur shadow-[0_16px_60px_rgba(0,0,0,0.55)]">
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={`m-${item.to ?? item.href ?? item.label}`}>
            <MobileLink item={item} styles={styles} />
          </li>
        ))}
      </ul>
    </div>
  </div>
) : null}
      </div>
    </header>
  );
}

/** Desktop pill: internal uses NavLink, external uses <a> (same tab). */
function PillLink({ item, styles }) {
  const base = cx(
    "group relative inline-flex items-center justify-center",
    "h-12 px-4 rounded-full",
    "text-[14px] font-bold uppercase tracking-[0.10em]",
    "transition",
    cx(styles.pillBase, styles.pillHover)
  );

  const active = cx(
    "group relative inline-flex items-center justify-center",
    "h-12 px-4 rounded-full",
    "text-[14px] font-bold uppercase tracking-[0.10em]",
    "transition",
    styles.pillActive
  );

  const sheen = (
    <span
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-0 rounded-full opacity-0",
        "bg-gradient-to-b from-white/10 to-transparent",
        "transition-opacity group-hover:opacity-100"
      )}
    />
  );

  if (item.to) {
    return (
      <NavLink
        to={item.to}
        end={item.end}
        className={({ isActive }) => (isActive ? active : base)}
      >
        {sheen}
        <span className="relative z-10">{item.label}</span>
      </NavLink>
    );
  }

  // External URL — same tab (no target)
  return (
    <a href={item.href} className={base} rel="noreferrer">
      {sheen}
      <span className="relative z-10">{item.label}</span>
    </a>
  );
}

/** Mobile list version */
function MobileLink({ item, styles }) {
  const cls = (isActive) =>
    cx(
      "block rounded-2xl px-4 py-3",
      "text-sm font-bold uppercase tracking-[0.10em]",
      "transition",
      isActive ? styles.pillActive : cx(styles.pillBase, styles.pillHover)
    );

  if (item.to) {
    return (
      <NavLink to={item.to} end={item.end} className={({ isActive }) => cls(isActive)}>
        {item.label}
      </NavLink>
    );
  }

  return (
    <a href={item.href} className={cls(false)} rel="noreferrer">
      {item.label}
    </a>
  );
}