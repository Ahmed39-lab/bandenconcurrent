"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImageSlider({ data }) {

  const product = data?.images || [];

  const productImages = product.map((img) => {
    return `${img.url}`;
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  if (!productImages.length) return null;

  return (
    <div className="w-full md:w-1/2 bg-black border border-neutral-800 p-4 rounded-xl shadow flex gap-4 relative text-white">

      {/* THUMBNAILS */}
      <div className="flex flex-col gap-2">

        {productImages.map((img, idx) => (

          <div
            key={idx}
            className={`w-20 h-20 border rounded-lg overflow-hidden cursor-pointer transition
            ${
              idx === activeIndex
                ? "border-white"
                : "border-neutral-700 hover:border-neutral-500"
            }`}
            onClick={() => setActiveIndex(idx)}
          >

            <Image
              src={img}
              alt={`Thumb ${idx}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />

          </div>

        ))}

      </div>

      {/* MAIN IMAGE */}
      <div className="flex-1 relative">

        {/* LEFT ARROW */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 -left-4 -translate-y-1/2 bg-neutral-900 border border-neutral-700 p-2 rounded-full hover:bg-neutral-800 transition z-10"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 -right-4 -translate-y-1/2 bg-neutral-900 border border-neutral-700 p-2 rounded-full hover:bg-neutral-800 transition z-10"
        >
          <ChevronRight size={22} className="text-white" />
        </button>

        <div className="w-full h-[420px] relative rounded-lg overflow-hidden bg-neutral-900">

          <Image
            src={productImages[activeIndex]}
            alt={`Product ${activeIndex}`}
            fill
            className="object-contain"
          />

        </div>

        {/* <span className="text-xs text-gray-400 block mt-2">
          Product ID:
        </span> */}

      </div>

    </div>
  );
}