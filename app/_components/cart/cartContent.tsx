"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function CartContent() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Dummy Product 1",
      price: 149.99,
      quantity: 1,
      size: "M",
      width: "Medium",
      height: "Medium",
      image: "https://placehold.co/600x400",
    },
    {
      id: 2,
      name: "Dummy Product 2",
      price: 99.99,
      quantity: 2,
      size: "L",
      width: "Large",
      height: "Small",
      image: "https://placehold.co/600x400",
    },
  ]);

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-[1200px] p-4">
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded mb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-500 text-sm">
                      Size: {item.size}, Width: {item.width}, Height: {item.height}
                    </p>
                    <p className="text-green-600 font-semibold">${item.price}</p>
                    <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary / Checkout */}
          <div className="w-full md:w-1/3 p-6 bg-gray-100 rounded">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Items ({cartItems.length})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => alert("Proceed to Checkout")}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
