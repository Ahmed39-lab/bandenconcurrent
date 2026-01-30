"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImageSlider({ data }) {
  const backend_url = process.env.NEXT_PUBLIC_FRONT_END;
  console.log(process.env.NEXT_PUBLIC_FRONT_END);

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
    <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded shadow flex gap-4 relative">
      {/* THUMBNAILS */}
        {/* <pre>
          <p>{JSON.stringify(productImages,null,2)}</p>
          </pre> */}
      <div className="flex flex-col gap-2">
        {productImages.map((img, idx) => (
          <div
            key={idx}
            className={`w-20 h-20 border rounded overflow-hidden cursor-pointer ${
              idx === activeIndex ? "border-blue-500" : "border-gray-200"
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
        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
        >
          <ChevronRight size={24} />
        </button>

        <div className="w-full h-[400px] relative rounded overflow-hidden">
       
          <Image
            src={productImages[activeIndex]}
            alt={`Product ${activeIndex}`}
            fill
            className="object-contain"
          />
        </div>

        <span className="text-xs text-gray-500 block mt-2">
          Product ID:
        </span>
      </div>
    </div>
  );
}
