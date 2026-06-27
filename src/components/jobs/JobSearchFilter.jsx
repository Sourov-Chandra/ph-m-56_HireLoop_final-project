"use client";

import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiFilter,
  FiX,
  FiClock,
  FiChevronDown,
} from "react-icons/fi";

// ─── helpers ────────────────────────────────────────────────────────────────

const JOB_TYPES = [
  "full-time",
  "part-time",
  "contract",
  "internship",
  "remote",
];
const CATEGORIES = [
  "Development",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
];
const SALARY_RANGES = [
  { label: "Any", min: 0, max: Infinity },
  { label: "< $50k", min: 0, max: 50000 },
  { label: "$50k – $100k", min: 50000, max: 100000 },
  { label: "$100k – $150k", min: 100000, max: 150000 },
  { label: "> $150k", min: 150000, max: Infinity },
];

function daysLeft(deadline) {
  const diff = Math.ceil((new Date(deadline) - Date.now()) / 86400000);
  if (diff < 0) return "Expired";
  if (diff === 0) return "Last day";
  return `${diff}d left`;
}

function formatSalary(min, max, currency) {
  const fmt = (n) => (n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`);
  return `${fmt(+min)} – ${fmt(+max)} ${currency?.toUpperCase() ?? "USD"}`;
}

// ─── sub-components ─────────────────────────────────────────────────────────

function Select({ icon: Icon, value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-4 h-4 pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-sm text-white/80 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 w-3.5 h-3.5 pointer-events-none" />
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-white transition">
        <FiX className="w-3 h-3" />
      </button>
    </span>
  );
}

function JobCard({ job }) {
  const days = daysLeft(job.deadline);
  const expired = days === "Expired";

  return (
    <div className="group relative flex flex-col gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.07] transition-all duration-200">
      {/* header */}
      <div className="flex items-start gap-3">
        <Image
          src={job.companyLogo}
          alt={job.companyName}
          width={40}
          height={40}
          className="rounded-xl object-cover border border-violet-500/20 flex-shrink-0"
        />
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug truncate">
            {job.jobTitle}
          </h3>
          <p className="text-white/50 text-xs mt-0.5">{job.companyName}</p>
        </div>
        <span
          className={`ml-auto text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-medium ${
            expired
              ? "bg-red-500/15 text-red-400 border border-red-500/20"
              : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
          }`}
        >
          {days}
        </span>
      </div>

      {/* tags */}
      <div className="flex flex-wrap gap-2">
        <span className="tag">{job.jobType}</span>
        <span className="tag">{job.jobCategory}</span>
      </div>

      {/* meta */}
      <div className="flex items-center gap-4 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <FiMapPin className="w-3.5 h-3.5 text-violet-400" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <FiDollarSign className="w-3.5 h-3.5 text-violet-400" />
          {formatSalary(job.minSalary, job.maxSalary, job.currency)}
        </span>
      </div>

      {/* description */}
      <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
        {job.description}
      </p>
    </div>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

export default function JobSearchFilter({ jobs = [] }) {
  const [query, setQuery] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // derive unique locations from data
  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location).filter(Boolean))],
    [jobs],
  );

  const activeFilters = useMemo(() => {
    const f = [];
    if (jobType) f.push({ key: "jobType", label: jobType });
    if (category) f.push({ key: "category", label: category });
    if (location) f.push({ key: "location", label: location });
    if (salaryRange) {
      const r = SALARY_RANGES.find(
        (s) => String(s.min) === salaryRange.split("-")[0],
      );
      if (r) f.push({ key: "salary", label: r.label });
    }
    return f;
  }, [jobType, category, location, salaryRange]);

  const removeFilter = useCallback((key) => {
    if (key === "jobType") setJobType("");
    if (key === "category") setCategory("");
    if (key === "location") setLocation("");
    if (key === "salary") setSalaryRange("");
  }, []);

  const clearAll = () => {
    setQuery("");
    setJobType("");
    setCategory("");
    setSalaryRange("");
    setLocation("");
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const [sMin, sMax] = salaryRange
      ? salaryRange.split("-").map(Number)
      : [0, Infinity];

    return jobs.filter((j) => {
      if (
        q &&
        !j.jobTitle.toLowerCase().includes(q) &&
        !j.companyName.toLowerCase().includes(q) &&
        !j.location.toLowerCase().includes(q) &&
        !j.jobCategory.toLowerCase().includes(q)
      )
        return false;
      if (jobType && j.jobType !== jobType) return false;
      if (category && j.jobCategory !== category) return false;
      if (location && j.location !== location) return false;
      if (salaryRange) {
        const mid = (+j.minSalary + +j.maxSalary) / 2;
        if (mid < sMin || mid > sMax) return false;
      }
      return true;
    });
  }, [jobs, query, jobType, category, location, salaryRange]);

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white p-6 md:p-10 font-sans">
      <style>{`
        .tag {
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 500;
          background: rgba(139,92,246,0.12);
          color: rgba(196,181,253,0.8);
          border: 1px solid rgba(139,92,246,0.2);
          text-transform: capitalize;
        }
        select option { background: #1a1a2e; color: #fff; }
      `}</style>

      {/* page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Browse <span className="text-violet-400">Jobs</span>
        </h1>
        <p className="text-white/40 text-sm mt-1">
          {filtered.length} {filtered.length === 1 ? "result" : "results"} found
        </p>
      </div>

      {/* search bar */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, company, location…"
          className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* filter toggle */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setShowFilters((p) => !p)}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
        >
          <FiFilter className="w-4 h-4 text-violet-400" />
          {showFilters ? "Hide filters" : "Show filters"}
          {activeFilters.length > 0 && (
            <span className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-violet-500 text-white text-[10px] font-bold">
              {activeFilters.length}
            </span>
          )}
        </button>
        {(activeFilters.length > 0 || query) && (
          <button
            onClick={clearAll}
            className="text-xs text-white/40 hover:text-red-400 transition"
          >
            Clear all
          </button>
        )}
      </div>

      {/* filter panel */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <Select
            icon={FiBriefcase}
            value={jobType}
            onChange={setJobType}
            options={JOB_TYPES.map((t) => ({ label: t, value: t }))}
            placeholder="Job type"
          />
          <Select
            icon={FiFilter}
            value={category}
            onChange={setCategory}
            options={CATEGORIES.map((c) => ({ label: c, value: c }))}
            placeholder="Category"
          />
          <Select
            icon={FiMapPin}
            value={location}
            onChange={setLocation}
            options={locations.map((l) => ({ label: l, value: l }))}
            placeholder="Location"
          />
          <Select
            icon={FiDollarSign}
            value={salaryRange}
            onChange={setSalaryRange}
            options={SALARY_RANGES.slice(1).map((r) => ({
              label: r.label,
              value: `${r.min}-${r.max}`,
            }))}
            placeholder="Salary range"
          />
        </div>
      )}

      {/* active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {activeFilters.map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              onRemove={() => removeFilter(f.key)}
            />
          ))}
        </div>
      )}

      {/* job grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FiSearch className="w-10 h-10 text-white/10 mb-4" />
          <p className="text-white/30 text-sm">No jobs match your filters.</p>
          <button
            onClick={clearAll}
            className="mt-3 text-xs text-violet-400 hover:text-violet-300 transition"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCard key={job._id?.$oid ?? job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
