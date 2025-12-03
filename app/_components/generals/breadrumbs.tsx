import React from 'react'
import { Home, ChevronRight } from "lucide-react";

function Breadcrumbs() {
  return (
    <>
        <div className="flex items-center text-sm text-gray-600 gap-2 py-3 mt-5 ">
  {/* Home Icon */}
  <Home className="w-4 h-4 text-gray-500" />

  {/* Separator */}
  <ChevronRight className="w-4 h-4 text-gray-400" />

  {/* Category */}
  <span className="hover:text-black cursor-pointer transition">Products</span>

  <ChevronRight className="w-4 h-4 text-gray-400" />

  {/* Current Page */}
  <span className="text-black font-medium">Product Details</span>
</div>
    </>
  )
}

export default Breadcrumbs