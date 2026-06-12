import React from "react";
import CompanyProfile from "./CompanyProfile";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterCompanies } from "@/lib/api/companies";

const CompanyPage = async () => {
  const user = await getUserSession();
  const company = await getRecruiterCompanies(user?.id);

  console.log("Recruiter Company:", company);

  return (
    <div>
      <CompanyProfile recruiter={user} companyData={company} />
    </div>
  );
};

export default CompanyPage;