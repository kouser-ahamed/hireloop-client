import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompanies } from '@/lib/api/companies';

const CompanyPage = async () => {

    const user = await getUserSession();
    const companies = await getRecruiterCompanies(user?.id);

    return (
        <div>
            <CompanyProfile recruiter={user} RecruiterCompanies={companies} />
        </div>
    );
};

export default CompanyPage;