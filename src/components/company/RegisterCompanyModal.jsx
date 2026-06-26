// src/components/company/RegisterCompanyModal.jsx
"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineMapPin, HiPlus, HiXMark } from "react-icons/hi2";
import { uploadToImgBB } from "@/utils/uploadImage";

export default function RegisterCompanyModal({
  isOpen,
  onClose,
  onSaveSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    location: "",
    employeeCount: "",
    description: "",
  });

  // Handle escape key to close modal natively
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Marketing",
  ];
  const employeeRanges = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "500+ employees",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let logoUrl = "";
      if (logoFile) {
        logoUrl = await uploadToImgBB(logoFile);
      }

      const finalData = { ...formData, logo: logoUrl };

      const res = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        const savedCompany = await res.json();
        onSaveSuccess(savedCompany);
        onClose();
      }
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
      
        console.log("Submission company profile data:", finalData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container Body */}
      <div className="relative bg-zinc-900 border border-zinc-800 text-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header section */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div>
            <h2 className="text-xl font-bold tracking-wide text-zinc-100">
              Register New Company
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Enter your business details to start hiring on HireLoop.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 cursor-pointer transition-all"
          >
            <HiXMark size={20} />
          </button>
        </div>

        {/* Scrollable contents box */}
        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {/* Input fields with outside floating headers */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Company Name
              </label>
              <input
                required
                type="text"
                name="name"
                placeholder="e.g. Acme Corp"
                onChange={handleInputChange}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-sm rounded-lg px-3 py-2.5 transition-all text-zinc-100 placeholder-zinc-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Industry / Category
              </label>
              <select
                required
                name="industry"
                onChange={handleInputChange}
                defaultValue=""
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-sm rounded-lg px-3 py-2.5 transition-all text-zinc-100 appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-zinc-500">
                  Select industry
                </option>
                {industries.map((ind) => (
                  <option
                    key={ind}
                    value={ind}
                    className="text-zinc-100 bg-zinc-950"
                  >
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Website URL
              </label>
              <div className="relative flex items-center">
                {/* was text-zinc-600 — nearly invisible on bg-zinc-950, bumped to zinc-500 */}
                <span className="absolute left-3 text-sm text-zinc-500 select-none">
                  https://
                </span>
                <input
                  type="text"
                  name="website"
                  placeholder="www.company.com"
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-sm rounded-lg pl-[64px] pr-3 py-2.5 transition-all text-zinc-100 placeholder-zinc-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Location
              </label>
              <div className="relative flex items-center">
                <HiOutlineMapPin
                  className="absolute left-3 text-zinc-500"
                  size={16}
                />
                <input
                  required
                  type="text"
                  name="location"
                  placeholder="City, Country"
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-sm rounded-lg pl-9 pr-3 py-2.5 transition-all text-zinc-100 placeholder-zinc-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Employee Count Range
              </label>
              <select
                required
                name="employeeCount"
                onChange={handleInputChange}
                defaultValue=""
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-sm rounded-lg px-3 py-2.5 transition-all text-zinc-100 appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-zinc-500">
                  Select range
                </option>
                {employeeRanges.map((range) => (
                  <option
                    key={range}
                    value={range}
                    className="text-zinc-100 bg-zinc-950"
                  >
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Logo box */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Company Logo
              </label>
              <label className="flex items-center justify-center gap-3 w-full h-[41px] bg-zinc-950 border border-dashed border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 rounded-lg cursor-pointer transition-all px-3">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Preview"
                    className="h-6 w-6 object-cover rounded-md"
                  />
                ) : (
                  <HiPlus className="text-zinc-400" size={16} />
                )}
                <div className="text-left flex items-center gap-1.5">
                  <p className="text-xs font-medium text-zinc-300">
                    Upload image logo
                  </p>
                  <p className="text-[10px] text-zinc-500">(Max 5MB)</p>
                </div>
              </label>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-zinc-300">
                Brief Description
              </label>
              <textarea
                name="description"
                placeholder="Tell us about your company's mission and culture..."
                rows={4}
                onChange={handleInputChange}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 outline-none text-sm rounded-lg px-3 py-2.5 transition-all text-zinc-100 placeholder-zinc-500 resize-none"
              />
            </div>
          </div>

          {/* Footer actions bar */}
          <div className="flex justify-end gap-3 p-6 border-t border-zinc-800 bg-zinc-900">
            <button
              type="button"
              onClick={onClose}
              className="border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-white hover:bg-zinc-100 disabled:bg-zinc-700 disabled:text-zinc-400 text-black text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all shadow flex items-center gap-2"
            >
              {loading && (
                <div className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
              )}
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
