"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Range, getTrackBackground } from "react-range";
import { ArrowUpDown } from "lucide-react";
import Loading from "../../sizes/loading";


export default function Variations({ data, slug }) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;

  // refs
  const timeoutRef = useRef(null);

  // sort by data
  const [sort, setSort] = useState("");

  const handleChange = (e) => {
  const value = e.target.value;
  setSort(value);
};


  // states
  const [queryString, setQueryString] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedproductType, setSelectedproductType] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [catOpen, setCatOpen] = useState(false);
  const [brandOpen, setbrandOpen] = useState(false);
  const [productTypeOpen, setproductTypeOpen] = useState(false);
  const [newSlug, setNewSlug] = useState(slug);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [isLoading, setIsLoading] = useState(false);

  const minPrice = 0;
  const maxPrice = 5000;

  const [filtersForm, setFiltersForm] = useState({
    width: "",
    height: "",
    size: "",
  });

  // handle filters update
  const updateFilters = () => {
    const params = new URLSearchParams();
   // ✅ Brand
  if (selectedproductType.length > 0) {
    params.set("productType", selectedproductType.join(","));
  } else {
    params.delete("productType");
  }
  
    // ✅ Brand
  if (selectedBrands.length > 0) {
    params.set("brand", selectedBrands.join(","));
  } else {
    params.delete("brand");
  }

  // ✅ Category
  if (selectedCategories.length > 0) {
    params.set("category", selectedCategories.join(","));
  } else {
    params.delete("category");
  }
  // sort by options
  const handleChange = (e) => {
  const value = e.target.value;
  setSort(value);
};
if (priceRange[0] > 1 || priceRange[1] < 5000) {
  params.set("minPrice", priceRange[0]);
  params.set("maxPrice", priceRange[1]);
} else {
  params.delete("minPrice");
  params.delete("maxPrice");
}

  // ✅ Static param
  params.set("type", "SUV");

    const query = params.toString();
    setQueryString(query);

    // debounce router push
    setIsLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      router.push(`${baseUrl}/sizes/${newSlug}?${query}`);
      setIsLoading(false);
    }, 2000);
  };

  // category change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // brands change
  const handleBrandsChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

    // brands change
  const handleproductTypeChange = (prodType) => {
    setSelectedproductType((prev) =>
      prev.includes(prodType) ? prev.filter((b) => b !== prodType) : [...prev, prodType]
    );
  };

  // size update
  const updateSize = () => {
    const { width, height, size } = filtersForm;
    if (width && height && size) {
      const wholeSize = `${width}-${height}-${size}`;
      setNewSlug(wholeSize);
    }
  };
// Remove Filter 

  // update filters whenever relevant states change
  useEffect(() => {
    updateFilters();
  }, [selectedCategories, selectedBrands, selectedproductType, priceRange, newSlug]);

  // parse slug into filtersForm
  useEffect(() => {
    if (!slug) return;
    const parts = slug.split("-");
    if (parts.length === 3) {
      const [width, height, size] = parts;
      setFiltersForm({ width, height, size });
    }
  }, [slug]);

  // cleanup on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <section>
      <div className="max-w-[1200px] mx-auto mt-8 text-black">
        {/* Debug info */}
        {/* <pre>
         {JSON.stringify(data[0].product, null, 2)}
         </pre> */}
        {/* <pre>
          {JSON.stringify(queryString, null, 2)}
          <hr />
          {JSON.stringify(filtersForm, null, 2)}
          <hr />
          {JSON.stringify(newSlug, null, 2)}
        </pre> */}

        {/* Breadcrumb */}
        <div className="mb-6 text-sm md:text-base flex justify-between text-gray-600">
          <div>Home / Tyres / Variations </div>
          {/* <div>{JSON.stringify(selectedCategories, null, 2)}</div> */}
          <div className="font-medium">
            <div className="flex items-center gap-2">
      {/* Sort Icon */}
      <span>Sort By </span><ArrowUpDown size={18} />

      {/* Dropdown */}
      <select
        value={sort}
        onChange={handleChange}
        className="rounded-md border px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-gray-300"
      >
        <option value="">Sort by</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
          </div>
        </div>

        

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
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
  renderTrack={({ props, children }) => {
    const { key, ...restProps } = props; // remove key
    return (
      <div
        {...restProps}
        style={{
          ...restProps.style,
          height: "6px",
          width: "100%",
          background: getTrackBackground({
            values: priceRange,
            colors: ["#ccc", "#000", "#ccc"],
            min: minPrice,
            max: maxPrice,
          }),
          borderRadius: "3px",
        }}
      >
        {children}
      </div>
    );
  }}
renderThumb={({ props, index }) => {
  const { key, ...restProps } = props; // remove key
  return (
    <div
      key={index} // give unique key for each thumb
      {...restProps}
      className="h-5 w-5 bg-black rounded-full border-2 border-black shadow"
    />
  );
}}
/>

            </div>

            {/* Size Filters */}
            <div className="p-4 border border-gray-200 rounded-md bg-white">
              <h3 className="mb-4 font-medium text-lg">Size Filters</h3>
              <div className="flex gap-3 mb-4">
                {/* Width */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">Width</label>
                  <select
                    value={filtersForm.width}
                    onChange={(e) =>
                      setFiltersForm({ ...filtersForm, width: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                  >
                   <option value="">All</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                  </select>
                </div>

                {/* Height */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">Height</label>
                  <select
                    value={filtersForm.height}
                    onChange={(e) =>
                      setFiltersForm({ ...filtersForm, height: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                  >
                 
                    <option value="">All</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                  </select>
                </div>

                {/* Size */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">Size</label>
                  <select
                    value={filtersForm.size}
                    onChange={(e) =>
                      setFiltersForm({ ...filtersForm, size: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                  >
                    <option value="">All</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
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

            {/* Product Type */}
               {/* Category */}
            <div className="p-3 cursor-pointer bg-[#f8f8f8] rounded-lg">
              <div
                className="flex justify-between items-center text-lg"
                onClick={() => setproductTypeOpen(!productTypeOpen)}
              >
                <span>Product Type</span>
                <ChevronDown
                  size={20}
                  className={`${catOpen ? "rotate-180" : "rotate-0"} transition-transform`}
                />
              </div>

              {productTypeOpen && (
                <ul className="mt-3 space-y-2 text-base">
                  {["all-season-tires", "summer-tires", "winter-tires"].map((cat) => (
                    <li key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={cat}
                        checked={selectedproductType.includes(cat)}
                        onChange={() => handleproductTypeChange(cat)}
                        className="cursor-pointer"
                      />
                      <label htmlFor={cat} className="cursor-pointer hover:text-black">
                        {cat}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Category */}
            <div className="p-3 cursor-pointer bg-[#f8f8f8] rounded-lg">
              <div
                className="flex justify-between items-center text-lg"
                onClick={() => setCatOpen(!catOpen)}
              >
                <span>Category</span>
                <ChevronDown
                  size={20}
                  className={`${catOpen ? "rotate-180" : "rotate-0"} transition-transform`}
                />
              </div>

              {catOpen && (
                <ul className="mt-3 space-y-2 text-base">
                  {["passenger-tyres", "truck-tyres", "motorbike-tyres","suv-tyres"].map((cat) => (
                    <li key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={cat}
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="cursor-pointer"
                      />
                      <label htmlFor={cat} className="cursor-pointer hover:text-black">
                        {cat}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Brands */}
            <div className="p-3 cursor-pointer bg-[#f8f8f8] rounded-lg">
               <div
                className="flex justify-between items-center text-lg"
                onClick={() => setbrandOpen(!brandOpen)}
              >
                <span>Brands</span>
                <ChevronDown size={20} className="" />
              </div>
               {brandOpen && (
              <ul className="mt-3 space-y-2 text-base">
                {["bridgestone", "dunlop","michelin","pirelli","trail-blazer"].map((brand) => (
                  <li key={brand} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandsChange(brand)}
                      className="cursor-pointer"
                    />
                    <label htmlFor={brand} className="cursor-pointer hover:text-black">
                      {brand}
                    </label>
                  </li>
                ))}
              </ul>
               )}
            </div>
          </aside>

          {/* Product Listing */}
          <main className="w-full md:w-3/4 p-4">
            <h2 className="text-4xl font-bold mb-6">Products for size: {newSlug}</h2>
          <div className="mt-4 flex gap-2 items-center mb-5">
   {(selectedBrands.length > 0 || selectedCategories.length>0) &&
     (<h3 className="text-lg font-semibold">Active Filters:</h3>
     )}

  {/* Remove Brands Button */}
  {selectedBrands.length > 0 && (
    <button
      onClick={() => setSelectedBrands([])}
      className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
    >
      Brands
      <span className="text-sm font-bold cursor-pointer">&times;</span>
    </button>
  )}
    {/* Remove Product Type Button */}
  {selectedproductType.length > 0 && (
    <button
      onClick={() => setSelectedproductType([])}
      className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
    >
      Product Type
      <span className="text-sm font-bold cursor-pointer">&times;</span>
    </button>
  )}

  {/* Remove Category Button */}
  {selectedCategories.length > 0 && (
    <button
      onClick={() => setSelectedCategories([])}
      className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
    >
      Category
      <span className="text-sm font-bold cursor-pointer">&times;</span>
    </button>
  )}
</div>

            <div className="grid grid-cols-1 gap-4">
              {isLoading && (<>
              <div className="h-screen"><Loading /></div>
              </>)}
              {data.length>0 && data.map((dt) => (
                <div
                  key={dt.product.id} // use unique id
                  className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition flex gap-4 items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={dt.product.image || `https://placehold.co/600x400`}
                      width={110}
                      height={110}
                      alt={dt.product.name}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-xl">{dt.product.name}</h3>
                      <p className="text-lg font-medium text-gray-700 mt-2">
                        Price: <span className="text-black">${dt.price}</span>
                      </p>
                      <div className="text-sm font-medium text-gray-700 mt-2 flex gap-3">
                        <div><span>Category : </span><span className="text-black font-semibold">{dt.product?.category?.title}</span></div>
                        <div><span>Brands : </span><span className="text-black font-semibold">{dt.product?.brand?.title}</span></div>
                        <div><span>Product Type  : </span><span className="text-black font-semibold">{dt.product?.product_type?.title}</span></div>
                      </div>
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
