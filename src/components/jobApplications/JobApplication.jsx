"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiMail,
  FiGithub,
  FiLink,
  FiSend,
} from "react-icons/fi";
import { createApplication } from "@/lib/actions/application";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


const formatSalary = (min, max, currency) => {
  const symbol =
    currency?.toLowerCase() === "usd" ? "$" : currency?.toUpperCase();
  return `${symbol}${Number(min).toLocaleString()} - ${symbol}${Number(max).toLocaleString()}`;
};

const JobApplication = ({ job, applicant, onSubmit }) => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!job || !applicant) return null;

  // console.log("Applicant:", applicant);

  const initials = applicant?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!resumeUrl.trim()) {
      setError("Please add a link to your resume.");
      return;
    }
    if (!message.trim()) {
      setError("Please add a short message to the recruiter.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        jobId: job._id?.$oid || job?._id,
        applicantId: applicant?.id,
        applicantName: applicant?.name,
        applicantEmail: applicant?.email,
        jobTitle: job?.jobTitle,
        companyName: job?.companyName,
        resumeUrl: resumeUrl.trim(),
        githubUrl: githubUrl.trim(),
        message: message.trim(),
        status: "pending",
      };

      // console.log("Payload:", payload);

      const res = await createApplication(payload);

      if (res) {
        alert("Application submitted successfully!");
      }

      if (onSubmit) {
        await onSubmit(payload);
      }
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl sm:max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 sm:p-6 shadow-[0_0_40px_-15px_rgba(139,92,246,0.3)]">
      {/* Company / Job header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 relative">
          {job.companyLogo ? (
            <Image
              src={job.companyLogo}
              alt={job.companyName}
              fill
              className="object-contain p-1.5"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40 text-lg font-semibold">
              {job.companyName?.[0]}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">{job.jobTitle}</h1>
          <p className="text-sm text-white/50">{job.companyName}</p>
        </div>
      </div>

      {/* Job meta */}
      <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <FiMapPin className="text-violet-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiClock className="text-violet-400" />
          <span className="capitalize">{job.jobType?.replace("-", " ")}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiDollarSign className="text-violet-400" />
          <span>
            {formatSalary(job.minSalary, job.maxSalary, job.currency)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-violet-400" />
          <span>Deadline: {formatDate(job.deadline)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 mb-5" />

      {/* Applicant info (read-only) */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 text-sm font-semibold">
          {initials || <FiUser />}
        </div>
        <div>
          <p className="text-sm text-white/90 font-medium">{applicant.name}</p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            <FiMail size={12} />
            {applicant.email}
          </p>
        </div>
        {!applicant.emailVerified && (
          <span className="ml-auto text-[11px] px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Email not verified
          </span>
        )}
      </div>

      {/* Application form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Resume link */}
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5">
            Resume link <span className="text-violet-400">*</span>
          </label>
          <div className="relative">
            <FiLink
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              size={16}
            />
            <input
              type="url"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="https://drive.google.com/your-resume.pdf"
              className="w-full bg-white/5 border border-white/10 rounded-md pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition"
            />
          </div>
          <p className="text-xs text-white/30 mt-1">
            Link to your resume (Google Drive, Dropbox, personal site, etc.) —
            make sure it's set to public/viewable.
          </p>
        </div>

        {/* GitHub link */}
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5">
            GitHub profile (optional)
          </label>
          <div className="relative">
            <FiGithub
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              size={16}
            />
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/yourusername"
              className="w-full bg-white/5 border border-white/10 rounded-md pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5">
            Message to recruiter <span className="text-violet-400">*</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Tell them why you're a great fit..."
            className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition resize-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          // disabled={submitting || !applicant.emailVerified}
          className="w-full flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 disabled:bg-white/10 disabled:text-white/40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-md cursor-pointer font-medium transition-colors"
        >
          <FiSend size={16} />
          {submitting ? "Submitting..." : "Apply Now"}
        </button>
      </form>
    </div>
  );
};

export default JobApplication;
