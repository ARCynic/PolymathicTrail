import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WorkStatus from "./routes/WorkStatus.jsx";

import Layout from "./components/Layout/layout.jsx";

import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
export default function App() {
  return (
    <Routes>



    
      {/* Global layout routes */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/work/:kind/:slug" element={<WorkStatus />} />


      </Route>

      {/* ✅ put NotFound at top-level */}
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