"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional, or use your own SVG
import { json } from "stream/consumers";



export default function ProductImageSlider({ data }: any) {
  //console.log("ProductImageSlider data:", data.images);
  
//console.log("Environment variable NEXT_PUBLIC_BAKEND_URL:", process.env.BACKEND_URL);
const bakend_url = 'http://localhost:1337';//process.env.BACKEND_URL;   
const product = data.images;

const productImages = product?.map((img: any) => {
     return `${bakend_url}${img.url}`;
  })
// console.log("Mapped product images URLs:", productImages1);
//   const productImages = [
//   "/images/product/p1.webp",
//   "/images/product/p2.webp",
//   "/images/product/p3.webp",
//   "/images/product/p4.webp",
// ];
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

  return (
    <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded shadow flex gap-4 relative">
      {/* {JSON.stringify(data)}   */}
      {/* THUMBNAILS */}
      <div className="flex flex-col gap-2">
        
        {productImages.map((img:any, idx:any) => (
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
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
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
         {/* <img 
  src={`${bakend_url}${productImages1[0]}`} 
  alt="ksfjsjf" 
/> */}
        </span>
      </div>
    </div>
  );
}
