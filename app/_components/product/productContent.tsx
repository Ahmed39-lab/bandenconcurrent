"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export default function ProductContent() {
  const [width, setWidth] = useState("Medium");
  const [height, setHeight] = useState("Medium");
  const [size, setSize] = useState("M");

  const [cartOpen, setCartOpen] = useState(false); // For sliding cart panel

  const handleAddToCart = () => {
    setCartOpen(true); // Open sliding cart
  };

  return (
<>
      <div className="w-full md:w-1/2 p-6 rounded shadow flex flex-col gap-4">
        {/* Product Title */}
        <h2 className="text-2xl font-bold">Dummy Product Title</h2>

        {/* Description */}
        <p className="text-gray-700 text-sm">
          This is a dummy description for the product. It describes key features, 
          quality, and usage details. Perfect for showcasing your item.
        </p>

        {/* Price */}
        <p className="text-xl font-semibold text-green-600">$149.99</p>

        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-lg">★</span>
          ))}
          <span className="text-gray-500 ml-2">(120 reviews)</span>
        </div>

        {/* Features List */}
        <ul className="flex flex-col gap-2 mt-2">
          {[
            "High quality material",
            "Lightweight design",
            "Eco-friendly packaging",
            "1-year warranty",
            "Available in multiple colors",
          ].map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-700">
              <Check className="text-green-500" size={16} />
              {feature}
            </li>
          ))}
        </ul>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-4 mt-4">
          {/* Width */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Width</label>
            <select
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="p-2 rounded border border-gray-300"
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          {/* Height */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Height</label>
            <select
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="p-2 rounded border border-gray-300"
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          {/* Size */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="p-2 rounded border border-gray-300"
            >
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>

      {/* Sliding Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl p-6 transform transition-transform duration-500 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Cart</h3>
          <button onClick={() => setCartOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div>
          <p className="text-gray-700">Dummy Product Title</p>
          <p className="text-green-600 font-semibold">$149.99</p>
          <p className="text-gray-500 text-sm mt-2">Width: {width}</p>
          <p className="text-gray-500 text-sm">Height: {height}</p>
          <p className="text-gray-500 text-sm">Size: {size}</p>
        </div>
        <button
          onClick={() => alert("Proceed to Checkout")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </>
  );
}
