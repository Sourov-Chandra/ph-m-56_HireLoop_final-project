"use client";

import { FileText, PersonWorker, CircleCheck, Thunderbolt } from "@gravity-ui/icons";
import StatCard from "./StateCard";

const dashboardStats = {
  recruiter: [
    {
      title: "Total Job Posts",
      value: 48,
      icon: <FileText width={20} height={20} />,
    },
    {
      title: "Total Applicants",
      value: 1284,
      icon: <PersonWorker width={20} height={20} />,
    },
    {
      title: "Active Jobs",
      value: 18,
      icon: <CircleCheck width={20} height={20} />,
    },
    {
      title: "Jobs Closed",
      value: 32,
      icon: <Thunderbolt width={20} height={20} />,
    },
  ],

  seeker: [
    {
      title: "Applications Sent",
      value: 24,
      icon: <FileText width={20} height={20} />,
    },
    {
      title: "Interviews Scheduled",
      value: 5,
      icon: <PersonWorker width={20} height={20} />,
    },
    {
      title: "Jobs Saved",
      value: 12,
      icon: <CircleCheck width={20} height={20} />,
    },
    {
      title: "Offers Received",
      value: 2,
      icon: <Thunderbolt width={20} height={20} />,
    },
  ],

  admin: [
    {
      title: "Total Users",
      value: 0,
      icon: <PersonWorker width={20} height={20} />,
    },
  ],
};

export default function DashboardStats({ role = "recruiter" }) {
  const stats = dashboardStats[role];

  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
