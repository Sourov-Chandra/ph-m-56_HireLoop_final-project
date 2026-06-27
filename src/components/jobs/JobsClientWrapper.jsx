"use client";

import { useState, useMemo } from "react";
import JobSearchFilter from "./JobSearchFilter";
import JobCard from "./JobCard";

export default function JobsClientWrapper({ jobs = [] }) {
  const [filters, setFilters] = useState({
    query: "",
    jobType: "",
    category: "",
    location: "",
    salaryRange: "",
  });

  const filtered = useMemo(() => {
    const q = filters.query.toLowerCase();
    const [sMin, sMax] = filters.salaryRange
      ? filters.salaryRange.split("-").map(Number)
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
      if (filters.jobType && j.jobType !== filters.jobType) return false;
      if (filters.category && j.jobCategory !== filters.category) return false;
      if (filters.location && j.location !== filters.location) return false;
      if (filters.salaryRange) {
        const mid = (+j.minSalary + +j.maxSalary) / 2;
        if (mid < sMin || mid > sMax) return false;
      }
      return true;
    });
  }, [jobs, filters]);

  return (
    <div className="w-full max-w-6xl px-4 py-10">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2 text-center">
        Job Listings
      </h1>
      <p className="text-sm text-[#a09dc0] mb-6 text-center">
        {filtered.length} open{" "}
        {filtered.length === 1 ? "position" : "positions"}
      </p>

      {/* Filter bar */}
      <JobSearchFilter jobs={jobs} filters={filters} onChange={setFilters} />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filtered.length > 0 ? (
          filtered.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="text-[#a09dc0] col-span-full text-center">
            No jobs match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
