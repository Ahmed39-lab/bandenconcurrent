"use client";

import { X } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartContent() {
  const { cart, removeFromCart } = useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-[1200px] p-4 text-white bg-black">
      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="flex-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 
                border border-neutral-800 rounded-lg mb-4 
                bg-neutral-900 hover:bg-neutral-800 transition"
              >
                <div className="flex items-center gap-6">
                  
                  <Image
                    src={item.image}
                    width={75}
                    height={50}
                    alt="image"
                    className="object-contain"
                  />

                  <div className="flex flex-col">
                    <h2 className="font-semibold text-white">
                      {item.name}
                    </h2>

                    <p className="text-green-400 font-semibold">
                      ${item.price}
                    </p>

                    <p className="text-gray-400 text-sm">
                      Quantity: {item.qty}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div
            className="w-full md:w-1/3 p-6 
            bg-neutral-900 border border-neutral-800 
            rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              Order Summary
            </h3>

            <div className="flex justify-between mb-2 text-gray-300">
              <span>Items ({cart.length})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="border-t border-neutral-800 my-3"></div>

            <div className="flex justify-between font-semibold text-lg text-white">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <Link
              href={`${process.env.NEXT_PUBLIC_FRONT_END}/checkout`}
              className="mt-6 w-full inline-block 
              bg-white text-black hover:bg-gray-200 
              py-3 rounded-lg cursor-pointer text-center 
              font-semibold transition"
            >
              Proceed to Checkout
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}