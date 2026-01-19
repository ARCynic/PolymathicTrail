import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Card from "../components/UI/Card.jsx";
import { RESEARCH_SNEAKPEEK } from "../data/sneakpeek.js";
import Navbar from "../components/Layout/Navbar.jsx";
import Footer from "../components/Layout/Footer.jsx";

export default function Paper() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = useMemo(() => {
    if (!id) return null;
    return RESEARCH_SNEAKPEEK.find((x) => String(x.id) === String(id)) || null;
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const onClose = () => {
    // prefer back if you came from Home; otherwise go Home
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="relative min-h-screen">
      <Navbar/>
      {/* Page heading */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-3 sm:pt-3">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white/90">
          {item ? item.title : "Paper"}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-white/55">
          Research Space · Polymathic Trail
        </p>
        <div className="mt-0 flex justify-end">
            <button 
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/80 hover:bg-white/12 hover:text-white ring-2 ring-white/10 hover:ring-white/60 transition"
              aria-label="Close"
            >
              Close
            </button></div>
      </div>
      

      {/* Main panel */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 pt-6">
        <Card className="p-0" borderColor="#00e5ffe7">
          <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/10">
            <div className="min-w-0">
              {item?.summary ? (
                <p className="mt-1 text-xl text-white/60">{item.summary}</p>
              ) : null}

              {item?.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/70 ring-1 ring-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            
          </div>

          <div className="p-5 sm:p-6">
            {item?.detailRead ? (
              <div className="whitespace-pre-wrap text-white/75 leading-relaxed">
                {item.detailRead}
              </div>
            ) : (
              <div className="text-white/65">
                <p className="font-semibold text-white/80">No paper found</p>
                <p className="mt-2">
                  This research sneak peek doesn’t have a <code>detailRead</code>{" "}
                  yet, or the id is invalid.
                </p>
                <div className="mt-4">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 ring-1 ring-white/10 hover:ring-white/20 transition"
                  >
                    Go Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Card>
        <div className="mt-8 flex justify-center">
            <button 
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/80 hover:bg-white/12 hover:text-white ring-2 ring-white/10 hover:ring-white/60 transition"
              aria-label="Close"
            >
              Close
            </button></div>
        
      </div>
      <Footer />
    </div>
  );
}