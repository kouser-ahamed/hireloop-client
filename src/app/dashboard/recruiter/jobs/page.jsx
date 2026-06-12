import { getCompanyJobs } from "@/lib/api/jobs";
import { Chip, Table } from "@heroui/react";
import { Eye, PencilToSquare, TrashBin } from "@gravity-ui/icons";
import React from "react";

const RecruiterJobsPage = async () => {
  const companyId = "company_123"; // todo: get from auth/company context
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Manage Jobs</h1>
        <p className="mt-1 text-sm text-neutral-400">
          View, edit, and manage your company job posts.
        </p>
      </div>

      <Table variant="secondary">
        <Table.ResizableContainer>
          <Table.Content aria-label="Company jobs" className="min-w-[760px]">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="1fr" id="jobTitle" minWidth={180}>
                Job Title
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="jobCategory" minWidth={140}>
                Category
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="jobType" minWidth={130}>
                Type
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="location" minWidth={200}>
                Location
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="status" minWidth={120}>
                Status
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="actions" minWidth={130}>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs?.map((job) => {
                const jobId = job?._id?.$oid || job?._id;

                return (
                  <Table.Row key={jobId}>
                    <Table.Cell>{job.jobTitle}</Table.Cell>
                    <Table.Cell className="capitalize">{job.jobCategory}</Table.Cell>
                    <Table.Cell className="capitalize">{job.jobType}</Table.Cell>
                    <Table.Cell>
                      {job.isRemote ? "Remote" : job.location}
                    </Table.Cell>
                    <Table.Cell>
                      <Chip
                        color={job.status === "active" ? "success" : "warning"}
                        size="sm"
                        variant="soft"
                        className="capitalize"
                      >
                        {job.status}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          title="View Details"
                          className="rounded-lg border border-neutral-800 bg-[#181818] p-2 text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          title="Edit Job"
                          className="rounded-lg border border-neutral-800 bg-[#181818] p-2 text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                        >
                          <PencilToSquare className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          title="Delete Job"
                          className="rounded-lg border border-red-900/50 bg-red-950/20 p-2 text-red-400 transition hover:bg-red-950/40 hover:text-red-300"
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
  );
};

export default RecruiterJobsPage;