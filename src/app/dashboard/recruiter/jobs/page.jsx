import { getCompanyJobs } from "@/lib/api/jobs";
import { Chip, Table } from "@heroui/react";
import { Eye, PencilToSquare, TrashBin } from "@gravity-ui/icons";
import React from "react";

const RecruiterJobsPage = async () => {
  const companyId = "company_123"; // todo: get from auth/company context
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Manage All Jobs
        </h1>
        <p className="text-sm text-neutral-400">
          View, edit, and manage your company job posts.
        </p>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {jobs?.map((job) => {
          const jobId = job?._id?.$oid || job?._id;

          return (
            <div
              key={jobId}
              className="rounded-2xl border border-neutral-800 bg-[#111113] p-4 shadow-lg shadow-black/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-white">
                    {job.jobTitle}
                  </h2>
                  <p className="mt-1 text-xs capitalize text-neutral-500">
                    {job.jobCategory} • {job.jobType}
                  </p>
                </div>

                <Chip
                  color={job.status === "active" ? "success" : "warning"}
                  size="sm"
                  variant="soft"
                  className="capitalize"
                >
                  {job.status}
                </Chip>
              </div>

              <div className="mt-4 rounded-xl border border-neutral-800 bg-black/70 px-3 py-2">
                <p className="text-xs text-neutral-500">Location</p>
                <p className="mt-1 truncate text-sm text-neutral-300">
                  {job.isRemote ? "Remote" : job.location}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  title="View Details"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-black text-neutral-300 transition hover:bg-neutral-900 hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  title="Edit Job"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-black text-neutral-300 transition hover:bg-neutral-900 hover:text-white"
                >
                  <PencilToSquare className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  title="Delete Job"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-900/50 bg-red-950/20 text-red-400 transition hover:bg-red-950/40 hover:text-red-300"
                >
                  <TrashBin className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet/Desktop Table View */}
      <div className="hidden overflow-hidden rounded-2xl border border-neutral-800 bg-[#111113] shadow-xl shadow-black/20 md:block">
        <Table variant="secondary">
          <Table.ResizableContainer>
            <Table.Content aria-label="Company jobs" className="w-full">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  defaultWidth="1.4fr"
                  id="jobTitle"
                  minWidth={160}
                  className="bg-[#111113] text-neutral-300"
                >
                  Job Title
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="0.9fr"
                  id="jobCategory"
                  minWidth={110}
                  className="bg-[#111113] text-neutral-300"
                >
                  Category
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="0.9fr"
                  id="jobType"
                  minWidth={100}
                  className="bg-[#111113] text-neutral-300"
                >
                  Type
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1.3fr"
                  id="location"
                  minWidth={150}
                  className="bg-[#111113] text-neutral-300"
                >
                  Location
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="0.8fr"
                  id="status"
                  minWidth={95}
                  className="bg-[#111113] text-neutral-300"
                >
                  Status
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="0.9fr"
                  id="actions"
                  minWidth={120}
                  className="bg-[#111113] text-neutral-300"
                >
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {jobs?.map((job) => {
                  const jobId = job?._id?.$oid || job?._id;

                  return (
                    <Table.Row key={jobId}>
                      <Table.Cell>
                        <span className="block max-w-[220px] truncate rounded-xl border border-neutral-900 bg-black px-3 py-2 font-medium text-white">
                          {job.jobTitle}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="block rounded-xl border border-neutral-900 bg-black px-3 py-2 capitalize text-neutral-300">
                          {job.jobCategory}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="block rounded-xl border border-neutral-900 bg-black px-3 py-2 capitalize text-neutral-300">
                          {job.jobType}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="block max-w-[220px] truncate rounded-xl border border-neutral-900 bg-black px-3 py-2 text-neutral-300">
                          {job.isRemote ? "Remote" : job.location}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <div className="rounded-xl border border-neutral-900 bg-black px-3 py-2">
                          <Chip
                            color={
                              job.status === "active" ? "success" : "warning"
                            }
                            size="sm"
                            variant="soft"
                            className="capitalize"
                          >
                            {job.status}
                          </Chip>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <div className="flex items-center gap-2 rounded-xl border border-neutral-900 bg-black px-3 py-2">
                          <button
                            type="button"
                            title="View Details"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-[#111113] text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            title="Edit Job"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-[#111113] text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                          >
                            <PencilToSquare className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            title="Delete Job"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-900/50 bg-red-950/20 text-red-400 transition hover:bg-red-950/40 hover:text-red-300"
                          >
                            <TrashBin className="h-4 w-4" />
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
};

export default RecruiterJobsPage;