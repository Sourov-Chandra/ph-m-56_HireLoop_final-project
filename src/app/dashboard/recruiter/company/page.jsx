import { getUserSession } from "@/lib/core/session";
import CompanyProfile from "./companyProfile";

const CompanyPage = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect("/login"); // or return <div>Not authenticated</div>
  }

  return (
    <div>
      <CompanyProfile recruiter={user} />
    </div>
  );
};

export default CompanyPage;