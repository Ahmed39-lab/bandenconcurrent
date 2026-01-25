
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { ChevronDown, ArrowUpDown, X } from "lucide-react";

import { useRouter } from "next/navigation";
import { Range, getTrackBackground } from "react-range";
import Loading from "../../sizes/loading";

export default function Variations_bk({ data, slug }) {
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
    //setIsLoading(true);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      router.push(`${baseUrl}/sizes/${newSlug}?${queryString}`);
      //setIsLoading(false);
    }, 600);

    return () => clearTimeout(timeoutRef.current);
  }, [queryString, newSlug]);

  /* ================= SLUG PARSE ================= */
useEffect(() => {
  if (!slug) return;

  const [width, height, size] = slug.split("-");

  setFiltersForm((prev) => {
    // agar already same values hain → state update na karo
    if (
      prev.width === width &&
      prev.height === height &&
      prev.size === size
    ) {
      return prev;
    }

    return { width, height, size };
  });
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
      <div className="flex justify-between mb-6 text-gray-600">
        <span>Home / Tyres / Variations</span>

        <div className="flex items-center gap-2">
          <span>Sort By</span>
          <ArrowUpDown size={18} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* ================= SIDEBAR ================= */}
      <aside className="w-1/4 space-y-6">
  <h2 className="text-3xl font-semibold">Filters</h2>

  {/* PRICE */}
  <div>
    <p className="font-medium mb-3">
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
                colors: ["#ccc", "#000", "#ccc"],
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
            className="h-4 w-4 bg-black rounded-full"
          />
        );
      }}
    />
  </div>

  {/* Form for width height and size */}
  {/* SIZE FILTER */}
<div className="p-4 border border-gray-200 rounded-lg bg-white">
  <h3 className="mb-4 font-medium text-lg">Size</h3>

  <div className="flex gap-3 mb-4">
    {/* WIDTH */}
    <div className="flex-1">
      <label className="block text-sm mb-1">Width</label>
      <select
        value={filtersForm.width}
        onChange={(e) =>
          setFiltersForm({ ...filtersForm, width: e.target.value })
        }
        className="w-full border rounded px-3 py-2 text-sm"
      >
        <option value="">All</option>
        {[10,11,12,13,14,15,16,17,18].map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>

    {/* HEIGHT */}
    <div className="flex-1">
      <label className="block text-sm mb-1">Height</label>
      <select
        value={filtersForm.height}
        onChange={(e) =>
          setFiltersForm({ ...filtersForm, height: e.target.value })
        }
        className="w-full border rounded px-3 py-2 text-sm"
      >
        <option value="">All</option>
        {[10,11,12,13,14,15,16,17,18].map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>

    {/* SIZE */}
    <div className="flex-1">
      <label className="block text-sm mb-1">Size</label>
      <select
        value={filtersForm.size}
        onChange={(e) =>
          setFiltersForm({ ...filtersForm, size: e.target.value })
        }
        className="w-full border rounded px-3 py-2 text-sm"
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
    className="w-full bg-black text-white py-2 rounded text-sm"
  >
    Apply
  </button>
</div>


  {/* PRODUCT TYPE */}
  <div className="p-3 bg-[#f8f8f8] rounded-lg">
    <div
      className="flex justify-between cursor-pointer"
      onClick={() => setProductTypeOpen(!productTypeOpen)}
    >
      <span>Product Type</span>
      <ChevronDown
        className={`transition ${
          productTypeOpen ? "rotate-180" : ""
        }`}
      />
    </div>

    {productTypeOpen && (
      <ul className="mt-3 space-y-2">
        {["summer", "winter", "all-season"].map((p) => (
          <li key={p} className="flex gap-2 items-center">
            <input
              type="checkbox"
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
  <div className="p-3 bg-[#f8f8f8] rounded-lg">
    <div
      className="flex justify-between cursor-pointer"
      onClick={() => setCatOpen(!catOpen)}
    >
      <span>Category</span>
      <ChevronDown
        className={`transition ${
          catOpen ? "rotate-180" : ""
        }`}
      />
    </div>

    {catOpen && (
      <ul className="mt-3 space-y-2">
        {[
          "passenger-tyres",
          "truck-tyres",
          "motorbike-tyres",
          "suv-tyres",
        ].map((cat) => (
          <li key={cat} className="flex gap-2 items-center">
            <input
              type="checkbox"
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
  <div className="p-3 bg-[#f8f8f8] rounded-lg">
    <div
      className="flex justify-between cursor-pointer"
      onClick={() => setBrandOpen(!brandOpen)}
    >
      <span>Brands</span>
      <ChevronDown
        className={`transition ${
          brandOpen ? "rotate-180" : ""
        }`}
      />
    </div>

    {brandOpen && (
      <ul className="mt-3 space-y-2">
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
        <main className="w-3/4">

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
    
    {/* PRODUCT TYPE */}
    {selectedProductType.map((p) => (
      <FilterChip
        key={p}
        label={`Type: ${p}`}
        onRemove={() => removeFromArray(p, setSelectedProductType)}
      />
    ))}

    {/* CATEGORY */}
    {selectedCategories.map((c) => (
      <FilterChip
        key={c}
        label={`Category: ${c}`}
        onRemove={() => removeFromArray(c, setSelectedCategories)}
      />
    ))}

    {/* BRAND */}
    {selectedBrands.map((b) => (
      <FilterChip
        key={b}
        label={`Brand: ${b}`}
        onRemove={() => removeFromArray(b, setSelectedBrands)}
      />
    ))}

    {/* PRICE */}
    {(priceRange[0] > 0 || priceRange[1] < 5000) && (
      <FilterChip
        label={`Price: ${priceRange[0]} - ${priceRange[1]}`}
        onRemove={clearPrice}
      />
    )}

    {/* SIZE */}
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
    data.map((dt) => (
      <div
        key={dt.product.id}
        className="p-5 mb-4 rounded-xl bg-white border shadow flex justify-between"
      >
        <div className="flex gap-4">
          <img
            src={dt.product.image || "https://placehold.co/100"}
            width={100}
            height={100}
            className="rounded"
          />
          <div>
            <h3 className="text-xl font-semibold">{dt.product.name}</h3>
            <p className="mt-2">
              Price: <strong>${dt.price}</strong>
            </p>
            <div className="text-sm font-medium text-gray-700 mt-2 flex gap-3">
              <div>
                <span>Category : </span>
                <span className="text-black font-semibold">
                  {dt.product?.category?.title}
                </span>
              </div>
              <div>
                <span>Brands : </span>
                <span className="text-black font-semibold">
                  {dt.product?.brand?.title}
                </span>
              </div>
              <div>
                <span>Product Type  : </span>
                <span className="text-black font-semibold">
                  {dt.product?.product_type?.title}
                </span>
              </div>
            </div>
          </div>
        </div>
        <span className="text-gray-500">Looking At</span>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No products found.</p>
  )}
        </main>
      </div>
    </section>
  );
}


function FilterChip({ label, onRemove }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 border rounded-full text-sm">
      <span>{label}</span>
      <button onClick={onRemove}>
        <X size={14} />
      </button>
    </div>
  );
}

