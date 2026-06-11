"use client";

import { useSession } from "@/lib/auth-client";
import { StatsCards } from "@/components/dashboard/StatsCards";
import {
  Briefcase,
  PersonMagnifier,
  Layers,
  Star,
} from "@gravity-ui/icons";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  const recruiterStats = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: Briefcase,
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: PersonMagnifier,
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: Layers,
    },
    {
      title: "Jobs Closed",
      value: "32",
      icon: Star,
    },
  ];

  if (isPending) {
    return <div className="text-neutral-400">Loading...</div>;
  }

  const user = session?.user;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Welcome Back, {user?.name || "Recruiter"}
        </h2>

        <p className="mt-2 text-sm text-neutral-400">
          Here is an overview of your recruitment activity.
        </p>
      </div>

      <StatsCards stats={recruiterStats} />
    </div>
  );
};

export default RecruiterDashboardHomePage;