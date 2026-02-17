"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessClient() {
  const searchParams = useSearchParams();

  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");

  const isSuccess = redirectStatus === "succeeded";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
        {isSuccess ? (
          <>
            <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-800">
              Payment Successful 🎉
            </h1>

            <p className="text-gray-600 mt-2">
              Aap ka payment successfully complete ho gaya hai.
            </p>

            <div className="bg-gray-100 rounded-lg p-3 mt-4 text-sm text-gray-700 break-all">
              <strong>Payment ID:</strong>
              <br />
              {paymentIntent || "N/A"}
            </div>

            <Link
              href="/"
              className="inline-block mt-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Go to Home
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-red-600">
              Payment Failed ❌
            </h1>
            <p className="text-gray-600 mt-2">
              Payment complete nahi ho saka. Please dobara try karein.
            </p>

            <Link
              href="/checkout"
              className="inline-block mt-6 bg-black text-white px-6 py-2 rounded-lg"
            >
              Back to Checkout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
