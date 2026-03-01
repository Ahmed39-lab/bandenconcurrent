"use client";

import Image from "next/image";
import { MapPin, CheckCircle } from "lucide-react";

function FindInstaller() {
  return (
    <section className="max-w-full mx-auto border-t border-neutral-800 py-16 px-4 bg-black text-white shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* Left Side Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/mechanic.jpg"
            alt="Installer Person"
            width={350}
            height={350}
            className="object-contain rounded-md shadow-md"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2 space-y-4">

          {/* Title */}
          <h2 className="text-xl font-semibold flex items-start gap-2" style={{ color: "#fded5b" }}>
            <MapPin className="w-6 h-6 mt-1" style={{ color: "#fded5b" }} />
            Convenient: have your tires mounted at one <br />
            of our 2,000+ mounting partners.
          </h2>

          {/* Subheading */}
          <h3 className="text-2xl font-bold mt-2" style={{ color: "#fded5b" }}>
            So much easier.
          </h3>

          {/* Description */}
          <p className="text-gray-300 mt-2">
            We will send your tires directly to our installation partner near you.
            <br />
            No more lugging your tires around. That’s a bonus!
          </p>

          {/* Form Section */}
          <label className="block mt-6 text-sm font-medium" style={{ color: "#fded5b" }}>
            Enter your postal code or city:
          </label>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <input
              type="text"
              placeholder="Postal code or city"
              className="border rounded-md px-4 py-2 w-full bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2"
              style={{ borderColor: "#fded5b" }}
            />

            <button
              className="text-black font-medium px-6 py-2 rounded-md whitespace-nowrap transition"
              style={{ backgroundColor: "#fded5b" }}
            >
              Find installation partners
            </button>
          </div>

          {/* Footer small green icon */}
          <div className="flex items-center gap-2 mt-3">
            <CheckCircle className="w-4 h-4 text-[#fded5b]" />
            <p className="text-xs text-gray-400">
              Largest garage network in the Netherlands
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FindInstaller;