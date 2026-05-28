import Link from "next/link";

import { LogoFacebook, LogoPinterest, LogoLinkedin } from "@gravity-ui/icons";
import { RiPinterestLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* LEFT */}
        <div className="space-y-8">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center text-4xl font-extrabold tracking-tight"
          >
            <span className="text-blue-500">hire</span>

            {/* oo */}
            <div className="relative mx-1 flex items-center">
              <span className="h-5 w-5 rounded-full bg-orange-500"></span>

              <span className="-ml-1 h-5 w-5 rounded-full bg-yellow-400"></span>
            </div>

            <span className="text-orange-500">p</span>
          </Link>

          {/* DESCRIPTION */}
          <p className="max-w-sm text-base leading-8 text-white/35">
            The AI-native career platform. Built for people who take their work
            seriously.
          </p>

          {/* SOCIALS */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/60 transition hover:bg-violet-600 hover:text-white"
            >
              <LogoFacebook className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/60 transition hover:bg-violet-600 hover:text-white"
            >
              <RiPinterestLine className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/60 transition hover:bg-violet-600 hover:text-white"
            >
              <LogoLinkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* PRODUCT */}
        <div>
          <h3 className="mb-6 text-lg font-semibold text-violet-400">
            Product
          </h3>

          <div className="flex flex-col gap-4">
            <Link
              href="/jobs"
              className="text-white/40 transition hover:text-white"
            >
              Job discovery
            </Link>

            <Link
              href="/ai"
              className="text-white/40 transition hover:text-white"
            >
              Worker AI
            </Link>

            <Link
              href="/companies"
              className="text-white/40 transition hover:text-white"
            >
              Companies
            </Link>

            <Link
              href="/salary"
              className="text-white/40 transition hover:text-white"
            >
              Salary data
            </Link>
          </div>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="mb-6 text-lg font-semibold text-violet-400">
            Navigations
          </h3>

          <div className="flex flex-col gap-4">
            <Link
              href="/help"
              className="text-white/40 transition hover:text-white"
            >
              Help center
            </Link>

            <Link
              href="/career-library"
              className="text-white/40 transition hover:text-white"
            >
              Career library
            </Link>

            <Link
              href="/contact"
              className="text-white/40 transition hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="mb-6 text-lg font-semibold text-violet-400">
            Resources
          </h3>

          <div className="flex flex-col gap-4">
            <Link
              href="/brand"
              className="text-white/40 transition hover:text-white"
            >
              Brand Guideline
            </Link>

            <Link
              href="/newsroom"
              className="text-white/40 transition hover:text-white"
            >
              Newsroom
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-white/30 md:flex-row">
          <p>Copyright 2026 — Hireloop</p>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="transition hover:text-white">
              Terms & Policy
            </Link>

            <Link href="/privacy" className="transition hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
