// import React from "react";
// import { Link } from "react-router-dom";
// import SplitText from "../animations/SplitText.jsx";
// import logoUrl from "../../assets/logo.svg";

// export default function Hero() {
//   return (
//     <section className="relative mt-0">
//       <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur sm:p-10">
//         {/* Lockup */}
//         <div className="flex items-center gap-5">
//           {/* Bigger logo mark */}
//           <div className="h-16 w-16 rounded-2xl border border-white/10 bg-black/40 p-3 sm:h-20 sm:w-20 sm:p-4">
//             <img src={logoUrl} alt="Polymathic Trail mark" className="h-full w-full" />
//           </div>

//           <div className="min-w-0">
//             {/* Wordmark in SplitText */}
//             <SplitText
//               as="h1"
//               text="Polymathic Trail"
//               mode="chars"
//               staggerMs={22}
//               delayMs={60}
//               className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
//             />

//             {/* ✅ give the tagline breathing room (you had mt-0) */}
//             <div className="mt-2 text-xs uppercase tracking-[0.22em] text-cyan-200/80">
//               systems · learning · music · tools
//             </div>
//           </div>
//         </div>

//         {/* Intro manifesto */}
//         {/* ✅ this was mt-0; give it spacing so layout doesn't look broken */}
//         <div className="mt-6 max-w-2xl space-y-4">
//           <p className="text-sm leading-relaxed text-white/80 sm:text-base">
//             I build systems that think about systems—across AI, cognition, music, and learning—using
//             feedback, regulation, and pattern analysis to understand how things hold together, drift,
//             or break. My work moves between theory and implementation, from abstract frameworks to
//             concrete tools, tutors, and simulations that test those ideas.
//           </p>

//           <div className="flex flex-wrap gap-3 pt-2">
//             <Link
//               to="/map"
//               className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-white hover:bg-cyan-400/15"
//             >
//               Enter the Trail Map →
//             </Link>
//             <Link
//               to="/projects"
//               className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
//             >
//               Browse Builds
//             </Link>
//             <Link
//               to="/blog"
//               className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
//             >
//               Read Field Notes
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }