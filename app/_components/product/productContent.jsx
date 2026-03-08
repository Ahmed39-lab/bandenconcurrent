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
    <div className="w-full md:w-1/2 p-6 rounded-xl bg-black text-white border border-neutral-800 shadow flex flex-col gap-4">

<h2 className="text-2xl font-bold text-white">{name}</h2>

<p className="text-gray-400 text-sm">
{description || "No description available."}
</p>

{selectedVariation && (
<div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900 flex flex-col gap-2">

<h4 className="font-semibold text-white">
Selected Variation Details
</h4>

<div className="grid grid-cols-2 gap-2 text-sm text-gray-300">

<p>
<span className="font-medium text-gray-400">Width:</span>
{selectedVariation.width}
</p>

<p>
<span className="font-medium text-gray-400">Height:</span>
{selectedVariation.height}
</p>

<p>
<span className="font-medium text-gray-400">Size:</span>
{selectedVariation.size}
</p>

<p>
<span className="font-medium text-gray-400">SKU:</span>
{selectedVariation.sku || "N/A"}
</p>

</div>

<div className="flex justify-between items-center mt-2">

<p className="text-lg font-semibold text-green-400">
Price: ${selectedVariation.price || price}
</p>

<p
className={`text-sm font-medium ${
selectedVariation.stock > 0
? "text-green-400"
: "text-red-400"
}`}
>

{selectedVariation.stock > 0
? `In Stock (${selectedVariation.stock})`
: "Out of Stock"}

</p>

</div>
</div>
)}

{/* Rating */}

<div className="flex items-center gap-1">
{[1,2,3,4,5].map((star)=>(
<span key={star} className="text-yellow-400 text-lg">★</span>
))}
<span className="text-gray-400 ml-2">(120 reviews)</span>
</div>

{/* Options */}

{variations && variations.length > 0 && (

<div className="mt-6 border border-neutral-800 rounded-xl p-5 bg-neutral-900 shadow-sm">

<h4 className="text-sm font-semibold text-white mb-4">
Select Product Options
</h4>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

{/* WIDTH */}

<div className="flex flex-col">

<label className="text-xs font-medium text-gray-400 mb-1">
Width
</label>

<select
value={width}
onChange={(e)=>filterVariations(e.target.value,height,size)}
className="w-full rounded-lg border border-neutral-700 bg-black text-white px-3 py-2 text-sm focus:border-white focus:ring-1 focus:ring-white transition"
>

{variations.map((w,index)=>(
<option key={index}>{w.width}</option>
))}

</select>
</div>

{/* HEIGHT */}

<div className="flex flex-col">

<label className="text-xs font-medium text-gray-400 mb-1">
Height
</label>

<select
value={height}
onChange={(e)=>filterVariations(width,e.target.value,size)}
className="w-full rounded-lg border border-neutral-700 bg-black text-white px-3 py-2 text-sm focus:border-white focus:ring-1 focus:ring-white transition"
>

{variations.map((h,index)=>(
<option key={index}>{h.height}</option>
))}

</select>

</div>

{/* SIZE */}

<div className="flex flex-col">

<label className="text-xs font-medium text-gray-400 mb-1">
Size
</label>

<select
value={size}
onChange={(e)=>filterVariations(width,height,e.target.value)}
className="w-full rounded-lg border border-neutral-700 bg-black text-white px-3 py-2 text-sm focus:border-white focus:ring-1 focus:ring-white transition"
>

{variations.map((s,index)=>(
<option key={index}>{s.size}</option>
))}

</select>

</div>

</div>
</div>
)}

<button
onClick={handleAddToCart}
className="mt-6 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
>
Add to Cart
</button>

</div>

      {/* SLIDING CART */}
   <div
  className={`fixed top-0 right-0 h-full w-80 bg-black text-white shadow-2xl p-6 transition-transform duration-500 ${
    cartOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  {/* Header */}
  <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
    <h3 className="text-xl font-semibold tracking-wide">
      Shopping Cart
    </h3>

    <button
      onClick={() => setCartOpen(false)}
      className="hover:text-red-400 transition"
    >
      <X size={22} />
    </button>
  </div>

  {/* Cart Items */}
  <div className="space-y-4">
    {cart.map((item, index) => (
      <div
        key={index}
        className="border-b border-gray-800 pb-3"
      >
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-200">
            {item.name}
          </span>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-400 hover:text-red-600 transition"
          >
            <DeleteIcon size={18} />
          </button>
        </div>

        <p className="text-green-400 font-semibold mt-1">
          ${item.price}
        </p>

        <p className="text-gray-400 text-sm">
          Quantity: {item.qty}
        </p>
      </div>
    ))}
  </div>

  {/* Checkout Button */}
  <button
    onClick={() => alert("Proceed to Checkout")}
    className="mt-8 w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
  >
    Checkout
  </button>
</div>
    </>
  );
}