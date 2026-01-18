import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-transparent text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-screen-2xl px-4 pb-16 pt-3 sm:pt-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}