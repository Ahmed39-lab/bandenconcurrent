/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { ChevronDown, ArrowUpDown, X } from "lucide-react";

import { useRouter } from "next/navigation";
import { Range, getTrackBackground } from "react-range";
import Loading from "../../sizes/loading";
import Link from "next/link";

export default function Variations({ data, slug }) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
  const timeoutRef = useRef(null);

  /* ================= STATES ================= */
  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [catOpen, setCatOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [productTypeOpen, setProductTypeOpen] = useState(false);

  const [newSlug, setNewSlug] = useState(slug);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [isLoading, setIsLoading] = useState(false);

  const [filtersForm, setFiltersForm] = useState({
    width: "",
    height: "",
    size: "",
  });

  const minPrice = 0;
  const maxPrice = 5000;

  /* ================= QUERY ================= */
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (selectedProductType.length)
      params.set("productType", selectedProductType.join(","));

    if (selectedBrands.length)
      params.set("brand", selectedBrands.join(","));

    if (selectedCategories.length)
      params.set("category", selectedCategories.join(","));

    if (priceRange[0] > 0 || priceRange[1] < 5000) {
      params.set("minPrice", priceRange[0]);
      params.set("maxPrice", priceRange[1]);
    }

    if (sort) params.set("sort", sort);
    params.set("type", "SUV");

    return params.toString();
  }, [selectedCategories, selectedBrands, selectedProductType, priceRange, sort]);

  /* ================= REMOVE HELPERS ================= */
const removeFromArray = (value, setter) => {
  setter((prev) => prev.filter((v) => v !== value));
};

const clearPrice = () => setPriceRange([0, 5000]);

const clearSize = () => {
  setFiltersForm({ width: "", height: "", size: "" });
};


  /* ================= ROUTER PUSH ================= */
  useEffect(() => {
    setIsLoading(true);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      router.push(`${baseUrl}/sizes/${newSlug}?${queryString}`);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timeoutRef.current);
  }, [queryString, newSlug]);

  /* ================= SLUG PARSE ================= */
  useEffect(() => {
    if (!slug) return;
    const [width, height, size] = slug.split("-");
    setFiltersForm({ width, height, size });
  }, [slug]);

  /* ================= HELPERS ================= */
  const toggleValue = (value, setter) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const updateSize = () => {
    const { width, height, size } = filtersForm;
    if (width && height && size) {
      setNewSlug(`${width}-${height}-${size}`);
    }
  };

  /* ================= UI ================= */
  return (
    <section className="max-w-[1200px] mx-auto mt-8 text-black">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-white  md:flex-row  md:justify-between px-2 md:px-0 mb-6 ">
        <span>Home / Tyres / Variations</span>

        <div className="flex items-center gap-2">
          <span>Sort By</span>
          <ArrowUpDown size={18} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-1 rounded text-gray-600"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

     <div className="flex flex-col md:flex-row gap-6 px-2 md:px-0">
        {/* ================= SIDEBAR ================= */}
<aside className="w-full md:w-1/4 space-y-6 text-white">

  <h2 className="text-3xl font-semibold">Filters</h2>

  {/* PRICE */}
  <div>
    <p className="font-medium mb-3 text-gray-300">
      Price: {priceRange[0]} - {priceRange[1]}
    </p>

    <Range
      step={50}
      min={minPrice}
      max={maxPrice}
      values={priceRange}
      onChange={setPriceRange}
      renderTrack={({ props, children }) => {
        const { key, ...rest } = props;
        return (
          <div
            {...rest}
            key={key}
            style={{
              height: "6px",
              background: getTrackBackground({
                values: priceRange,
                colors: ["#404040", "#ffffff", "#404040"],
                min: minPrice,
                max: maxPrice,
              }),
            }}
          >
            {children}
          </div>
        );
      }}
      renderThumb={({ props }) => {
        const { key, ...rest } = props;
        return (
          <div
            {...rest}
            key={key}
            className="h-4 w-4 bg-white border border-neutral-700 rounded-full shadow"
          />
        );
      }}
    />
  </div>

  {/* SIZE FILTER */}
  <div className="p-4 border border-neutral-800 rounded-lg bg-neutral-900">
    <h3 className="mb-4 font-medium text-lg text-white">Size</h3>

    <div className="flex gap-3 mb-4">

      {/* WIDTH */}
      <div className="flex-1">
        <label className="block text-sm mb-1 text-gray-400">Width</label>
        <select
          value={filtersForm.width}
          onChange={(e) =>
            setFiltersForm({ ...filtersForm, width: e.target.value })
          }
          className="w-full border border-neutral-700 bg-black text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-white"
        >
          <option value="">All</option>
          {[10,11,12,13,14,15,16,17,18].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* HEIGHT */}
      <div className="flex-1">
        <label className="block text-sm mb-1 text-gray-400">Height</label>
        <select
          value={filtersForm.height}
          onChange={(e) =>
            setFiltersForm({ ...filtersForm, height: e.target.value })
          }
          className="w-full border border-neutral-700 bg-black text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-white"
        >
          <option value="">All</option>
          {[10,11,12,13,14,15,16,17,18].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* SIZE */}
      <div className="flex-1">
        <label className="block text-sm mb-1 text-gray-400">Size</label>
        <select
          value={filtersForm.size}
          onChange={(e) =>
            setFiltersForm({ ...filtersForm, size: e.target.value })
          }
          className="w-full border border-neutral-700 bg-black text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-white"
        >
          <option value="">All</option>
          {[10,11,12,13,14,15,16,17,18].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
    </div>

    <button
      onClick={updateSize}
      className="w-full bg-white text-black py-2 rounded text-sm font-medium hover:bg-gray-200 transition"
    >
      Apply
    </button>
  </div>

  {/* PRODUCT TYPE */}
  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
    <div
      className="flex justify-between cursor-pointer"
      onClick={() => setProductTypeOpen(!productTypeOpen)}
    >
      <span className="font-medium">Product Type</span>
      <ChevronDown
        className={`transition ${productTypeOpen ? "rotate-180" : ""}`}
      />
    </div>

    {productTypeOpen && (
      <ul className="mt-3 space-y-2 text-gray-300">
        {["summer", "winter", "all-season"].map((p) => (
          <li key={p} className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="accent-white"
              checked={selectedProductType.includes(p)}
              onChange={() =>
                toggleValue(p, setSelectedProductType)
              }
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* CATEGORY */}
  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
    <div
      className="flex justify-between cursor-pointer"
      onClick={() => setCatOpen(!catOpen)}
    >
      <span className="font-medium">Category</span>
      <ChevronDown
        className={`transition ${catOpen ? "rotate-180" : ""}`}
      />
    </div>

    {catOpen && (
      <ul className="mt-3 space-y-2 text-gray-300">
        {[
          "passenger-tyres",
          "truck-tyres",
          "motorbike-tyres",
          "suv-tyres",
        ].map((cat) => (
          <li key={cat} className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="accent-white"
              checked={selectedCategories.includes(cat)}
              onChange={() =>
                toggleValue(cat, setSelectedCategories)
              }
            />
            <span>{cat}</span>
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* BRANDS */}
  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
    <div
      className="flex justify-between cursor-pointer"
      onClick={() => setBrandOpen(!brandOpen)}
    >
      <span className="font-medium">Brands</span>
      <ChevronDown
        className={`transition ${brandOpen ? "rotate-180" : ""}`}
      />
    </div>

    {brandOpen && (
      <ul className="mt-3 space-y-2 text-gray-300">
        {[
          "bridgestone",
          "dunlop",
          "michelin",
          "pirelli",
          "trail-blazer",
        ].map((brand) => (
          <li key={brand} className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="accent-white"
              checked={selectedBrands.includes(brand)}
              onChange={() =>
                toggleValue(brand, setSelectedBrands)
              }
            />
            <span>{brand}</span>
          </li>
        ))}
      </ul>
    )}
  </div>

</aside>


        {/* ================= PRODUCTS ================= */}
    <main className="w-full md:w-3/4 text-white">

{/* ================= ACTIVE FILTERS ================= */}
{(
  selectedCategories.length ||
  selectedBrands.length ||
  selectedProductType.length ||
  priceRange[0] > 0 ||
  priceRange[1] < 5000 ||
  (filtersForm.width && filtersForm.height && filtersForm.size)
) && (
  <div className="mb-6 flex flex-wrap gap-2">
    
    {selectedProductType.map((p) => (
      <FilterChip
        key={p}
        label={`Type: ${p}`}
        onRemove={() => removeFromArray(p, setSelectedProductType)}
      />
    ))}

    {selectedCategories.map((c) => (
      <FilterChip
        key={c}
        label={`Category: ${c}`}
        onRemove={() => removeFromArray(c, setSelectedCategories)}
      />
    ))}

    {selectedBrands.map((b) => (
      <FilterChip
        key={b}
        label={`Brand: ${b}`}
        onRemove={() => removeFromArray(b, setSelectedBrands)}
      />
    ))}

    {(priceRange[0] > 0 || priceRange[1] < 5000) && (
      <FilterChip
        label={`Price: ${priceRange[0]} - ${priceRange[1]}`}
        onRemove={clearPrice}
      />
    )}

    {filtersForm.width && filtersForm.height && filtersForm.size && (
      <FilterChip
        label={`Size: ${filtersForm.width}-${filtersForm.height}-${filtersForm.size}`}
        onRemove={clearSize}
      />
    )}
  </div>
)}

{isLoading ? (
  <Loading />
) : data?.length ? (
  data.map((dt,i) => (
    <div
      key={i}
      className="p-5 mb-4 rounded-xl bg-neutral-900 border border-neutral-800 shadow flex flex-col md:flex-row justify-between hover:border-neutral-600 transition"
    >
      <div className="flex gap-4">
        <img
          src={dt.product.image || "https://placehold.co/100"}
          width={100}
          height={100}
          className="rounded"
        />

        <div>
          <Link href={`${process.env.NEXT_PUBLIC_FRONT_END}/product/${dt.product.slug}`}>
          <h3 className="text-xl font-semibold text-white">
            {dt.product.name}
          </h3></Link>

          <p className="mt-2 text-gray-300">
            Price: <strong className="text-white">${dt.price}</strong>
          </p>

          <div className="text-sm font-medium text-gray-400 mt-2 flex gap-4 flex-wrap">

            <div>
              <span>Category :</span>{" "}
              <span className="text-white font-semibold">
                {dt.product?.category?.title}
              </span>
            </div>

            <div>
              <span>Brand :</span>{" "}
              <span className="text-white font-semibold">
                {dt.product?.brand?.title}
              </span>
            </div>

            <div>
              <span>Product Type :</span>{" "}
              <span className="text-white font-semibold">
                {dt.product?.product_type?.title}
              </span>
            </div>

          </div>
        </div>
      </div>

     <Link href={`${process.env.NEXT_PUBLIC_FRONT_END}/product/${dt.product.slug}`}> <span className="text-gray-500 mt-3 md:mt-0">
        Looking At
      </span>
      </Link>

    </div>
  ))
) : (
  <p className="text-gray-400">No products found.</p>
)}

</main>
      </div>
    </section>
  );
}


function FilterChip({ label, onRemove }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-sm">
      <span>{label}</span>
      <button onClick={onRemove}>
        <X size={14} />
      </button>
    </div>
  );
}

