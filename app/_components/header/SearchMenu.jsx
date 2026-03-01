'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'

function SearchMenu() {
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END
  const { cart } = useCartStore()

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
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>

          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 bg-neutral-900 text-white border border-neutral-700 rounded-4xl focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
          />
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