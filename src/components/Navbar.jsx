"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {data:session, pending} = useSession()

  const user = session?.user
  // console.log(session)
  // console.log(session, "session data from nav")
 
  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
  ];

  const signOutHandler = async () => {
    await signOut();
  }

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
            {user ? (
              <>
                Hi, {user.name}
                <Button onClick={signOutHandler} variant="danger">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500"
                >
                  Get Started
                </Link>
              </>
            )}
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
        <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10 bg-black/75 p-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 mb-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-white/75 px-3 py-2.5 rounded-lg hover:bg-white/8 hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="h-px bg-white/10 mb-4" />

          {user ? (
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-sm font-medium text-white">
                  {user.name?.charAt(0)}
                </div>
                <span className="text-sm font-medium text-white/85">
                  {user.name}
                </span>
              </div>
              <button
                onClick={signOutHandler}
                className="text-sm text-red-400/85 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/15 transition"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/signin"
                className="text-sm font-medium text-violet-400 px-3 py-2.5 rounded-lg border border-violet-400/25 text-center hover:bg-violet-400/8 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold text-white bg-violet-600 px-3 py-3 rounded-lg text-center hover:bg-violet-700 transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
