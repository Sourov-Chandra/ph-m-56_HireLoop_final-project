import React from 'react'
import PostJobForm from './PostJobForm'
import { getLoggedRecruiterCompany } from '@/lib/api/companies'

const PostJobPage = async () => {
  const company = await getLoggedRecruiterCompany();
  console.log("comapy info from post job page", company);

  if (!company) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        <p>No company found. Please register your company first.</p>
      </div>
    );
  }

  return (
    <div>
      <PostJobForm companyInfo={company} />
    </div>
  );
};

export default PostJobPage