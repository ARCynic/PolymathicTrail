import React from "react";
import { Routes, Route } from "react-router-dom";
import WorkStatus from "./routes/WorkStatus.jsx";
import Paper from "./routes/Paper.jsx";
import Home2 from "./routes/Home2.jsx";
// import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home2 />} />
{/* <Route path="/home2" element={<Home />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/work/:kind/:slug" element={<WorkStatus />} />
      <Route path="/paper/:id" element={<Paper />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold text-white">404</h1>
      <p className="mt-2 text-white/70">This page doesn’t exist (yet).</p>
    </div>
  );
}