"use client";

import { useState } from "react";
import { Check, DeleteIcon, RemoveFormattingIcon, X } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
type Product = {
  name: string;
  price: number;
};
export default function ProductContent({data}: any) {
  
  const { removeFromCart,cart,addToCart } = useCartStore();
  

  const [width, setWidth] = useState("Medium");
  const [height, setHeight] = useState("Medium");
  const [size, setSize] = useState("M");

  const [cartOpen, setCartOpen] = useState(false); // For sliding cart panel
  const {name, price, description} = data || {};
  //const backend_url = process.env.BACKEND_URL;
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
  const dummyImage= "https://placehold.co/400";
  const image = data?.images?.[0]?.url
  ? `${backend_url}${data.images[0].url}`
  : dummyImage;


  const handleAddToCart = () => {
    setCartOpen(true); // Open sliding cart
    const { id, name, price }  = data;

addToCart({
  id,
  name,
  price,
  qty:1,
  image:image,
});

  };

  return (
<>
      <div className="w-full md:w-1/2 p-6 rounded shadow flex flex-col gap-4">
        {/* Product Title */}
        <pre />
        {JSON.stringify(data.images[0].url,null,2)}
        <h2 className="text-2xl font-bold">{name}{backend_url}</h2>
<h2>{backend_url}</h2>
        {/* Description */}
        <p className="text-gray-700 text-sm">
         {/* {description[0]?.text || "No description available."}        */}
         {description || "No description available."}
          </p>

        {/* Price */}
        <p className="text-xl font-semibold text-green-600">${price}</p>

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
          className="mt-6 bg-[#fded5b] hover:bg-amber-100 cursor-pointer  text-black font-semibold py-3 rounded transition-colors"
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
          <pre />
          {/* {JSON.stringify(cart,null,2)} */}
       {cart.map(({ id, name, price,qty }:any,index:number) => (
  <div key={index} className="mb-4 border-b pb-3">
    <p className="text-gray-700 flex justify-between gap-3">
     <span> {name || "Dummy Product Title"}</span>
     <span className="text-red-400 cursor-pointer"><DeleteIcon size={18} onClick={()=>removeFromCart(id)} /> </span>
    </p>

    <p className="text-green-600 font-semibold">
      ${price}
    </p>
    
    <p className="text-red-500 font-semibold">
     Quantity : {qty}
         </p>

    <p className="text-gray-500 text-sm mt-2">
      {/* Width: {item.width} */}
    </p>

    <p className="text-gray-500 text-sm">
      {/* Height: {item.height} */}
    </p>

    <p className="text-gray-500 text-sm">
      {/* Size: {item.size} */}
    </p>
  </div>
))}

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
