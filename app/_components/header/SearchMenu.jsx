'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import { fetchSearchProducts } from '../lib/helperAPI'
import { X } from "lucide-react";

function SearchMenu() {
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
  const timeoutRef = useRef(null);
  const { cart } = useCartStore();
  const [loading,setLoading] = useState(false);
  const [searchProducts,setSearchProducts] = useState(null);
 

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

  return (
    <section className="hidden md:block bg-black border-b border-neutral-800">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-20 px-4">
        
        {/* Logo */}
        <div className="w-[250px] h-16 relative">
          <Link href={baseUrl}>
            <Image
              src="/images/logo.svg"
              alt="Hostbrake Logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>

   {/* Search Bar */}
<div className="relative w-full max-w-2xl">
  
  {/* Icon */}
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <Search size={18} className="text-gray-400" />
  </div>

  <input
    type="text"
    placeholder="Search..."
    className="w-full pl-10 pr-3 py-2 bg-neutral-900
    text-white border border-neutral-700 rounded-full 
    focus:outline-none 
    placeholder-gray-400"
    onChange={(e)=>handleSearch(e.target.value)}
  />

  {/* Dropdown */}
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

        {/* Cart */}
        <div className="relative inline-block cursor-pointer">
          <Link href={`${baseUrl}/cart`} className="relative">
            <ShoppingCart size={24} className="text-white" />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

      </div>
    </section>
  )
}

export default SearchMenu