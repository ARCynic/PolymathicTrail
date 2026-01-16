import React from "react";
import { Link } from "react-router-dom";
import logoUrl from "../../assets/logo.svg";

export default function HomeHeaderLockup() {
  return (
    <div
      className="pointer-events-auto absolute left-4 top-4 z-50 flex items-center gap-0 sm:left-0"
      // top-4 ≈ 1rem which matches your navbar "top: 1em"
    >
      <Link to="/" className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/5 p-2">
          <img src={logoUrl} alt="Polymathic Trail" className="h-full w-full" />
        </div>

        <div className="leading-tight">
          <div className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Polymathic Trail
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/70">
            systems · learning · music · tools
          </div>
        </div>
      </Link>
    </div>
  );
}