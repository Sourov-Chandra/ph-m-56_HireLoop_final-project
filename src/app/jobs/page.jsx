// import JobCard from "@/components/jobs/JobCard";
// import JobSearchFilter from "@/components/jobs/JobSearchFilter";
// import { getJobs } from "@/lib/api/jobs";

// export default async function JobsPage() {
//   const jobs = await getJobs();

//   return (
//     <div className="min-h-screen bg-[#0f0f1a] flex justify-center">
//       {/* Centered container */}
//       <JobSearchFilter />
//       <div className="w-full max-w-6xl px-4 py-10">
//         {/* Header */}
//         <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2 text-center">
//           Job Listings
//         </h1>

//         <p className="text-sm text-[#a09dc0] mb-10 text-center">
//           {jobs.length} open {jobs.length === 1 ? "position" : "positions"}
//         </p>

//         {/* Grid layout */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs && jobs.length > 0 ? (
//             jobs.map((job) => <JobCard key={job._id} job={job} />)
//           ) : (
//             <p className="text-[#a09dc0] col-span-full text-center">
//               No jobs found at the moment.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import JobsClientWrapper from '@/components/jobs/JobsClientWrapper'
import { getJobs } from '@/lib/api/jobs'
import React from 'react'

// app/jobs/page.jsx
export default async function JobsPage() {
  const data = await getJobs();
  const jobs = Array.from(data ?? []); // ← strips RSC proxy, makes it a plain array

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex justify-center">
      <JobsClientWrapper jobs={jobs} />
    </div>
  );
}
