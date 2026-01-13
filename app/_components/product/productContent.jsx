"use client";

import { useState } from "react";
import { Check, DeleteIcon, X } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export default function ProductContent({ data }) {
  const { removeFromCart, cart, addToCart } = useCartStore();

  const [width, setWidth] = useState("Medium");
  const [height, setHeight] = useState("Medium");
  const [size, setSize] = useState("M");
  const [cartOpen, setCartOpen] = useState(false);

  const { name, price, description } = data || {};

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dummyImage = "https://placehold.co/400";

  const image = data?.images?.[0]?.url
    ? `${backend_url}${data.images[0].url}`
    : dummyImage;

  const handleAddToCart = () => {
    setCartOpen(true);

    addToCart({
      id: data.id,
      name: data.name,
      price: data.price,
      qty: 1,
      image: image,
    });
  };

  return (
    <>
      {/* PRODUCT INFO */}
      <div className="w-full md:w-1/2 p-6 rounded shadow flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{name}</h2>

        <p className="text-gray-700 text-sm">
          {description || "No description available."}
        </p>

        <p className="text-xl font-semibold text-green-600">${price}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-lg">★</span>
          ))}
          <span className="text-gray-500 ml-2">(120 reviews)</span>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2 mt-2">
          {[
            "High quality material",
            "Lightweight design",
            "Eco-friendly packaging",
            "1-year warranty",
            "Available in multiple colors",
          ].map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-700">
              <Check size={16} className="text-green-500" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Options */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex flex-col">
            <label className="text-sm mb-1">Width</label>
            <select
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="p-2 border rounded"
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Height</label>
            <select
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="p-2 border rounded"
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="p-2 border rounded"
            >
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-6 bg-[#fded5b] hover:bg-amber-100 text-black font-semibold py-3 rounded"
        >
          Add to Cart
        </button>
      </div>

      {/* SLIDING CART */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl p-6 transition-transform duration-500 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Cart</h3>
          <button onClick={() => setCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {cart.map((item, index) => (
          <div key={index} className="mb-4 border-b pb-3">
            <p className="flex justify-between text-gray-700">
              <span>{item.name}</span>
              <span
                className="text-red-400 cursor-pointer"
                onClick={() => removeFromCart(item.id)}
              >
                <DeleteIcon size={18} />
              </span>
            </p>

            <p className="text-green-600 font-semibold">${item.price}</p>
            <p className="text-red-500 font-semibold">
              Quantity: {item.qty}
            </p>
          </div>
        ))}

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
