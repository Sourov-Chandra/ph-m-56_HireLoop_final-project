// app/components/HeroSection.tsx (or your component)
"use client";

import React from "react";
import { FiBriefcase, FiUsers, FiSmile } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/globe.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Dark Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Spacer to push content down (optional) */}
      <div className="flex-1" />

      {/* Main Content - Centered vertically */}
      <div className="relative z-10 max-w-7xl mx-auto mb-7 md:mb-17 px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        {/*  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
          <span className="text-green-400 font-bold text-sm">$6,000+</span>
          <span className="text-white text-sm">NEW JOBS THIS MONTH</span>
        </div> */}

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-12 leading-tight">
          Find Your
          <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {" "}
            Dream Job
          </span>
          <br />
          Today
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role – Faster.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Browse Jobs →
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
            Post a Job
          </button>
        </div>
      </div>

      {/* Stats Section - Stays at Bottom */}
      <div className="relative z-10 w-full pb-8 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:transform hover:-translate-y-1 text-center">
              <div className="flex items-center justify-center mb-2">
                <FiBriefcase className="text-blue-400 text-2xl" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white text-center">
                50K
              </div>
              <div className="text-sm text-gray-300">Active Jobs</div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:transform hover:-translate-y-1 text-center">
              <div className="flex items-center justify-center mb-2">
                <FiUsers className="text-green-400 text-2xl" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white text-center">
                12K
              </div>
              <div className="text-sm text-gray-300">Companies</div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:transform hover:-translate-y-1 text-center">
              <div className="flex items-center justify-center mb-2">
                <IoStatsChart className="text-purple-400 text-2xl" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white text-center">
                2M
              </div>
              <div className="text-sm text-gray-300">Job Seekers</div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:transform hover:-translate-y-1 text-center">
              <div className="flex items-center justify-center mb-2">
                <FiSmile className="text-yellow-400 text-2xl" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white text-center">
                97%
              </div>
              <div className="text-sm text-gray-300">Satisfaction Rate</div>
            </div>
          </div>

          {/* Helper Text */}
          <p className="text-gray-300 text-sm text-center mt-6">
            Assisting over 15,000 job seekers find their dream positions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
