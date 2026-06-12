import { serverFetch } from "../core/server";


export const getRecruiterCompanies = async (recruiterId) => {
   return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
}