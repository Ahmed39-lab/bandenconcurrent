"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Range, getTrackBackground } from "react-range";
import Image from "next/image";

export default function Variations() {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const minPrice = 0;
  const maxPrice = 5000;

  const updateFilters = () => {
    const searchParams = new URLSearchParams(window.location.search);

    if (selectedCategory) searchParams.set("category", selectedCategory);
    else searchParams.delete("category");

    if (selectedType) searchParams.set("type", selectedType);
    else searchParams.delete("type");

    searchParams.set("price_min", String(priceRange[0]));
    searchParams.set("price_max", String(priceRange[1]));

    const queryString = searchParams.toString();
    router.push(`/sizes/Tyre45-78${queryString ? `/?${queryString}` : ""}`);
  };

  return (
    <section>
      <div className="max-w-[1200px] mx-auto mt-8 text-black">

        {/* Breadcrumb */}
        <div className="mb-6 text-sm md:text-base flex justify-between text-gray-600">
          <div>Home / Tyres / </div>
          <div className="font-medium">Sort By: Popular</div>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar Filters */}
          <aside className="w-full md:w-1/4 space-y-6">
            <h2 className="font-semibold text-3xl mb-2">Filters</h2>

            {/* Price Range */}
            <div className="p-3">
              <label className="block mb-4 font-medium text-lg">
                Price Range: {priceRange[0]} - {priceRange[1]}
              </label>

              <Range
                step={50}
                min={minPrice}
                max={maxPrice}
                values={priceRange}
                onChange={(values) => setPriceRange([values[0], values[1]])}
                onFinalChange={updateFilters}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      background: getTrackBackground({
                        values: priceRange,
                        colors: ["#000", "#000", "#000"],
                        min: minPrice,
                        max: maxPrice,
                      }),
                      borderRadius: "3px",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => {
                  const { key, ...restProps } = props;
                  return (
                    <div
                      key={index}
                      {...restProps}
                      className="h-5 w-5 bg-black rounded-full border-2 border-black shadow"
                    />
                  );
                }}
              />
            </div>

            {/* Category */}
            <div
              className="p-3 cursor-pointer bg-[#f8f8f8] rounded-lg"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <div className="flex justify-between items-center text-lg">
                <span>
                  Category {selectedCategory && `: ${selectedCategory}`}
                </span>
                <ChevronDown
                  size={20}
                  className={`${categoryOpen ? "rotate-180" : ""} transition-transform`}
                />
              </div>

              {categoryOpen && (
                <ul className="mt-3 space-y-2 text-base">
                  {["Tyre A", "Tyre B", "Tyre C"].map((cat) => (
                    <li
                      key={cat}
                      className="hover:text-black cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(cat);
                        updateFilters();
                      }}
                    >
                      {cat}
                    </li>
                  ))}

                  <li
                    className="hover:text-black cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(null);
                      updateFilters();
                    }}
                  >
                    All
                  </li>
                </ul>
              )}
            </div>

            {/* Tyre Type */}
            <div
              className="p-3 cursor-pointer bg-[#f8f8f8] rounded-lg"
              onClick={() => setTypeOpen(!typeOpen)}
            >
              <div className="flex justify-between items-center text-lg">
                <span>
                  Tyre Type {selectedType && `: ${selectedType}`}
                </span>
                <ChevronDown
                  size={20}
                  className={`${typeOpen ? "rotate-180" : ""} transition-transform`}
                />
              </div>

              {typeOpen && (
                <ul className="mt-3 space-y-2 text-base">
                  <li
                    className="hover:text-black cursor-pointer"
                    onClick={() => {
                      setSelectedType("summer");
                      updateFilters();
                    }}
                  >
                    Summer
                  </li>
                  <li
                    className="hover:text-black cursor-pointer"
                    onClick={() => {
                      setSelectedType("winter");
                      updateFilters();
                    }}
                  >
                    Winter
                  </li>
                  <li
                    className="hover:text-black cursor-pointer"
                    onClick={() => {
                      setSelectedType(null);
                      updateFilters();
                    }}
                  >
                    All
                  </li>
                </ul>
              )}
            </div>
          </aside>

          {/* Product Listing */}
          <main className="w-full md:w-3/4 p-4">
            <h2 className="text-4xl font-bold mb-6">Products for size: Tyre45-78</h2>

            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition flex gap-4 items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={`${baseUrl}/images/logo.PNG`}
                      width={110}
                      height={110}
                      alt="Demo Tyre"
                      className="rounded-md"
                    />

                    <div>
                      <h3 className="font-semibold text-xl">
                        Hankook Winter i*cept RS3 (W462)
                      </h3>
                      <p className="text-lg font-medium text-gray-700 mt-2">
                        Price: <span className="text-black">$100</span>
                      </p>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg text-gray-600">Looking At</h3>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
