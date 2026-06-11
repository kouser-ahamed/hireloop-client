import { Briefcase, Layers, PersonMagnifier, Star } from "@gravity-ui/icons";

export const recruiterStats = [
  {
    label: "Total Job Posts",
    value: "48",
    icon: Briefcase,
    href: "/dashboard/recruiter/jobs",
  },
  {
    label: "Total Applicants",
    value: "1,284",
    icon: PersonMagnifier,
    href: "/dashboard/recruiter/applications",
  },
  {
    label: "Active Jobs",
    value: "18",
    icon: Layers,
    href: "/dashboard/recruiter/jobs",
  },
  {
    label: "Jobs Closed",
    value: "32",
    icon: Star,
    href: "/dashboard/recruiter/jobs",
  },
];

export const seekerStats = [
  {
    label: "Applications Sent",
    value: "24",
    icon: Briefcase,
    href: "/dashboard/seeker/applications",
  },
  {
    label: "Saved Jobs",
    value: "12",
    icon: Star,
    href: "/dashboard/seeker/saved-jobs",
  },
  {
    label: "Profile Views",
    value: "156",
    icon: PersonMagnifier,
    href: "/dashboard/seeker/profile",
  },
  {
    label: "Interviews",
    value: "4",
    icon: Layers,
    href: "/dashboard/seeker/interviews",
  },
];

export const adminStats = [
  {
    label: "Total Users",
    value: "15,420",
    icon: PersonMagnifier,
    href: "/dashboard/admin/users",
  },
  {
    label: "Total Companies",
    value: "1,245",
    icon: Layers,
    href: "/dashboard/admin/companies",
  },
  {
    label: "Total Jobs",
    value: "8,750",
    icon: Briefcase,
    href: "/dashboard/admin/jobs",
  },
  {
    label: "Success Rate",
    value: "97%",
    icon: Star,
    href: "/dashboard/admin/analytics",
  },
];