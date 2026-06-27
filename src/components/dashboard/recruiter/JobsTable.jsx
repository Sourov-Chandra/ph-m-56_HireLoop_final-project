"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiClock,
  FiCalendar,
  FiMoreVertical,
} from "react-icons/fi";

// ---- helpers -------------------------------------------------

const CURRENCY_MAP = {
  usd: { symbol: "$", locale: "en-US" },
  bdt: { symbol: "৳", locale: "en-IN" },
  eur: { symbol: "€", locale: "de-DE" },
};

const formatSalary = (min, max, currencyKey) => {
  // Normalize key to lower case, default to 'bdt' if missing or unknown
  const key = String(currencyKey || "bdt").toLowerCase();
  const config = CURRENCY_MAP[key] || CURRENCY_MAP.bdt;

  const fmt = (n) =>
    `${config.symbol}${Number(n).toLocaleString(config.locale)}`;
  return `${fmt(min)} - ${fmt(max)}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDeadline = (dateStr) => {
  if (!dateStr)
    return { label: "No Deadline", isUrgent: false, isExpired: false };

  const date = new Date(dateStr);
  const today = new Date();
  const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));

  return {
    label: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    isUrgent: diffDays <= 7 && diffDays >= 0,
    isExpired: diffDays < 0,
  };
};

const STATUS_STYLES = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  draft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  closed: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  paused: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const JOB_TYPE_LABELS = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};

// ---- actions menu (for mobile) ----------------------------------------------

const MobileActionsMenu = ({ job, onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left md:hidden" ref={menuRef}>
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Open actions menu"
        aria-haspopup="true"
        aria-expanded={open}
        className="p-2 rounded-lg text-slate-400 hover:text-violet-300 hover:bg-violet-500/10 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        <FiMoreVertical size={18} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-44 origin-top-right rounded-xl border border-white/10 bg-[#14121f]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
        >
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onView(job);
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-200 hover:bg-violet-500/10 hover:text-violet-300 transition-colors"
          >
            <FiEye size={15} />
            View details
          </button>
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onEdit(job);
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-200 hover:bg-violet-500/10 hover:text-violet-300 transition-colors"
          >
            <FiEdit2 size={15} />
            Edit job
          </button>
          <div className="h-px bg-white/10" />
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onDelete(job);
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <FiTrash2 size={15} />
            Delete job
          </button>
        </div>
      )}
    </div>
  );
};

// ---- main table ----------------------------------------------

const JobsTable = ({ jobs = [] }) => {
  const handleView = (job) => {
    console.log("view", job._id?.$oid || job._id);
  };

  const handleEdit = (job) => {
    console.log("edit", job._id?.$oid || job._id);
  };

  const handleDelete = (job) => {
    console.log("delete", job._id?.$oid || job._id);
  };

  if (!jobs.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-12 text-center">
        <p className="text-slate-400">No jobs posted yet.</p>
        <p className="text-sm text-slate-500 mt-1">
          Jobs you post will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-xl shadow-black/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] border-collapse table-fixed">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center w-[28%]">
                Job title
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center w-[12%]">
                Type
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center w-[16%]">
                Salary range
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center w-[18%]">
                Timeline
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center w-[12%]">
                Status
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center w-[14%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const id = job._id?.$oid || job._id;
              const deadline = formatDeadline(job.deadline);
              const statusStyle =
                STATUS_STYLES[job.status] || STATUS_STYLES.draft;

              return (
                <tr
                  key={id}
                  className="border-b border-white/5 last:border-b-0 hover:bg-violet-500/[0.04] transition-colors duration-150"
                >
                  {/* Job Title & Metadata */}
                  <td className="px-5 py-4 align-middle text-center">
                    <div>
                      <p className="font-medium text-slate-100 truncate">
                        {job.jobTitle}
                      </p>
                      <div className="flex items-center justify-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap">
                          <FiMapPin size={12} />
                          {job.location}
                        </span>
                        <span className="text-xs text-slate-600 truncate capitalize">
                          {job.jobCategory}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Job Type */}
                  <td className="px-5 py-4 align-middle text-center">
                    <span className="inline-flex items-center rounded-md border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300 whitespace-nowrap capitalize">
                      {JOB_TYPE_LABELS[job.jobType] || job.jobType}
                    </span>
                  </td>

                  {/* Salary (With dynamic currency mapping) */}
                  <td className="px-5 py-4 align-middle text-center text-sm text-slate-300 whitespace-nowrap">
                    {formatSalary(job.minSalary, job.maxSalary, job.currency)}
                  </td>

                  {/* Timeline (Created Date & Deadline) */}
                  <td className="px-5 py-4 align-middle text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 whitespace-nowrap">
                        <FiCalendar size={12} className="text-slate-500" />
                        <span>Posted: {formatDate(job.createdAt)}</span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 text-xs whitespace-nowrap ${
                          deadline.isExpired
                            ? "text-rose-400"
                            : deadline.isUrgent
                              ? "text-amber-400"
                              : "text-slate-400"
                        }`}
                      >
                        <FiClock size={12} />
                        <span>Ends: {deadline.label}</span>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 align-middle text-center">
                    <span
                      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium capitalize whitespace-nowrap ${statusStyle}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 align-middle">
                    <div className="hidden md:flex items-center justify-center gap-4 my-1">
                      <button
                        onClick={() => handleView(job)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors duration-150 cursor-pointer"
                        title="View details"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(job)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors duration-150 cursor-pointer"
                        title="Edit job"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(job)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors duration-150 cursor-pointer"
                        title="Delete job"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>

                    <div className="md:hidden flex items-center justify-center">
                      <MobileActionsMenu
                        job={job}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsTable;
