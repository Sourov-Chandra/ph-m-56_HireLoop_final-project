import JobApplication from "@/components/jobApplications/JobApplication";
import { getApplicationByApplicant } from "@/lib/api/application";
import { getJobDetails } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();
  const job = await getJobDetails(id);
  
  const applications = await getApplicationByApplicant(user.id);


  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <p className="mb-4">Only job seekers can apply for jobs</p>
        <Link
          href="/jobs"
          className="bg-violet-500 text-white px-4 py-2 rounded-md"
        >
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {applications.length >= 3 ? (
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <p className="text-center text-sm text-gray-300 mb-3">
                You have applied to{" "}
                <span className="font-semibold text-violet-400">
                  {applications.length}
                </span>{" "}
                out of <span className="font-semibold text-white">3</span> jobs
                this month.
              </p>
              <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400 transition-all duration-500"
                  style={{ width: `${(applications.length / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-4">
              You have applied to {applications.length} out of 3 jobs this
              month.
            </p>
            <JobApplication job={job} applicant={user} />
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
