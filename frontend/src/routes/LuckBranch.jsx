// import React, { useMemo, useState } from "react";

// import Navbar from "../components/Layout/Navbar.jsx";
// import Footer from "../components/Layout/Footer.jsx";

// import { LiquidChrome } from "../components/effects/LiquidChrome.jsx";
// import ElectricBorder from "../components/UI/ElectricBorder.jsx";
// import Card from "../components/UI/Card.jsx";
// import Button from "../components/UI/Button.jsx";

// const cx = (...c) => c.filter(Boolean).join(" ");

// function Panel({ children, className = "" }) {
//   return (
//     <ElectricBorder
//       color="#9dd9fcff"
//       speed={0.45}
//       chaos={0.12}
//       thickness={0.9}
//       className={cx("rounded-[28px]", className)}
//     >
//       <div className="rounded-[28px] bg-black/40 backdrop-blur-md ring-1 ring-white/10">
//         {children}
//       </div>
//     </ElectricBorder>
//   );
// }

// // probability of guessing correctly "depth" times in a row with p=0.5
// function probAtDepth(depth) {
//   // 2^-depth
//   return Math.pow(0.5, depth);
// }

// export default function LuckBranch() {
//   // path items: each step stores player's choice + correct bit + result
//   // step: { choice: 0|1, correct: 0|1, ok: boolean }
//   const [steps, setSteps] = useState([]);
//   const [done, setDone] = useState(false);

//   const depth = useMemo(() => steps.filter((s) => s.ok).length, [steps]);
//   const total = steps.length;
//   const accuracy = total ? Math.round((steps.filter((s) => s.ok).length / total) * 100) : 0;

//   const probability = probAtDepth(depth);

//   function restart() {
//     setSteps([]);
//     setDone(false);
//   }

//   function guess(choice) {
//     if (done) return;

//     const correct = Math.random() < 0.5 ? 0 : 1;
//     const ok = choice === correct;

//     setSteps((prev) => [...prev, { choice, correct, ok }]);
//     if (!ok) setDone(true);
//   }

//   // Layout metrics for drawing
//   const svg = useMemo(() => {
//     const w = 720; // viewBox width
//     const h = Math.max(260, 120 + steps.length * 90);
//     const cx0 = w / 2;
//     const top = 40;

//     const nodes = [{ x: cx0, y: top }]; // node 0 root
//     const lines = [];

//     const dxBase = 80; // horizontal spread
//     const dy = 40;

//     for (let i = 0; i < steps.length; i++) {
//       const parent = nodes[i];
//       const s = steps[i];

//       // branch direction based on player's guess (left=0, right=1)
//       const dir = s.choice === 0 ? -1 : 1;

//       // spread reduces slightly as it gets deeper so it doesn't fly off-screen
//       const dx = Math.max(70, dxBase - i * 14);

//       const child = { x: parent.x + dir * dx, y: parent.y + dy };
//       nodes.push(child);

//       lines.push({
//         x1: parent.x,
//         y1: parent.y,
//         x2: child.x,
//         y2: child.y,
//         ok: s.ok,
//         i,
//       });
//     }

//     return { w, h, nodes, lines };
//   }, [steps]);

//   return (
//     <div className="relative min-h-screen text-white">
//       {/* Background */}
//       <div className="fixed inset-0 -z-20">
//         <LiquidChrome
//           baseColor={[0.0, 0.01, 0.01]}
//           speed={0.1}
//           amplitude={0.3}
//           frequencyX={3}
//           frequencyY={2}
//           interactive={false}
//           className="h-full w-full"
//         />
//       </div>

//       {/* Contrast overlay */}
//       <div
//         className="pointer-events-none fixed inset-0 -z-10"
//         style={{
//           background:
//             "radial-gradient(1200px circle at 20% -10%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(900px circle at 90% 10%, rgba(124,92,255,0.10), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.60), rgba(0,0,0,0.75))",
//         }}
//       />

//       <Navbar />

//       <main className="relative z-10">
//         <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
//           <div className="pt-8 sm:pt-10">
//             <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
//               Luck Branch
//             </h1>
//             <p className="mt-2 max-w-3xl text-sm sm:text-base leading-relaxed text-white/70">
//               A tiny branching game: each step is a 50/50 guess. Pick left or right. Correct keeps you going
//               (green). Wrong ends the run (red).
//             </p>
//           </div>

//           <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
//             {/* Tree panel */}
//             <Panel>
//               <div className="px-5 py-6 sm:px-8 sm:py-8">
//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h2 className="text-lg sm:text-xl font-semibold text-white">Your Branch</h2>
//                     <p className="mt-1 text-sm text-white/55">
//                       Current depth: <span className="text-white/80">{depth}</span>
//                     </p>
//                   </div>

//                   <div className="flex gap-3">
//                     <Button
//                       variant="secondary"
//                       className="rounded-xl px-5"
//                       onClick={() => guess(0)}
//                       disabled={done}
//                     >
//                       Left
//                     </Button>
//                     <Button
//                       variant="secondary"
//                       className="rounded-xl px-5"
//                       onClick={() => guess(1)}
//                       disabled={done}
//                     >
//                       Right
//                     </Button>
//                     <Button variant="ghost" className="rounded-xl px-5" onClick={restart}>
//                       Restart
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
//                   <div className="p-4 sm:p-6">
//                     <svg
//                       viewBox={`0 0 ${svg.w} ${svg.h}`}
//                       className="h-[320px] w-full sm:h-[420px]"
//                       role="img"
//                       aria-label="Branching tree"
//                     >
//                       {/* glow defs */}
//                       <defs>
//                         <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
//                           <feGaussianBlur stdDeviation="3" result="blur" />
//                           <feMerge>
//                             <feMergeNode in="blur" />
//                             <feMergeNode in="SourceGraphic" />
//                           </feMerge>
//                         </filter>
//                         <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
//                           <feGaussianBlur stdDeviation="3" result="blur" />
//                           <feMerge>
//                             <feMergeNode in="blur" />
//                             <feMergeNode in="SourceGraphic" />
//                           </feMerge>
//                         </filter>
//                       </defs>

//                       {/* baseline faint */}
//                       <rect x="0" y="0" width={svg.w} height={svg.h} fill="transparent" />

//                       {/* edges */}
//                       {svg.lines.map((ln) => (
//                         <line
//                           key={ln.i}
//                           x1={ln.x1}
//                           y1={ln.y1}
//                           x2={ln.x2}
//                           y2={ln.y2}
//                           stroke={ln.ok ? "rgba(34,211,238,0.9)" : "rgba(248,113,113,0.95)"}
//                           strokeWidth="6"
//                           strokeLinecap="round"
//                           filter={ln.ok ? "url(#glowGreen)" : "url(#glowRed)"}
//                           opacity="0.95"
//                         />
//                       ))}

//                       {/* nodes */}
//                       {svg.nodes.map((n, idx) => {
//                         const isLast = idx === svg.nodes.length - 1;
//                         const endedHere = done && isLast;
//                         const okSoFar = idx === 0 ? true : steps[idx - 1]?.ok;

//                         const fill = idx === 0
//                           ? "rgba(255,255,255,0.85)"
//                           : endedHere
//                           ? "rgba(248,113,113,0.95)"
//                           : okSoFar
//                           ? "rgba(34,211,238,0.95)"
//                           : "rgba(255,255,255,0.7)";

//                         return (
//                           <circle
//                             key={idx}
//                             cx={n.x}
//                             cy={n.y}
//                             r={idx === 0 ? 10 : 9}
//                             fill={fill}
//                             opacity="0.95"
//                           />
//                         );
//                       })}
//                     </svg>

//                     {done ? (
//                       <div className="mt-4 text-sm text-white/70">
//                         Run ended. You reached depth <span className="text-white/85">{depth}</span>.
//                       </div>
//                     ) : (
//                       <div className="mt-4 text-sm text-white/55">
//                         Choose left or right to continue.
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Panel>

//             {/* Stats */}
//             <div className="grid gap-6">
//               <Card>
//                 <h3 className="text-base font-semibold text-white">Stats</h3>
//                 <div className="mt-4 grid gap-3 text-sm text-white/70">
//                   <div className="flex items-center justify-between">
//                     <span>Correct streak (depth)</span>
//                     <span className="text-white/85">{depth}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span>Total guesses</span>
//                     <span className="text-white/85">{total}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span>Accuracy</span>
//                     <span className="text-white/85">{accuracy}%</span>
//                   </div>
//                   <div className="h-px w-full bg-white/10" />
//                   <div className="flex items-center justify-between">
//                     <span>Probability you’d reach this depth</span>
//                     <span className="text-white/85">
//                       {depth === 0 ? "1 in 1" : `1 in ${2 ** depth}`}
//                     </span>
//                   </div>
//                 </div>

//                 <p className="mt-4 text-xs leading-relaxed text-white/45">
//                   Probability shown is for guessing correctly <em>{depth}</em> times in a row with a fair 50/50 branch.
//                 </p>
//               </Card>

//               <Card>
//                 <h3 className="text-base font-semibold text-white">History</h3>
//                 <div className="mt-4 space-y-2 text-sm text-white/70">
//                   {steps.length === 0 ? (
//                     <div className="text-white/45">No steps yet.</div>
//                   ) : (
//                     steps.map((s, i) => (
//                       <div key={i} className="flex items-center justify-between">
//                         <span>
//                           Step {i + 1}: chose {s.choice === 0 ? "Left" : "Right"}
//                         </span>
//                         <span className={s.ok ? "text-cyan-200" : "text-rose-300"}>
//                           {s.ok ? "Correct" : `Wrong (was ${s.correct === 0 ? "Left" : "Right"})`}
//                         </span>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </Card>
//             </div>
//           </div>

//           <div className="h-12" />
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }