import React from 'react'
import PostJobForm from './PostJobForm'
import { getLoggedRecruiterCompany } from '@/lib/api/companies'

const PostJobPage = async() => {

    const company = await getLoggedRecruiterCompany()
  return (
    <div>
        <PostJobForm companyInfo={company}/>
    </div>
  )
}

export default PostJobPage