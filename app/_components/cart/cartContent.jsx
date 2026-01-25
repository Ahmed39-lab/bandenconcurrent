"use client";

import { X } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import Image from "next/image";

export default function CartContent() {
  const { cart, removeFromCart } = useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-[1200px] p-4">
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded mb-4"
              >
                <div className="flex items-center gap-6">
                   <p className="text-gray-500 text-sm">
                    {/* Size: {item.size}, Width: {item.width}, Height: {item.height} */}
                   
                    <Image src={`${item.image}`} width={75} height={50} alt="image" />
                  </p>
                    <div className="flex flex-col">
                  <h2 className="font-semibold">{item.name}</h2>

                 

                  <p className="text-green-600 font-semibold">
                    ${item.price}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Quantity: {item.qty}
                  </p>
                </div>
                </div>
              

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full md:w-1/3 p-6 bg-gray-100 rounded">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2">
              <span>Items ({cart.length})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="border-t my-2"></div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
