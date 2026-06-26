import React from 'react'
import CompanyProfile from './companyProfile'
import { getUserSession } from '@/lib/core/session';

const CompanyPage = async() => {

  const user = await getUserSession();
  console.log("User Session Data from Company Page:", user);
      /* const user = await getUserSession();
      console.log("User Session Data from Company Page:", user.id); */
  return (
    <div>
      <CompanyProfile recruiter={user} />
    </div>
  );
}

export default CompanyPage