"use client";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/useCartStore";

export default function CartForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const { cart } = useCartStore();


  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Secure Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT - PAYMENT */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          {/* <h3 className="text-lg font-semibold mb-4">
            Card & Billing Information
          </h3> */}

          <form onSubmit={handleSubmit} 
          id="checkout-form"
          className="space-y-4">
            <PaymentElement />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

          
          </form>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-24">
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="space-y-3">
              {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.title} × {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
                 <div className="border-gray-200 border-t my-4"></div>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
              <button
              disabled={!stripe || loading}
              form="checkout-form"
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Secure SSL encrypted payment powered by Stripe.
          </p>
        </div>

      </div>
    </div>
  );
}
