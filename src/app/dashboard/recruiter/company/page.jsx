"use client";

import { useEffect, useRef, useState } from "react";
import {
  Button,
  Chip,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import {
  ArrowDown,
  Briefcase,
  Check,
  House,
  PencilToSquare,
} from "@gravity-ui/icons";

const industries = [
  { id: "technology", name: "Technology" },
  { id: "finance", name: "Finance" },
  { id: "education", name: "Education" },
  { id: "healthcare", name: "Healthcare" },
  { id: "sales", name: "Sales" },
  { id: "marketing", name: "Marketing" },
];

const employeeRanges = [
  { id: "1-10", name: "1-10 employees" },
  { id: "11-50", name: "11-50 employees" },
  { id: "51-200", name: "51-200 employees" },
  { id: "201-500", name: "201-500 employees" },
  { id: "500+", name: "500+ employees" },
];

export default function CompanyPage({ companyData }) {
  const formRef = useRef(null);

  const [company, setCompany] = useState(companyData || null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [companyName, setCompanyName] = useState(companyData?.companyName || "");
  const [websiteUrl, setWebsiteUrl] = useState(companyData?.websiteUrl || "");
  const [industry, setIndustry] = useState(companyData?.industry || "");
  const [location, setLocation] = useState(companyData?.location || "");
  const [employeeCount, setEmployeeCount] = useState(
    companyData?.employeeCount || ""
  );
  const [description, setDescription] = useState(
    companyData?.description || ""
  );
  const [logoPreview, setLogoPreview] = useState(companyData?.logoUrl || "");
  const [logoFile, setLogoFile] = useState(null);

  const resetFormStates = () => {
    setCompanyName("");
    setWebsiteUrl("");
    setIndustry("");
    setLocation("");
    setEmployeeCount("");
    setDescription("");
    setLogoPreview("");
    setLogoFile(null);
  };

  const fillFormStates = (data) => {
    setCompanyName(data?.companyName || "");
    setWebsiteUrl(data?.websiteUrl || "");
    setIndustry(data?.industry || "");
    setLocation(data?.location || "");
    setEmployeeCount(data?.employeeCount || "");
    setDescription(data?.description || "");
    setLogoPreview(data?.logoUrl || "");
    setLogoFile(null);
  };

  const openRegisterForm = () => {
    resetFormStates();
    setIsFormOpen(true);
    setIsEditing(false);
  };

  const openEditForm = () => {
    fillFormStates(company);
    setIsFormOpen(true);
    setIsEditing(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
    setLogoFile(null);

    if (!company) {
      resetFormStates();
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const getStatusColor = (status) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "danger";
    return "warning";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!industry || !employeeCount) {
      alert("Please select industry and employee count range.");
      return;
    }

    setIsSubmitting(true);

    // TODO:
    // 1. Upload logoFile to imgdb/imgbb.
    // 2. Get uploaded logo URL.
    // 3. Save that URL in your database.
    const uploadedLogoUrl = logoPreview || company?.logoUrl || "";

    const companyPayload = {
      companyName,
      websiteUrl,
      industry,
      location,
      employeeCount,
      logoUrl: uploadedLogoUrl,
      description,
      status: company?.status || "pending",
    };

    console.log("Company payload:", companyPayload);

    setCompany(companyPayload);
    setIsSubmitting(false);
    setIsFormOpen(false);
    setIsEditing(false);
    setLogoFile(null);
  };

  if (!company && !isFormOpen) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-10">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="relative mb-8">
            <div className="h-32 w-32 rotate-[-3deg] rounded-3xl border border-neutral-800 bg-[#171719] shadow-2xl shadow-black/40" />
            <div className="absolute -right-3 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-xl">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>

          <h1 className="text-xl font-semibold text-white">
            Company not registered yet
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
            Set up your business profile to start posting high-performance job
            listings and manage your talent loop.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={openRegisterForm}
              className="h-11 rounded-xl bg-white px-7 text-sm font-bold text-black hover:bg-neutral-200"
            >
              Register your company
            </Button>

            <Button
              variant="ghost"
              className="h-11 rounded-xl border border-neutral-800 bg-[#181818] px-7 text-sm font-semibold text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              View FAQ
            </Button>
          </div>

          <p className="mt-10 text-xs text-neutral-600">
            Need specialized assistance? Contact our enterprise support team.
          </p>
        </div>
      </div>
    );
  }

  if (company && !isFormOpen) {
    return (
      <div className="flex w-full justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 bg-[#111113] shadow-2xl shadow-black/40">
          <div className="flex flex-col gap-4 border-b border-neutral-800 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <h1 className="text-2xl font-semibold text-white">
                Company Profile
              </h1>
              <p className="mt-1 text-sm text-neutral-400">
                Manage your registered company information.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Chip
                color={getStatusColor(company.status)}
                size="sm"
                variant="soft"
                className="capitalize"
              >
                {company.status}
              </Chip>

              <Button
                onClick={openEditForm}
                className="h-10 rounded-xl border border-neutral-800 bg-[#181818] px-4 text-sm font-semibold text-neutral-200 hover:bg-neutral-800"
              >
                <PencilToSquare className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 px-6 py-6 sm:px-8 md:grid-cols-[180px_1fr]">
            <div className="flex justify-center md:justify-start">
              <div className="h-32 w-32 overflow-hidden rounded-2xl border border-neutral-800 bg-black">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={company.companyName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-neutral-500">
                    <Briefcase className="h-8 w-8" />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard label="Company Name" value={company.companyName} />
              <InfoCard label="Industry" value={company.industry} />
              <InfoCard label="Website URL" value={company.websiteUrl} />
              <InfoCard label="Location" value={company.location} />
              <InfoCard label="Employees" value={company.employeeCount} />

              <div className="rounded-xl border border-neutral-800 bg-black px-4 py-3 sm:col-span-2">
                <p className="text-xs text-neutral-500">Description</p>
                <p className="mt-1 text-sm leading-6 text-neutral-300">
                  {company.description || "No description added."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-[720px] overflow-hidden rounded-2xl border border-neutral-800 bg-[#111113] shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between border-b border-neutral-800 px-6 py-6 sm:px-8">
          <div>
            <h1 className="text-xl font-semibold text-white">
              {isEditing ? "Edit Company" : "Register New Company"}
            </h1>

            <p className="mt-1 text-sm text-neutral-400">
              Enter your business details to start hiring on HireLoop.
            </p>
          </div>

          <button
            type="button"
            onClick={closeForm}
            className="text-2xl leading-none text-neutral-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          validationBehavior="aria"
          className="flex flex-col"
        >
          <div className="px-6 py-7 sm:px-8">
            <Fieldset className="border-0 p-0">
              <div className="grid grid-cols-1 gap-x-7 gap-y-6 md:grid-cols-2">
                <TextField isRequired name="companyName" className="w-full">
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Company Name
                  </Label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="h-[48px] rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                  />
                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>

                <DarkSelect
                  label="Industry / Category"
                  name="industry"
                  placeholder="Select industry"
                  items={industries}
                  selectedKey={industry}
                  onChange={setIndustry}
                />

                <TextField isRequired name="websiteUrl" className="w-full">
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Website URL
                  </Label>
                  <Input
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://www.company.com"
                    className="h-[48px] rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                  />
                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>

                <TextField isRequired name="location" className="w-full">
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Location
                  </Label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                      <House className="h-4 w-4" />
                    </span>

                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, Country"
                      className="h-[48px] rounded-lg border border-neutral-800 bg-[#1d1d1f] px-11 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                    />
                  </div>

                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>

                <DarkSelect
                  label="Employee Count Range"
                  name="employeeCount"
                  placeholder="Select range"
                  items={employeeRanges}
                  selectedKey={employeeCount}
                  onChange={setEmployeeCount}
                />

                <div>
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Company Logo
                  </Label>

                  <div className="flex items-center gap-4">
                    <label className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border border-dashed border-neutral-700 bg-[#1d1d1f] text-neutral-400 hover:border-neutral-500 hover:text-white">
                      <Briefcase className="h-5 w-5" />
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        Upload image
                      </p>
                      <p className="text-xs text-neutral-500">
                        PNG, JPG up to 5MB
                      </p>
                    </div>

                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="ml-auto h-12 w-12 rounded-lg border border-neutral-800 object-cover"
                      />
                    )}
                  </div>
                </div>

                <TextField name="description" className="md:col-span-2">
                  <Label className="mb-2 block text-sm font-semibold text-neutral-300">
                    Brief Description
                  </Label>

                  <TextArea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your company's mission and culture..."
                    className="min-h-[120px] resize-y rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
                  />

                  <FieldError className="mt-1 text-xs text-red-400" />
                </TextField>
              </div>
            </Fieldset>
          </div>

          <div className="border-t border-neutral-800 bg-[#1c1c1e] px-6 py-5 sm:px-8">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                onClick={closeForm}
                variant="ghost"
                className="h-11 rounded-xl border border-neutral-800 px-7 text-sm font-semibold text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-xl bg-white px-8 text-sm font-bold text-black hover:bg-neutral-200 disabled:opacity-60"
              >
                {isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Registering..."
                  : isEditing
                  ? "Update Company"
                  : "Register Company"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-black px-4 py-3">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-neutral-200">
        {value || "N/A"}
      </p>
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

  return (
    <div ref={dropdownRef} className="relative w-full">
      <input type="hidden" name={name} value={selectedKey || ""} />

      <Label className="mb-2 block text-sm font-semibold text-neutral-300">
        {label}
      </Label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[48px] w-full items-center justify-between rounded-lg border border-neutral-800 bg-[#1d1d1f] px-4 text-left text-sm text-white outline-none hover:bg-[#222224] focus:border-neutral-600"
      >
        <span className={selectedItem ? "text-white" : "text-neutral-500"}>
          {selectedItem ? selectedItem.name : placeholder}
        </span>

        <ArrowDown
          className={`h-4 w-4 text-neutral-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full rounded-xl border border-neutral-800 bg-[#1d1d1f] p-1 shadow-2xl shadow-black/40">
          {items.map((item) => {
            const isSelected = selectedKey === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onChange(item.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-neutral-800 ${
                  isSelected ? "bg-neutral-800 text-white" : "text-neutral-300"
                }`}
              >
                {item.name}
                {isSelected && <Check className="h-4 w-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}