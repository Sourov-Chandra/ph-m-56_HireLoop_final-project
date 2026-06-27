/* hireloop\src\app\dashboard\recruiter\jobs\new\page.jsx */
"use client";

import { createJob } from "@/lib/actions/jobs";
import { toast } from "@heroui/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image"; // Added for optimized logo rendering
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  Button,
  SelectValue,
  ListBox,
  ListBoxItem,
  Popover,
  Switch,
} from "react-aria-components";
import {
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiChevronDown,
} from "react-icons/fi";
import { HiMiniBanknotes, HiOutlineSparkles } from "react-icons/hi2";

export default function PostJobForm({ companyInfo }) {
  if (!companyInfo) return null; // Handle the case where companyInfo is undefined
  console.log("Company Info:", companyInfo);

  const isLimitReached = companyInfo.jobsUsed >= companyInfo.jobLimit;
  const [isRemote, setIsRemote] = useState(false);

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLimitReached) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (isRemote) {
      data.location = "Remote";
    }

    const payload = {
      ...data,
      companyId: companyInfo._id,
      status: "active",
      isPubliclyVisible: true,
    };
    console.log("Post Job Payload:", payload);
    const res = await createJob(payload);
    if (res.insertedId) {
      e.target.reset();
      redirect("/dashboard/recruiter/jobs");
      toast.success("Job posted successfully!");
    }
  }; */


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLimitReached) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (isRemote) {
      data.location = "Remote";
    }

    const payload = {
      ...data,
      companyId: companyInfo._id,

      // Map these fields specifically for your JobCard component requirements
      companyName: companyInfo.name,
      companyLogo: companyInfo.logo || "", // Default to empty string if no explicit logo field exists
      status: "active",
      isPubliclyVisible: true,
    };

    console.log("Post Job Payload:", payload);
    const res = await createJob(payload);
    if (res.insertedId) {
      e.target.reset();
      redirect("/dashboard/recruiter/jobs");
      toast.success("Job posted successfully!");
    }
  };


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 flex justify-center items-center relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden relative z-10">
        {/* Enhanced Header with Company Logo & Name */}
        <div className="p-8 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Post a New Job
            </h1>
            <p className="text-sm text-zinc-400 mt-2">
              Fill out the details below to publish your job opening on
              HireLoop.
            </p>
          </div>

          {/* Top-Right Company Badge */}
          <div className="flex items-center gap-3 bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-3 self-start sm:self-center">
            {companyInfo.logo ? (
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-700/50 bg-zinc-800">
                <Image
                  src={companyInfo.logo}
                  alt={`${companyInfo.name} Logo`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="font-bold text-white text-sm">
                  {companyInfo.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                Recruiter
              </span>
              <span className="text-sm font-semibold text-zinc-200">
                {companyInfo.name}
              </span>
            </div>
          </div>
        </div>

        <Form onSubmit={handleSubmit} className="p-8 space-y-10">
          {/* Section 1: Job Info */}
          <div className="space-y-6 w-full">
            <h2 className="text-base font-semibold text-white flex items-center gap-3">
              <div className="p-1.5 bg-zinc-800 rounded-lg border border-zinc-700/50">
                <FiBriefcase className="text-indigo-400" size={14} />
              </div>
              Job Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <TextField
                isRequired
                name="jobTitle"
                className="flex flex-col gap-2"
              >
                <Label className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
                  Job Title <span className="text-red-400">*</span>
                </Label>
                <Input
                  placeholder="e.g. Senior React Developer"
                  className="w-full h-11 px-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none placeholder:text-zinc-600 transition-all duration-200 hover:border-zinc-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </TextField>

              {/* Job Category Select */}
              <Select name="jobCategory" className="flex flex-col gap-2 w-full">
                <Label className="text-sm font-medium text-zinc-300">
                  Job Category
                </Label>
                <Button className="flex items-center justify-between w-full h-11 px-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none text-left transition-all duration-200 hover:border-zinc-700 data-[pressed]:border-indigo-500 data-[pressed]:ring-4 data-[pressed]:ring-indigo-500/10">
                  <SelectValue className="text-white data-[placeholder]:text-zinc-600" />
                  <FiChevronDown
                    className="text-zinc-500 transition-transform duration-200 data-[open]:rotate-180"
                    size={16}
                  />
                </Button>
                <Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden mt-2 text-white min-w-[trigger-width] backdrop-blur-xl z-50">
                  <ListBox className="p-1.5 outline-none">
                    {["Technology", "Design", "Marketing", "Management"].map(
                      (cat) => (
                        <ListBoxItem
                          key={cat}
                          id={cat.toLowerCase()}
                          className="px-3 py-2 rounded-lg cursor-pointer text-sm outline-none transition-colors bg-transparent hover:bg-zinc-800 text-zinc-300 data-[selected]:bg-indigo-600 data-[selected]:text-white data-[focused]:bg-zinc-800"
                        >
                          {cat}
                        </ListBoxItem>
                      ),
                    )}
                  </ListBox>
                </Popover>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Type Select */}
              <Select name="jobType" className="flex flex-col gap-2 w-full">
                <Label className="text-sm font-medium text-zinc-300">
                  Job Type
                </Label>
                <Button className="flex items-center justify-between w-full h-11 px-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none text-left transition-all duration-200 hover:border-zinc-700 data-[pressed]:border-indigo-500 data-[pressed]:ring-4 data-[pressed]:ring-indigo-500/10">
                  <SelectValue className="text-white data-[placeholder]:text-zinc-600" />
                  <FiChevronDown
                    className="text-zinc-500 transition-transform duration-200 data-[open]:rotate-180"
                    size={16}
                  />
                </Button>
                <Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden mt-2 text-white min-w-[trigger-width] backdrop-blur-xl z-50">
                  <ListBox className="p-1.5 outline-none">
                    {[
                      "Full-time",
                      "Part-time",
                      "Remote",
                      "Contract",
                      "Internship",
                    ].map((type) => (
                      <ListBoxItem
                        key={type}
                        id={type.toLowerCase()}
                        className="px-3 py-2 rounded-lg cursor-pointer text-sm outline-none transition-colors bg-transparent hover:bg-zinc-800 text-zinc-300 data-[selected]:bg-indigo-600 data-[selected]:text-white data-[focused]:bg-zinc-800"
                      >
                        {type}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </Select>

              {/* Deadline */}
              <TextField
                isRequired
                name="deadline"
                className="flex flex-col gap-2"
              >
                <Label className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
                  <FiCalendar size={14} className="text-zinc-500" /> Application
                  Deadline <span className="text-red-400">*</span>
                </Label>
                <Input
                  type="date"
                  className="w-full h-11 px-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none transition-all duration-200 hover:border-zinc-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 [color-scheme:dark]"
                />
              </TextField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* Location */}
              <TextField
                isRequired={!isRemote}
                name="location"
                className="md:col-span-1 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
                    <FiMapPin size={14} className="text-zinc-500" /> Location
                  </Label>
                  <Switch
                    isSelected={isRemote}
                    onChange={setIsRemote}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <div className="relative w-9 h-5 bg-zinc-800 rounded-full transition-colors duration-200 border border-zinc-700 group-data-[selected]:bg-indigo-600 group-data-[selected]:border-indigo-500">
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 group-data-[selected]:translate-x-4" />
                    </div>
                    <span className="text-xs font-medium text-zinc-400 group-data-[selected]:text-white transition-colors">
                      Remote
                    </span>
                  </Switch>
                </div>
                <Input
                  placeholder={
                    isRemote ? "Remote (Worldwide)" : "City, Country"
                  }
                  disabled={isRemote}
                  className="w-full h-11 px-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none disabled:opacity-40 disabled:cursor-not-allowed placeholder:text-zinc-600 transition-all duration-200 hover:border-zinc-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </TextField>

              {/* Salary Configurations Grid */}
              <div className="grid grid-cols-3 gap-4 md:col-span-2">
                {/* Currency Selection */}
                <Select
                  name="currency"
                  isRequired
                  className="flex flex-col gap-2 w-full"
                >
                  <Label className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
                    <HiMiniBanknotes size={14} className="text-zinc-500" />{" "}
                    Currency <span className="text-red-400">*</span>
                  </Label>
                  <Button className="flex items-center justify-between w-full h-11 px-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none text-left transition-all duration-200 hover:border-zinc-700 data-[pressed]:border-indigo-500 data-[pressed]:ring-4 data-[pressed]:ring-indigo-500/10">
                    <SelectValue className="text-white data-[placeholder]:text-zinc-600" />
                    <FiChevronDown
                      className="text-zinc-500 transition-transform duration-200 data-[open]:rotate-180"
                      size={16}
                    />
                  </Button>
                  <Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden mt-2 text-white min-w-[trigger-width] backdrop-blur-xl z-50">
                    <ListBox className="p-1.5 outline-none">
                      {[
                        { label: "BDT (Taka)", value: "bdt" },
                        { label: "USD (Dollar)", value: "usd" },
                        { label: "EUR (Euro)", value: "eur" },
                      ].map((curr) => (
                        <ListBoxItem
                          key={curr.value}
                          id={curr.value}
                          className="px-3 py-2 rounded-lg cursor-pointer text-sm outline-none transition-colors bg-transparent hover:bg-zinc-800 text-zinc-300 data-[selected]:bg-indigo-600 data-[selected]:text-white data-[focused]:bg-zinc-800"
                        >
                          {curr.label}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                </Select>

                {/* Min Salary */}
                <TextField
                  isRequired
                  name="minSalary"
                  className="flex flex-col gap-2"
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Min Salary <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none placeholder:text-zinc-600 transition-all duration-200 hover:border-zinc-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </TextField>

                {/* Max Salary */}
                <TextField
                  isRequired
                  name="maxSalary"
                  className="flex flex-col gap-2"
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Max Salary <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none placeholder:text-zinc-600 transition-all duration-200 hover:border-zinc-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </TextField>
              </div>
            </div>
          </div>

          {/* Section 2: Details */}
          <div className="space-y-6 w-full">
            <h2 className="text-base font-semibold text-white flex items-center gap-3">
              <div className="p-1.5 bg-zinc-800 rounded-lg border border-zinc-700/50">
                <FiClock className="text-indigo-400" size={14} />
              </div>
              Job Details & Requirements
            </h2>

            {/* Description */}
            <TextField
              isRequired
              name="description"
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-medium text-zinc-300">
                Job Description & Responsibilities{" "}
                <span className="text-red-400">*</span>
              </Label>
              <TextArea
                rows={4}
                placeholder="Tell candidates about the core responsibilities and daily tasks..."
                className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none placeholder:text-zinc-600 resize-none transition-all duration-200 hover:border-zinc-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </TextField>

            {/* Requirements */}
            <TextField
              isRequired
              name="requirements"
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-medium text-zinc-300">
                Requirements <span className="text-red-400">*</span>
              </Label>
              <TextArea
                rows={4}
                placeholder="List required skills, experience levels, or certifications..."
                className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none placeholder:text-zinc-600 resize-none transition-all duration-200 hover:border-zinc-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </TextField>

            {/* Benefits */}
            <TextField name="benefits" className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-zinc-300">
                Benefits (Optional)
              </Label>
              <TextArea
                rows={3}
                placeholder="Healthcare, flexible hours, learning budget, etc..."
                className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 text-white shadow-inner shadow-black/20 text-sm outline-none placeholder:text-zinc-600 resize-none transition-all duration-200 hover:border-zinc-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </TextField>
          </div>

          {/* Section 3: Native Styled Banner updated with real company logo */}
          <div className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl flex flex-row items-center justify-between flex-wrap gap-4 p-5">
            <div className="flex flex-row items-center gap-4">
              {companyInfo.logo ? (
                <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-800 shadow-lg shadow-black/30">
                  <Image
                    src={companyInfo.logo}
                    alt={`${companyInfo.name} Logo`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="font-bold text-white text-base">
                    {companyInfo.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-white">
                  Posting as {companyInfo.name}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Plan:{" "}
                  <span className="text-indigo-400 font-semibold">
                    {companyInfo.plan}
                  </span>{" "}
                  • {companyInfo.jobsUsed}/{companyInfo.jobLimit} active jobs
                  used
                </p>
              </div>
            </div>

            {isLimitReached && (
              <div className="text-xs bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                <HiOutlineSparkles size={14} className="text-red-400" /> Upgrade
                your plan to post more jobs.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800/80 w-full">
            <Button
              type="button"
              className="text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 outline-none cursor-pointer hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isDisabled={isLimitReached}
              className={`font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 text-sm outline-none cursor-pointer shadow-lg ${
                isLimitReached
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700 shadow-none"
                  : "bg-gradient-to-b from-indigo-500 to-indigo-600 text-white hover:from-indigo-400 hover:to-indigo-500 shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              Post Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
