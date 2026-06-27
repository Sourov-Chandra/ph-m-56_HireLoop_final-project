import Image from "next/image";
import {
  FiMapPin,
  FiMonitor,
  FiClock,
  FiDollarSign,
  FiArrowRight,
} from "react-icons/fi";

export default function JobCard({ job }) {
  const {
    jobTitle,
    jobCategory,
    jobType,
    deadline,
    location,
    minSalary,
    maxSalary,
    status,
    createdAt,
    companyName,
    companyLogo,
  } = job;

  const formattedDeadline = new Date(deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const initials = companyName ? companyName.slice(0, 2).toUpperCase() : "CO";

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 w-80 h-[440px] flex flex-col justify-between border border-violet-500/20 font-sans">
      {/* Top and Middle Content Container */}
      <div className="flex-1 flex flex-col justify-start">
        {/* Company row */}
        <div className="flex items-center gap-3 mb-4">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={companyName}
              width={40} // ← was 10, change to 40
              height={40} // ← was 10, change to 40
              className="rounded-xl object-cover border border-violet-500/20 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/25 flex items-center justify-center text-violet-300 text-sm font-semibold flex-shrink-0">
              {initials}
            </div>
          )}
          <span className="text-sm text-[#c4b5fd] font-medium truncate">
            {companyName || "Unknown Company"}
          </span>
        </div>

        {/* Title + status */}
        <div className="flex justify-between items-start gap-2 mb-1">
          <h2 className="text-xl font-semibold text-[#f1f0ff] leading-snug line-clamp-2 h-14">
            {jobTitle}
          </h2>
          {status === "active" && (
            <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-400/25 whitespace-nowrap">
              Active
            </span>
          )}
        </div>

        <p className="text-[13px] text-[#a09dc0] mb-4 capitalize truncate">
          {jobCategory} · Full-time
        </p>

        {/* Badges container - fixed height or min-height prevents uneven card jumps */}
        <div className="flex flex-wrap gap-2 mb-4 content-start min-h-[76px]">
          <span className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full bg-violet-500/12 text-violet-300 border border-violet-500/25 max-w-full truncate">
            <FiMapPin size={12} className="flex-shrink-0" />
            <span className="truncate">{location}</span>
          </span>
          <span className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full bg-indigo-500/12 text-indigo-300 border border-indigo-500/25 capitalize">
            <FiMonitor size={12} className="flex-shrink-0" />
            {jobType}
          </span>
          <span className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full bg-purple-500/12 text-purple-300 border border-purple-500/25 whitespace-nowrap">
            <FiClock size={12} className="flex-shrink-0" />
            Deadline: {formattedDeadline}
          </span>
        </div>
      </div>

      {/* Bottom Sticky Content Container */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 bg-violet-500/8 border border-violet-500/15 rounded-xl px-4 py-3 mb-4">
          <FiDollarSign size={16} className="text-violet-400 flex-shrink-0" />
          <span className="text-[14px] font-semibold text-purple-200">
            ${minSalary} – ${maxSalary}{" "}
            <span className="font-normal text-[12px] text-[#a09dc0]">
              / hour
            </span>
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[12px] text-[#6b6880]">
            Posted {formattedDate}
          </span>
          <button className="flex items-center gap-1.5 bg-linear-to-br from-violet-600 to-violet-700 text-violet-100 border-none rounded-lg px-4 py-2 text-[13px] font-medium cursor-pointer hover:opacity-85 transition-opacity flex-shrink-0">
            Apply Now
            <FiArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
