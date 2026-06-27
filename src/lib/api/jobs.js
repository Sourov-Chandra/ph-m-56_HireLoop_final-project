import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async () => {
  const data = await serverFetch(`/api/jobs`);
  console.log("getJobs response:", data); // ← check terminal
  return data.jobs ?? data ?? [];
};


export const getCompanyJobs = async (companyId, status="active") => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}