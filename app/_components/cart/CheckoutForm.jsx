"use client";

import { useForm } from "react-hook-form";
import { useCartStore } from "../store/useCartStore";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/useUserStore";

export default function CheckoutForm() {
  const { cart } = useCartStore();
  const { setUserInformation } = useUserStore();
  const router = useRouter();

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
  } = useForm({
    defaultValues: {
      firstName: "Israr",
      lastName: "Ahmed",
      email: "israr@gmail.com",
      phone: "03001234567",
      address: "Lahore",
      paymentMethod: "card",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data) => {
    console.log("Checkout Data:", data);

    if (data.paymentMethod === "cod") {
      await new Promise((res) => setTimeout(res, 1000));
      alert("COD Order placed ✅");
      reset();
      return;
    }

    if (data.paymentMethod === "card") {
      setUserInformation(data);
      router.push("/checkout/addcart");
      return;
    }
  };

  return (
    <div className="px-4 py-10 bg-black text-white max-w-[1200px]">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT FORM */}
        <form
          id="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-6"
        >
          <h2 className="text-xl font-semibold">Billing Details</h2>

          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm mb-1 text-gray-300">
                First Name
              </label>
              <input
                {...register("firstName", { required: "First name required" })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white"
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last name required" })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Phone</label>
            <input
              {...register("phone", { required: "Phone required" })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Shipping Address
            </label>
            <textarea
              {...register("address", { required: "Address required" })}
              rows={3}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white"
            />
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-medium mb-2">Payment Method</h3>

            <div className="space-y-3">

              <label className="flex items-center gap-3 border border-neutral-700 rounded-lg p-3 cursor-pointer hover:bg-neutral-800">
                <input
                  type="radio"
                  value="cod"
                  {...register("paymentMethod", { required: true })}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-3 border border-neutral-700 rounded-lg p-3 cursor-pointer hover:bg-neutral-800">
                <input
                  type="radio"
                  value="card"
                  {...register("paymentMethod")}
                />
                Credit / Debit Card
              </label>

            </div>

            {paymentMethod === "card" && (
              <div className="mt-4 border border-neutral-700 rounded-lg p-4 bg-neutral-800 text-gray-400 text-sm">
                Stripe payment gateway yahan integrate hoga
              </div>
            )}

          </div>
        </form>

        {/* ORDER SUMMARY */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-300">
                  {item.title} × {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-800 my-4"></div>

          <div className="flex justify-between text-sm mb-2 text-gray-300">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="border-t border-neutral-800 my-4"></div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-white text-black hover:bg-gray-200 py-3 rounded-lg font-semibold transition"
          >
            {isSubmitting ? "Processing..." : "Process to Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}