import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/* const getRecruiterCompany = async(recruiterId) => {
    return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
} */

const getRecruiterCompany = async (recruiterId) => {
  const params = new URLSearchParams({ recruiterId });
  return serverFetch(`/api/my/companies?${params}`);
};

export const getLoggedRecruiterCompany = async() => {
    const user = await getUserSession();
    console.log("Full user session object:", user);
    return getRecruiterCompany(user?.id);
}









/* const getRecruiterCompany = async (recruiterId) => {
    const res = await fetch(`${baseUrl}/api/companies?recruiterId=${recruiterId}`);
    return res.json();
}; */