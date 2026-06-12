'use server'

import { serverMutation, serverPatch } from "../core/server";

export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companies', newCompanyData);

}

export const updateCompany = async (companyId, updatedCompanyData) => {
  return serverPatch(`/api/companies/${companyId}`, updatedCompanyData);
};

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createCompany = async (newCompanyData) => {
//     const res = await fetch(`${baseUrl}/api/companies`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newCompanyData),
//     });

//     return res.json();
// }