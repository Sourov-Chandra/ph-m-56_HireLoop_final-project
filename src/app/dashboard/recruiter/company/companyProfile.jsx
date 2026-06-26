/* hireloop\src\app\dashboard\recruiter\company\page.jsx */
"use client";

import { createCompany } from "@/lib/actions/companies";
import { toast } from "@heroui/react";
import React, { useState } from "react";
import {
  FiPlus,
  FiEdit3,
  FiGlobe,
  FiMapPin,
  FiBriefcase,
  FiUsers,
  FiUploadCloud,
  FiX,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";

export default function CompanyProfile({ recruiter }) {
  // Safe extraction with fallback to avoid runtime errors if prop is missing
  const recruiterId = recruiter?.id;

  console.log("Recruiter Data from Company Profile:", recruiterId);

  const [company, setCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    industry: "Technology",
    website: "",
    location: "",
    employeeCount: "1-10 employees",
    logo: "",
    description: "",
    status: "Pending",
    recruiterId: recruiterId || "", // Safely link on mount
  });

  // Handle Image Upload to ImgBB
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const imgBbApiKey = process.env.NEXT_PUBLIC_IMAGE_API;
    const body = new FormData();
    body.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgBbApiKey}`,
        {
          method: "POST",
          body: body,
        },
      );
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, logo: data.data.url }));
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Open Modal for Editing
  const handleEditClick = () => {
    // Keep the existing company details and strictly enforce the recruiterId relation
    setFormData({
      ...company,
      recruiterId: recruiterId,
    });
    setIsModalOpen(true);
  };

  // Submit Form (Register or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCompanyData = {
      name: formData.name,
      industry: formData.industry,
      website: formData.website,
      location: formData.location,
      employeeCount: formData.employeeCount,
      logo: formData.logo,
      description: formData.description,
      status: formData.status,
      recruiterId: recruiterId, // Explicitly enforce original source ID on submit
    };

    try {
      const payload = await createCompany(newCompanyData);

      setCompany(newCompanyData);
      console.log("Form Submitted Successfully! 🚀", newCompanyData);
      toast.success(
        company
          ? "Company updated successfully!"
          : "Company registered successfully!",
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to process company details. Please try again.");
    }
  };

  // Helper for Status Badge styling
  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };

    const currentStyle = styles[status] || styles.Pending;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${currentStyle}`}
      >
        {status === "Approved" && <FiCheckCircle />}
        {status === "Pending" && <FiClock />}
        {status === "Rejected" && <FiAlertCircle />}
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-5 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Company</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Manage your business profile and hiring presence.
            </p>
          </div>
          {company && (
            <button
              onClick={handleEditClick}
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-zinc-700"
            >
              <FiEdit3 /> Edit Profile
            </button>
          )}
        </div>

        {/* STATE 1: NO COMPANY REGISTERED */}
        {!company ? (
          <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-zinc-400 mb-4">
              <FiBriefcase className="text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-200">
              No Company Registered
            </h3>
            <p className="text-sm text-zinc-400 max-w-sm mt-1 mb-6">
              You haven't setup a company profile yet. Register your business
              details to start posting jobs.
            </p>
            <button
              onClick={() => {
                setFormData({
                  name: "",
                  industry: "Technology",
                  website: "",
                  location: "",
                  employeeCount: "1-10 employees",
                  logo: "",
                  description: "",
                  status: "Pending",
                  recruiterId: recruiterId, // Linked dynamically when registering
                });
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <FiPlus className="text-lg" /> Register Company
            </button>
          </div>
        ) : (
          /* STATE 2: COMPANY DETAILS VIEW */
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-20 h-20 rounded-xl object-cover border border-zinc-800 bg-zinc-900"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl uppercase">
                    {company.name ? company.name.substring(0, 2) : "CO"}
                  </div>
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">
                      {company.name}
                    </h2>
                    {getStatusBadge(company.status)}
                  </div>
                  <p className="text-zinc-400 text-sm mt-1 flex items-center gap-2">
                    <FiBriefcase className="text-zinc-500" /> {company.industry}
                  </p>
                </div>
              </div>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-800/60 text-sm text-zinc-300">
              <div className="flex items-center gap-3 p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-800/40">
                <FiGlobe className="text-zinc-500 text-base shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500">Website</p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline break-all mt-0.5 inline-block"
                  >
                    {company.website || "Not provided"}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-800/40">
                <FiMapPin className="text-zinc-500 text-base shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500">Location</p>
                  <p className="font-medium mt-0.5 text-zinc-200">
                    {company.location || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-800/40">
                <FiUsers className="text-zinc-500 text-base shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500">Company Size</p>
                  <p className="font-medium mt-0.5 text-zinc-200">
                    {company.employeeCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t border-zinc-800/60">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                About Company
              </h4>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-zinc-900/20 p-4 rounded-xl border border-zinc-800/50">
                {company.description || "No description provided yet."}
              </p>
            </div>
          </div>
        )}

        {/* --- DIALOG MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-[#121214] border border-zinc-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Title Banner */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {company
                      ? "Update Company Details"
                      : "Register New Company"}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Enter your business details to start hiring on HireLoop.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <hr className="border-zinc-800" />

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Corp"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:outline-hidden focus:border-zinc-700 transition-colors"
                    />
                  </div>

                  {/* Industry / Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Industry / Category
                    </label>
                    <div className="relative">
                      <select
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                        className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white appearance-none focus:outline-hidden focus:border-zinc-700 transition-colors"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="Design & Creative">
                          Design & Creative
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Website URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Website URL
                    </label>
                    <div className="flex rounded-lg overflow-hidden border border-zinc-800 bg-[#1c1c1e]">
                      <span className="bg-[#242426] px-3 py-2 text-sm text-zinc-500 select-none border-r border-zinc-800">
                        https://
                      </span>
                      <input
                        type="text"
                        placeholder="www.company.com"
                        value={formData.website.replace(/^https?:\/\//, "")}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            website: `https://${e.target.value}`,
                          })
                        }
                        className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Location
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3.5 top-3 text-zinc-500 text-sm" />
                      <input
                        type="text"
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-lg pl-10 pr-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:outline-hidden focus:border-zinc-700 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Employee Count Range */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Employee Count Range
                    </label>
                    <div className="relative">
                      <select
                        value={formData.employeeCount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            employeeCount: e.target.value,
                          })
                        }
                        className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white appearance-none focus:outline-hidden focus:border-zinc-700 transition-colors"
                      >
                        <option value="1-10 employees">1-10 employees</option>
                        <option value="11-50 employees">11-50 employees</option>
                        <option value="51-200 employees">
                          51-200 employees
                        </option>
                        <option value="201-500 employees">
                          201-500 employees
                        </option>
                        <option value="500+ employees">500+ employees</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Company Logo Upload Component */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Company Logo
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#242426] border border-dashed border-zinc-700 cursor-pointer hover:border-zinc-500 transition-colors shrink-0">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                        <FiUploadCloud className="text-zinc-400 text-lg" />
                      </label>
                      <div className="text-xs">
                        <p className="font-medium text-zinc-300">
                          {isUploading
                            ? "Uploading..."
                            : formData.logo
                              ? "Logo uploaded!"
                              : "Upload image"}
                        </p>
                        <p className="text-zinc-500 mt-0.5">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                      {formData.logo && (
                        <img
                          src={formData.logo}
                          alt="Preview"
                          className="w-10 h-10 object-cover rounded-md border border-zinc-800 ml-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Brief Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Brief Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your company's mission and culture..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:outline-hidden focus:border-zinc-700 transition-colors resize-none"
                  />
                </div>

                {/* Modal Actions Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold rounded-lg text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/60 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-50"
                  >
                    {company ? "Save Changes" : "Register Company"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
