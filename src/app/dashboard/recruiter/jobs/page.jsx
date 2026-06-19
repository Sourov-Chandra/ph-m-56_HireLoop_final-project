import JobsTable from "@/components/dashboard/recruiter/JobsTable";
import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";

const RecruiterJobsPage = async () => {
  const companyId = "company_1";
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="min-h-screen bg-[#0a0816] px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100">Posted jobs</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage and track all jobs posted by your company.
          </p>
        </div>

        <JobsTable jobs={jobs} />
      </div>
    </div>
  );
};

export default RecruiterJobsPage;
