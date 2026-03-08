"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";

import Topmenu from "./Topmenu";
import SearchMenu from "./SearchMenu";
import MegaMenu from "./MegaMenu";
import Link from "next/link";
import Image from "next/image";
import { fetchSearchProducts } from '../lib/helperAPI'
// import { X } from "lucide-react";

export default function Header() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
  const [loading,setLoading] = useState(false);
   const [searchProducts,setSearchProducts] = useState(null);
   const timeoutRef = useRef(null);

  useEffect(() => {
    // client-side only
  }, []);
const handleSearch = (value) => {
  console.log(timeoutRef.current);
  setLoading(true);
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  timeoutRef.current = setTimeout(async () => {
    console.log("Data feating start!", value);
    try {
      const data = await fetchSearchProducts(value); // ab sahi
      console.log("Fetched data:", data);
      setLoading(false);
      setSearchProducts(data);
      // setResults(data); // agar aap state me store karna chahte hain
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, 800);
};
  const menuItems = [
    { name: "Car tires", slug: "car-tires" },
    { name: "Winter tires", slug: "winter-tires" },
    { name: "All-season tires", slug: "all-season-tires" },
    { name: "Tire brands", slug: "tire-brands" },
    { name: "Run-flat tires", slug: "run-flat-tires" },
    { name: "TipAPK", slug: "tipapk" },
    { name: "Assembly", slug: "assembly" },
  ];

  useEffect(() => {
    //console.log("API Function called!");

    // const fetchProduct = async () => {
    //   const res = await fetch("/api/product");
    //   const data = await res.json();
    //  // console.log(data);
    // };

    // fetchProduct();
  }, []);

  return (
    <>
      {/* Desktop */}
      <Topmenu  />
      <SearchMenu />

   <header className="p-4 font-sans relative hidden md:block bg-black border-b border-neutral-800">
  <nav className="relative max-w-[1200px] mx-auto">
    <ul className="flex space-x-8">
      {menuItems.map((item, index) => (
        <li
          key={index}
          className="py-2 text-white text-sm md:text-[16px] hover:text-gray-300 transition"
          onMouseEnter={() => setOpenIndex(item.slug)}
          onMouseLeave={() => setOpenIndex(null)}
        >
          <a href="#" className="flex font-semibold items-center gap-1">
            {item.name}
            <ChevronDown size={16} />
          </a>

         <div
  className={`mega-menu absolute top-full left-1/2 -translate-x-1/2
  w-screen bg-neutral-900 shadow-2xl p-6 z-50
  border-t border-neutral-700 transition-all duration-300
  ${openIndex === item.slug ? "opacity-100 visible" : "opacity-0 invisible"}`}
>
  <MegaMenu
    slug={item.slug}
    openIndex={openIndex}
    setOpenIndex={setOpenIndex}
  />
</div>
        </li>
      ))}
    </ul>
  </nav>
</header>

      {/* Mobile Header */}
    <header className="md:hidden p-4 font-sans relative bg-black border-b border-neutral-800">
  <div className="flex justify-between items-center">
    <div className="w-[150px] h-10 relative">
      <Link href={`${baseUrl}`}>
        <Image
          src="/images/logo.svg"
          alt="Hostbrake Logo"
          fill
          className="object-contain"
        />
      </Link>
    </div>

    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="text-white"
    >
      {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </div>

  {mobileMenuOpen && (
    <nav className="mt-4 bg-neutral-900 shadow-xl border-t border-neutral-800 rounded-lg overflow-hidden">
      <ul>
        {menuItems.map((item) => (
          <li key={item.slug} className="border-b border-neutral-800">
            <button
              className="w-full flex justify-between items-center p-4 text-white hover:bg-neutral-800 transition"
              onClick={() =>
                setOpenIndex(openIndex === item.slug ? null : item.slug)
              }
            >
              {item.name}
              <ChevronDown size={16} />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === item.slug ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="p-4 bg-black text-gray-300 grid grid-cols-1 gap-2">
                <div>Submenu Item 1</div>
                <div>Submenu Item 2</div>
                <div>Submenu Item 3</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )}
</header>

      {/* Mobile Search */}
 <section className="md:hidden bg-black border-t border-neutral-800">
  <div className="max-w-[1200px] mx-auto flex justify-between items-center h-20 p-4">
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-3 py-2 bg-neutral-900 text-white border border-neutral-700 
        rounded-full focus:outline-none focus:ring-2 focus:ring-white"
        onChange={(e)=>handleSearch(e.target.value)}
      />
        {(loading || searchProducts) && (
    <div className="absolute left-0 top-full mt-2 w-full 
    bg-neutral-900 border border-neutral-700 
    rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
    <div className="flex justify-between items-center p-3 border-b border-neutral-800">
      <h1 className='text-white'>Search Results..</h1>
    <button
      className="bg-neutral-800 hover:bg-red-500 text-gray-300 cursor-pointer 
                 hover:text-white p-2 rounded-full transition-all duration-200 shadow-md"
      onClick={() => {
        // close functionality yahan add kar lena
        setSearchProducts(null);
      }}
    >
      <X size={18} />
    </button>
  </div>

      {loading && (
        <div className="p-3 text-gray-400">
          Loading...
        </div>
      )}

      {searchProducts?.length === 0 && !loading && (
        <div className="p-3 text-gray-400">
          No results found
        </div>
      )}

{searchProducts?.map((item) => (
  <div
    key={item.id}
    className="p-4 hover:bg-neutral-800 text-white
    cursor-pointer border-b border-neutral-800 transition-all"
  >
      <Link href={`${process.env.NEXT_PUBLIC_FRONT_END}/product/${item.slug}`}>
    <div className="flex justify-between items-center">
      
      {/* Left Side */}
      <div>
     
        <h3 className="font-semibold text-base">
          {item.name}
        </h3>

        <p className="text-xs text-gray-400 mt-1">
          SKU: {item.sku}
        </p>

        {item.description && (
          <p className="text-sm text-gray-300 mt-2 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Right Side */}
      <div className="text-right">
        <p className="text-lg font-bold text-green-400">
          ${item.priceVariations}
          {/* {JSON.stringify(item.priceVariations,null)} */}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {item.slug}
        </p>
      </div>

    </div>
    </Link>
  </div>
))}



    </div>
  )}

    </div>
 
    <ShoppingCart size={24} className="text-white ml-4" />
  </div>
</section>
    </>
  );
}
