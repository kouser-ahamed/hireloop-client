"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { Briefcase, Check, House, ArrowDown } from "@gravity-ui/icons";

const jobCategories = [
  { id: "technology", name: "Technology" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "sales", name: "Sales" },
  { id: "finance", name: "Finance" },
  { id: "human-resources", name: "Human Resources" },
];

const jobTypes = [
  { id: "full-time", name: "Full-time" },
  { id: "part-time", name: "Part-time" },
  { id: "contract", name: "Contract" },
  { id: "internship", name: "Internship" },
];

const currencies = [
  { id: "BDT", name: "BDT" },
  { id: "USD", name: "USD" },
  { id: "EUR", name: "EUR" },
];

export default function PostJobPage() {
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [currency, setCurrency] = useState("");

  const company = {
    id: "company_001",
    name: "Acme Corp",
    status: "approved",
    plan: "Free",
    activeJobs: 2,
  };

  const planLimits = {
    Free: 3,
    Growth: 10,
    Enterprise: 50,
  };

  const jobLimit = planLimits[company.plan] || 3;
  const canPostJob =
    company.status === "approved" && company.activeJobs < jobLimit;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canPostJob) {
      alert("Your company is not allowed to post a new job right now.");
      return;
    }

    if (!jobCategory || !jobType || !currency) {
      alert("Please select Job Category, Job Type, and Currency.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const jobPayload = {
      title: formData.get("jobTitle"),
      category: jobCategory,
      type: jobType,
      salary: {
        min: formData.get("salaryMin"),
        max: formData.get("salaryMax"),
        currency,
      },
      location: isRemote ? "Remote" : formData.get("location"),
      isRemote,
      applicationDeadline: formData.get("deadline"),
      responsibilities: formData.get("responsibilities"),
      requirements: formData.get("requirements"),
      benefits: formData.get("benefits"),
      companyId: company.id,
      companyName: company.name,
      status: "active",
      isPublic: true,
      createdAt: new Date().toISOString(),
    };

    console.log("New job payload:", jobPayload);

    // Later API call:
    // await fetch("/api/recruiter/jobs", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(jobPayload),
    // });

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Job posted successfully!");
    }, 800);
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[960px] rounded-2xl border border-neutral-800/80 bg-[#111113] shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="px-6 py-7 sm:px-10 sm:py-9">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
            Post a New Job
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Fill out the details below to publish your open position.
          </p>

          <div className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-lg border border-neutral-800 bg-[#151517] px-4 py-2 text-sm">
            <Briefcase className="h-4 w-4 text-neutral-500" />

            <span className="text-neutral-500">Posting as:</span>

            <span className="font-semibold text-neutral-200">
              {company.name} (Auto-filled)
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-900/60 bg-emerald-950/40 px-2 py-1 text-xs font-bold text-emerald-400">
              <Check className="h-3.5 w-3.5" />
              Approved
            </span>
          </div>
        </div>

        <div className="mx-6 border-t border-neutral-800 sm:mx-10" />

        <Form
          onSubmit={handleSubmit}
          validationBehavior="native"
          className="flex flex-col"
        >
          <div className="px-6 py-8 sm:px-10">
            {/* Job Information */}
            <Fieldset className="border-0 p-0">
              <h2 className="text-xl font-semibold text-neutral-200">
                Job Information
              </h2>

              <div className="mt-7 grid grid-cols-1 gap-x-7 gap-y-8 md:grid-cols-2">
                <TextField isRequired name="jobTitle" className="w-full">
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Job Title
                  </Label>

                  <Input
                    placeholder="e.g. Senior Frontend Engineer"
                    className="h-[58px] w-full rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                  />

                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>

                <DarkSelect
                  label="Job Category"
                  name="jobCategory"
                  placeholder="Select an item"
                  items={jobCategories}
                  selectedKey={jobCategory}
                  onChange={setJobCategory}
                />

                <DarkSelect
                  label="Job Type"
                  name="jobType"
                  placeholder="Select an item"
                  items={jobTypes}
                  selectedKey={jobType}
                  onChange={setJobType}
                />

                <div>
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Salary Range
                  </Label>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_1fr]">
                    <TextField isRequired name="salaryMin">
                      <Input
                        type="number"
                        min="0"
                        placeholder="Min"
                        className="h-[58px] w-full rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                      />
                      <FieldError className="mt-1 text-xs text-red-400" />
                    </TextField>

                    <TextField isRequired name="salaryMax">
                      <Input
                        type="number"
                        min="0"
                        placeholder="Max"
                        className="h-[58px] w-full rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                      />
                      <FieldError className="mt-1 text-xs text-red-400" />
                    </TextField>

                    <DarkSelect
                      name="currency"
                      placeholder="Currency"
                      items={currencies}
                      selectedKey={currency}
                      onChange={setCurrency}
                      hideLabel
                    />
                  </div>
                </div>

                <TextField name="location" className="w-full">
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="block text-sm font-semibold text-neutral-300">
                      Location
                    </Label>

                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-neutral-400">
                      <input
                        type="checkbox"
                        checked={isRemote}
                        onChange={(e) => setIsRemote(e.target.checked)}
                        className="h-3.5 w-3.5 accent-white"
                      />
                      Remote
                    </label>
                  </div>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                      <House className="h-4 w-4" />
                    </span>

                    <Input
                      disabled={isRemote}
                      placeholder={
                        isRemote ? "Remote selected" : "e.g. Austin, TX"
                      }
                      className="h-[58px] w-full rounded-lg border border-neutral-800 bg-[#1d1d1f] px-11 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>

                <TextField isRequired name="deadline" className="w-full">
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Application Deadline
                  </Label>

                  <Input
                    type="date"
                    className="h-[58px] w-full rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                  />

                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>
              </div>
            </Fieldset>

            {/* Job Details */}
            <Fieldset className="mt-10 border-0 p-0">
              <h2 className="text-xl font-semibold text-neutral-200">
                Job Details & Description
              </h2>

              <div className="mt-7 flex flex-col gap-8">
                <TextField isRequired name="responsibilities">
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Responsibilities
                  </Label>

                  <TextArea
                    rows={6}
                    placeholder="Describe the key responsibilities of this role..."
                    className="min-h-[132px] w-full resize-y rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                  />

                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>

                <TextField isRequired name="requirements">
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Requirements
                  </Label>

                  <TextArea
                    rows={6}
                    placeholder="Add required skills, experience, education, and qualifications..."
                    className="min-h-[132px] w-full resize-y rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                  />

                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>

                <TextField name="benefits">
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Benefits{" "}
                    <span className="font-normal text-neutral-500">
                      (Optional)
                    </span>
                  </Label>

                  <TextArea
                    rows={5}
                    placeholder="Mention benefits, bonuses, remote flexibility, learning support, etc..."
                    className="min-h-[120px] w-full resize-y rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                  />

                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>
              </div>
            </Fieldset>
          </div>

          {/* Footer */}
          <div className="mx-6 border-t border-neutral-800 sm:mx-10" />

          <div className="flex items-center justify-end gap-4 px-6 py-6 sm:px-10">
            <Button
              as={Link}
              href="/dashboard/recruiter/jobs"
              variant="ghost"
              className="h-11 rounded-xl px-7 text-sm font-semibold text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!canPostJob || isSubmitting}
              className="h-11 rounded-xl bg-white px-8 text-sm font-bold text-black shadow-lg shadow-white/5 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

function DarkSelect({
  label,
  name,
  placeholder = "Select an item",
  items = [],
  selectedKey,
  onChange,
  hideLabel = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedItem = items.find((item) => item.id === selectedKey);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (itemId) => {
    onChange(itemId);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <input type="hidden" name={name} value={selectedKey || ""} />

      {!hideLabel && (
        <Label className="mb-2 block text-sm font-semibold text-neutral-300">
          {label}
        </Label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[58px] w-full items-center justify-between rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 text-left text-sm font-normal text-white outline-none transition-colors hover:bg-[#222224] focus:border-neutral-600"
      >
        <span className={selectedItem ? "text-white" : "text-neutral-500"}>
          {selectedItem ? selectedItem.name : placeholder}
        </span>

        <ArrowDown
          className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full rounded-xl border border-neutral-800 bg-[#1d1d1f] p-1 shadow-2xl shadow-black/40">
          <div className="max-h-64 overflow-auto">
            {items.map((item) => {
              const isSelected = selectedKey === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-neutral-800 ${
                    isSelected
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-300"
                  }`}
                >
                  <span>{item.name}</span>

                  {isSelected && <Check className="h-4 w-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}