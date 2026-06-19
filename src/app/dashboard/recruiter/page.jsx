"use client";

import DashboardStats from "@/components/dashboard/DashboardState";
import { useSession } from "@/lib/auth-client";

const DashboardRecruiterPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) return <p>Loading...</p>;

  const user = session?.user;

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <DashboardStats role="recruiter" />
    </div>
  );
};

export default DashboardRecruiterPage;
