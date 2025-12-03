"use client";

import Image from "next/image";
import { MapPin, CheckCircle } from "lucide-react";

function FindInstaller() {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* Left Side Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/mechanic.jpg" // apni image ka true path rakhna
            alt="Installer Person"
            width={350}
            height={350}
            className="object-contain"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2">

          {/* Title */}
          <h2 className="text-xl font-semibold flex items-start gap-2">
            <MapPin className="text-yellow-500 w-6 h-6 mt-1" />
            Convenient: have your tires mounted at one <br />
            of our 2,000+ mounting partners.
          </h2>

          {/* Subheading */}
          <h3 className="text-xl font-bold mt-4">So much easier.</h3>

          {/* Description */}
          <p className="text-gray-600 mt-2">
            We will send your tires directly to our installation partner near you.
            <br />
            No more lugging your tires around. That’s a bonus!
          </p>

          {/* Form Section */}
          <label className="block mt-6 text-sm font-medium">
            Enter your postal code or city:
          </label>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <input
              type="text"
              placeholder="Postal code or city"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />

            <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md whitespace-nowrap">
              Find installation partners
            </button>
          </div>

          {/* Footer small green icon */}
          <div className="flex items-center gap-2 mt-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-xs text-gray-600">
              Largest garage network in the Netherlands
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FindInstaller;
