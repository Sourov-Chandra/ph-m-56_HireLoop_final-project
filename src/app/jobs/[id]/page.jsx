import { getJobDetails } from "@/lib/api/jobs";
import Image from "next/image";
import Link from "next/link";
import { FaBuildingColumns } from "react-icons/fa6";
import {
  FiArrowLeft,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiBookmark,
  FiGlobe,
  FiCheckCircle,
  FiGift,
} from "react-icons/fi";

function formatSalary(min, max, currency = "usd") {
  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: 0,
    }).format(Number(n));
  return `${fmt(min)} – ${fmt(max)}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/25 whitespace-nowrap mb-3.5">
      {children}
    </span>
  );
}

function MetaCard({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase tracking-wider">
        <Icon size={13} />
        {label}
      </div>
      <p className="text-white font-semibold text-sm leading-snug">{value}</p>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
      <span className="w-1 h-4 rounded-full bg-violet-500 inline-block" />
      {children}
    </h2>
  );
}

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobDetails(id);

  const {
    jobTitle,
    jobCategory,
    jobType,
    deadline,
    description,
    requirements,
    benefits,
    companyName,
    companyLogo,
    location,
    minSalary,
    maxSalary,
    currency,
    createdAt,
    status,
  } = job;

  const isActive = status === "active";
  const deadlinePassed = new Date(deadline) < new Date();

  return (
    <div className="w-full text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Top bar ── */}
        <div className="pt-8 pb-4">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-violet-400 transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            Back to jobs
          </Link>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 pb-16 items-start">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Hero card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  {companyLogo ? (
                    <Image
                      src={companyLogo}
                      alt={companyName}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500">
                      <FaBuildingColumns size={24} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {jobTitle}
                  </h1>
                  <p className="text-violet-400 font-medium mt-0.5 text-sm">
                    {companyName}
                  </p>
                </div>

                <button
                  aria-label="Save job"
                  className="shrink-0 p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all"
                >
                  <FiBookmark size={16} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pb-5">
                <Badge>{capitalize(jobType)}</Badge>
                <Badge>{jobCategory}</Badge>
                {isActive && !deadlinePassed ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Actively hiring
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/25">
                    Closed
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                <MetaCard
                  icon={FiDollarSign}
                  label="Salary"
                  value={formatSalary(minSalary, maxSalary, currency)}
                />
                <MetaCard
                  icon={FiMapPin}
                  label="Location"
                  value={location || "Remote"}
                />
                <MetaCard
                  icon={FiClock}
                  label="Job type"
                  value={capitalize(jobType)}
                />
                <MetaCard
                  icon={FiCalendar}
                  label="Deadline"
                  value={formatDate(deadline)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
              <SectionHeading>Job Description</SectionHeading>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Requirements */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
              <SectionHeading>Requirements</SectionHeading>
              <ul className="flex flex-col gap-2.5">
                {requirements
                  .split(".")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-zinc-300"
                    >
                      <FiCheckCircle
                        className="text-violet-400 shrink-0 mt-0.5"
                        size={15}
                      />
                      {req}.
                    </li>
                  ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
              <SectionHeading>Benefits</SectionHeading>
              <ul className="flex flex-col gap-2.5">
                {benefits
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-zinc-300"
                    >
                      <FiGift
                        className="text-violet-400 shrink-0 mt-0.5"
                        size={15}
                      />
                      {benefit}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-6">
            {/* Apply CTA */}
            <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm p-5 flex flex-col gap-3">
              <p className="text-sm text-zinc-300">
                Interested in this role? Apply before{" "}
                <span className="text-violet-300 font-medium">
                  {formatDate(deadline)}
                </span>
                .
              </p>
              <Link
                href={deadlinePassed ? "#" : `/jobs/${job._id}/apply`}
                className={`w-full py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm transition-colors text-center block
    ${
      deadlinePassed
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "hover:bg-violet-500"
    }`}
                aria-disabled={deadlinePassed}
              >
                {deadlinePassed ? "Applications closed" : "Apply Now"}
              </Link>
              <button className="w-full py-2.5 rounded-xl border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 text-zinc-300 font-medium text-sm transition-all">
                Save for later
              </button>
            </div>

            {/* Company overview */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-violet-500 inline-block" />
                Company Overview
              </h3>

              {companyLogo && (
                <div className="relative w-full h-28 rounded-xl overflow-hidden mb-4 bg-white/5 border border-white/10">
                  <Image
                    src={companyLogo}
                    alt={companyName}
                    fill
                    className="object-contain p-4"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Company</span>
                  <span className="text-white font-medium">{companyName}</span>
                </div>
                <div className="border-t border-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Category</span>
                  <span className="text-white font-medium">{jobCategory}</span>
                </div>
                <div className="border-t border-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Posted</span>
                  <span className="text-white font-medium">
                    {formatDate(createdAt)}
                  </span>
                </div>
              </div>

              <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 text-zinc-300 text-sm font-medium transition-all">
                <FiGlobe size={13} />
                Visit Website
              </button>
            </div>

            <p className="text-xs text-zinc-500 text-center">
              Posted on {formatDate(createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
