// JobSearchFilter.jsx — controlled, no internal state, no grid
"use client";

import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiFilter,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { useMemo, useState } from "react";

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
  "Data Science",
  "Engineering",
  "Technology",
  "Logistics",
  "Retail",
  "Customer Support",
  "Product Management",
];
const SALARY_RANGES = [
  { label: "< $50k", value: "0-50000" },
  { label: "$50k – $100k", value: "50000-100000" },
  { label: "$100k – $150k", value: "100000-150000" },
  { label: "> $150k", value: "150000-Infinity" },
];

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
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 w-3.5 h-3.5 pointer-events-none" />
    </div>
  );
}

export default function JobSearchFilter({ jobs = [], filters, onChange }) {
  const [showFilters, setShowFilters] = useState(false);

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location).filter(Boolean))],
    [jobs],
  );

  const set = (key) => (val) => onChange({ ...filters, [key]: val });

  const activeCount = [
    filters.jobType,
    filters.category,
    filters.location,
    filters.salaryRange,
  ].filter(Boolean).length;

  return (
    <div className="w-full">
      <style>{`select option { background: #1a1a2e; color: #fff; }`}</style>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
        <input
          type="text"
          value={filters.query}
          onChange={(e) => set("query")(e.target.value)}
          placeholder="Search by title, company, location…"
          className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition"
        />
        {filters.query && (
          <button
            onClick={() => set("query")("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter toggle */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setShowFilters((p) => !p)}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
        >
          <FiFilter className="w-4 h-4 text-violet-400" />
          {showFilters ? "Hide filters" : "Show filters"}
          {activeCount > 0 && (
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-violet-500 text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </button>
        {(activeCount > 0 || filters.query) && (
          <button
            onClick={() =>
              onChange({
                query: "",
                jobType: "",
                category: "",
                location: "",
                salaryRange: "",
              })
            }
            className="text-xs text-white/40 hover:text-red-400 transition"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-4">
          <Select
            icon={FiBriefcase}
            value={filters.jobType}
            onChange={set("jobType")}
            options={JOB_TYPES.map((t) => ({ label: t, value: t }))}
            placeholder="Job type"
          />
          <Select
            icon={FiFilter}
            value={filters.category}
            onChange={set("category")}
            options={CATEGORIES.map((c) => ({ label: c, value: c }))}
            placeholder="Category"
          />
          <Select
            icon={FiMapPin}
            value={filters.location}
            onChange={set("location")}
            options={locations.map((l) => ({ label: l, value: l }))}
            placeholder="Location"
          />
          <Select
            icon={FiDollarSign}
            value={filters.salaryRange}
            onChange={set("salaryRange")}
            options={SALARY_RANGES}
            placeholder="Salary range"
          />
        </div>
      )}

      {/* Active chips */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.jobType && (
            <Chip label={filters.jobType} onRemove={() => set("jobType")("")} />
          )}
          {filters.category && (
            <Chip
              label={filters.category}
              onRemove={() => set("category")("")}
            />
          )}
          {filters.location && (
            <Chip
              label={filters.location}
              onRemove={() => set("location")("")}
            />
          )}
          {filters.salaryRange && (
            <Chip
              label={
                SALARY_RANGES.find((r) => r.value === filters.salaryRange)
                  ?.label
              }
              onRemove={() => set("salaryRange")("")}
            />
          )}
        </div>
      )}
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
