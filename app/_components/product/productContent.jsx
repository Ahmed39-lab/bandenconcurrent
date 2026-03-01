"use client";

import { useEffect, useState } from "react";
import { Check, DeleteIcon, X } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export default function ProductContent({ data }) {
  const { removeFromCart, cart, addToCart } = useCartStore();

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [size, setSize] = useState();
  const [cartOpen, setCartOpen] = useState(false);
  const [variations, setVariations] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);

  const { name, price, description } = data || {};

  const dummyImage = "https://placehold.co/400";

  const image = data?.images?.[0]?.url
    ? `${data.images[0].url}`
    : dummyImage;

  const handleAddToCart = () => {
    if (!selectedVariation) return alert("Please select variation first");
    setCartOpen(true);
    addToCart({
      id: selectedVariation.id,
      name: data.name,
      price: selectedVariation.price,
      width: selectedVariation.width,
      height: selectedVariation.height,
      size: selectedVariation.size,
      qty: 1,
      image: image,
    });
  };

  const filterVariations = (wdith, height, size) => {
    setWidth(wdith);
    setHeight(height);
    setSize(size);

    if (!variations?.length) return;

    const matched = variations.find(
      (v) =>
        v.width == wdith &&
        v.height == height &&
        v.size == size
    );

    if (!matched) return;

    setSelectedVariation(matched);
  };

  useEffect(() => {
    if (data?.variations?.length > 0) {
      setVariations(data.variations);
      setWidth(data.variations[0].width);
      setHeight(data.variations[0].height);
      setSize(data.variations[0].size);
    }
  }, [data]);

  useEffect(() => {
    if (width && height && size && variations?.length) {
      filterVariations(width, height, size);
    }
  }, [width, height, size, variations]);

  return (
    <>
      {/* PRODUCT INFO */}
      <div className="w-full md:w-1/2 p-6 rounded shadow flex flex-col gap-4">
        {/* {width} - {height} - {size} */}

        {/* <pre>{JSON.stringify(selectedVariation, null, 2)}</pre> */}

        <h2 className="text-2xl font-bold">{name}</h2>

        <p className="text-gray-700 text-sm">
          {description || "No description available."}
        </p>
        {selectedVariation && (
  <div className="border-gray-50 border rounded-lg p-4 bg-gray-50 flex flex-col gap-2">
    <h4 className="font-semibold text-gray-800">
      Selected Variation Details
    </h4>

    <div className="grid grid-cols-2 gap-2 text-sm">
      <p>
        <span className="font-medium">Width:</span>{" "}
        {selectedVariation.width}
      </p>
      <p>
        <span className="font-medium">Height:</span>{" "}
        {selectedVariation.height}
      </p>
      <p>
        <span className="font-medium">Size:</span>{" "}
        {selectedVariation.size}
      </p>
      <p>
        <span className="font-medium">SKU:</span>{" "}
        {selectedVariation.sku || "N/A"}
      </p>
    </div>

    <div className="flex justify-between items-center mt-2">
      <p className="text-lg font-semibold text-green-600">
        Price: ${selectedVariation.price || price}
      </p>

      <p
        className={`text-sm font-medium ${
          selectedVariation.stock > 0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {selectedVariation.stock > 0
          ? `In Stock (${selectedVariation.stock})`
          : "Out of Stock"}
      </p>
    </div>
  </div>
)}

        {/* {selectedVariation != null && (
          <span>Fined new variations ....</span>
        )}

        <p className="text-xl font-semibold text-green-600">
          {price}
        </p> */}

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="text-yellow-400 text-lg"
            >
              ★
            </span>
          ))}
          <span className="text-gray-500 ml-2">
            (120 reviews)
          </span>
        </div>

        {/* Features */}
        {/* <ul className="flex flex-col gap-2 mt-2">
          {[
            "High quality material",
            "Lightweight design",
            "Eco-friendly packaging",
            "1-year warranty",
            "Available in multiple colors",
          ].map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-gray-700"
            >
              <Check size={16} className="text-green-500" />
              {feature}
            </li>
          ))}
        </ul> */}

        {/* Options */}
    {variations && variations.length > 0 && (
  <div className="mt-6 border-gray-100 border rounded-xl p-5 bg-gray-50 shadow-sm">
    <h4 className="text-sm font-semibold text-gray-800 mb-4">
      Select Product Options
    </h4>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* WIDTH */}
      <div className="flex flex-col">
        <label className="text-xs font-medium text-gray-600 mb-1">
          Width
        </label>
        <select
          value={width}
          onChange={(e) =>
            filterVariations(
              e.target.value,
              height,
              size
            )
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:ring-2 focus:ring-black/10 transition"
        >
          {variations.map((w, index) => (
            <option key={index}>{w.width}</option>
          ))}
        </select>
      </div>

      {/* HEIGHT */}
      <div className="flex flex-col">
        <label className="text-xs font-medium text-gray-600 mb-1">
          Height
        </label>
        <select
          value={height}
          onChange={(e) =>
            filterVariations(
              width,
              e.target.value,
              size
            )
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:ring-2 focus:ring-black/10 transition"
        >
          {variations.map((h, index) => (
            <option key={index}>{h.height}</option>
          ))}
        </select>
      </div>

      {/* SIZE */}
      <div className="flex flex-col">
        <label className="text-xs font-medium text-gray-600 mb-1">
          Size
        </label>
        <select
          value={size}
          onChange={(e) =>
            filterVariations(
              width,
              height,
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:ring-2 focus:ring-black/10 transition"
        >
          {variations.map((s, index) => (
            <option key={index}>{s.size}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
)}

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
          cartOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Cart
          </h3>
          <button onClick={() => setCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {cart.map((item, index) => (
          <div
            key={index}
            className="mb-4 border-b pb-3"
          >
            <p className="flex justify-between text-gray-700">
              <span>{item.name}</span>
              <span
                className="text-red-400 cursor-pointer"
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                <DeleteIcon size={18} />
              </span>
            </p>

            <p className="text-green-600 font-semibold">
              ${item.price}
            </p>

            <p className="text-red-500 font-semibold">
              Quantity: {item.qty}
            </p>
          </div>
        ))}

        <button
          onClick={() =>
            alert("Proceed to Checkout")
          }
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </>
  );
}