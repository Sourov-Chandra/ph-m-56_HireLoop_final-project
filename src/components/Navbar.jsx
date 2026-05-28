"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars, Xmark } from "@gravity-ui/icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    // <header className="sticky top-0 z-50 px-4 py-4 mx-10 black rounded-2xl">
    <header className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-xl border-b border-white/10">
      {/* <nav className="mx-auto px-16 flex items-center"> */}
      <nav className="mx-auto flex items-center px-16 py-4">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center text-3xl font-extrabold tracking-tight"
        >
          <span className="text-blue-500">hire</span>

          <div className="relative mx-1 flex items-center">
            <span className="h-4 w-4 rounded-full bg-orange-500"></span>
            <span className="-ml-1 h-4 w-4 rounded-full bg-yellow-400"></span>
          </div>

          <span className="text-orange-500">p</span>
        </Link>

        {/* RIGHT MENU WRAPPER (PILL CONTAINER) */}
        <div className="ml-auto hidden md:flex">
          <div className="flex items-center gap-4">
            {/* NAV LINKS */}
            <div className="flex items-center gap-8 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-white/70 transition hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="h-5 w-px bg-white/10" />

            {/* AUTH */}
            <Link
              href="/login"
              className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto text-white md:hidden"
        >
          {isOpen ? (
            <Xmark className="h-7 w-7" />
          ) : (
            <Bars className="h-7 w-7" />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            <div className="my-2 h-px bg-white/10" />

            <Link href="/login" className="text-sm font-medium text-violet-400">
              Sign In
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-violet-600 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
