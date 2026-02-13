"use client";

import { useForm } from "react-hook-form";
import { useCartStore } from "../store/useCartStore";

export default function CheckoutForm() {
  const { cart } = useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data) => {
    console.log("Checkout Data:", data);
    await new Promise((res) => setTimeout(res, 1500));
    alert("Order placed successfully ✅");
    reset();
  };

  return (
    <div className="max-w-[1200px] px-4 py-8 ">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT - FORM */}
        <form
          id="checkout-form"  
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 bg-white border-gray-100 border rounded-xl p-8 space-y-6"
        >
          <h2 className="text-xl font-semibold">Billing Details</h2>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                {...register("firstName", { required: "First name required" })}
                className="w-full border-gray-200 border rounded-lg px-4 py-3 focus:ring-1 focus:ring-gray-300 outline-none"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last name required" })}
                className="w-full border-gray-200 border rounded-lg px-4 py-3 focus:ring-1 focus:ring-gray-300 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              className="w-full border-gray-200 border rounded-lg px-4 py-3 focus:ring-1 focus:ring-gray-300 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              {...register("phone", { required: "Phone required" })}
              className="w-full border-gray-200 border rounded-lg px-4 py- focus:ring-1 focus:ring-gray-300 outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Shipping Address
            </label>
            <textarea
              {...register("address", { required: "Address required" })}
              rows={3}
              className="w-full border-gray-200 border rounded-lg px-4 py-3 focus:ring-1 focus:ring-gray-300 outline-none"
            />
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-medium mb-2">Payment Method</h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2 border-gray-200 border rounded-lg p-3 cursor-pointer">
                <input
                  type="radio"
                  value="cod"
                  {...register("paymentMethod", { required: true })}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2 border-gray-200 border rounded-lg p-3 cursor-pointer">
                <input
                  type="radio"
                  value="card"
                  {...register("paymentMethod")}
                />
                Credit / Debit Card
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-3 bg-gray-50 border-gray-200 border rounded-lg p-3 text-sm text-gray-600">
                Stripe / Card gateway yahan integrate hoga
              </div>
            )}
          </div>

         
        </form>

        {/* RIGHT - SUMMARY */}
        <div className="bg-gray-50 border-gray-200 border rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-700">
                  {item.title} × {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
           <div className="border-t my-4"></div>
            {/* ✅ PROCESS ORDER BUTTON */}
  <button
    type="submit"
    form="checkout-form"
    disabled={isSubmitting}
    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
  >
    {isSubmitting ? "Processing..." : "Process Order"}
  </button>
        </div>
        
      </div>
    </div>
  );
}
