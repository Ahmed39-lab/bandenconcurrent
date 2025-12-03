'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {Search, ShoppingBag, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

function SearchMenu() {
   const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
   const [cartItems, setCartItems] = useState(3); // Example total items
  return (
   <>
  
   <section className='hidden md:block'>
    <div className='max-w-[1200px] mx-auto flex justify-between items-center h-20'>
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
        <div className="relative w-full max-w-2xl">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-4xl focus:outline-none"
      />
    </div>

       <div className="relative inline-block cursor-pointer">
        <Link href={`${baseUrl}/cart`}>
      <ShoppingCart size={24} className="text-gray-700" />

      {cartItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cartItems}
        </span>
      )}
      </Link>
    </div>

    </div>
   </section>
   </>
  )
}

export default SearchMenu