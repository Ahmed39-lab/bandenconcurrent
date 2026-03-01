import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Hero() {
    //const clients = new Array(10).fill("/images/client.png"); // 8 images same

//     const clients = [
//   "/images/clients/bridgestone.png",
//   "/images/clients/Continental-logo.png",
//   "/images/clients/dunlop.png",
//   "/images/clients/Hankook_logo.png",
//   "/images/clients/issue-login.png",
//   "/images/clients/michelin.png",
//   "/images/clients/Pirelli_logo.png",
//   "/images/clients/vredestein-logo.png"
// ];
  const clients = [
  "/images/clients/michelin.png",
  "/images/clients/Continental-logo.png",
  "/images/clients/michelin.png",
   "/images/clients/Continental-logo.png",
  "/images/clients/michelin.png",
   "/images/clients/Continental-logo.png",
  "/images/clients/michelin.png",
   "/images/clients/Continental-logo.png"
];

  return (
    <>
      <section
        className="relative"
        style={{
          backgroundImage: "url('/images/header-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-8 pt-7 md:pt-20 pb-3 md:pb-20">
          {/* LEFT CONTENT */}
          <div className="md:w-1/2 w-full text-white relative space-y-6 mx-5 md:mx-0">
            <div>
              <h2 className="text-3xl md:text-6xl uppercase font-bold mb-4 text-[#fded5b]">
                The best tire shop
              </h2>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 mt-1 bg-[#fded5b] text-gray-700 rounded-full p-1" />
                  <span className="font-medium">
                    When you land on a sample web page or open
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 mt-1 bg-[#fded5b] text-gray-700 rounded-full p-1" />
                  <span className="font-medium">
                    A sample web page or open When you land on a sample web page
                    or open
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 mt-1 bg-[#fded5b] text-gray-700 rounded-full p-1" />
                  <span className="font-medium">
                    When you land on a sample web page or open
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 mt-1 bg-[#fded5b] text-gray-700 rounded-full p-1" />
                  <span className="font-medium">
                    When you land on a sample web page or open
                  </span>
                </li>
              </ul>
            </div>

            {/* SECOND PARAGRAPH (responsive fix) */}
            <div className="text-black md:absolute  md:top-[320px] hidden md:block">
                <h1 className="text-2xl font-semibold">Major brands. Huge selection. Big discounts!</h1>
                <div className="flex flex-wrap gap-4 mt-7">
      {clients.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Client ${index + 1}`}
          width={125}
          height={100}
          className="object-contain"
        />
      ))}
    </div>
            </div>
          </div>

          {/* RIGHT BOX */}
          <div className="w-full md:w-[550px] rounded-lg shadow-xl relative  bg-black">
            <div className="absolute top-0 left-0 w-full bg-black p-5 rounded-lg">
              <SimpleTireForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;

export function SimpleTireForm() {
  return (
<div className="pt-6 pb-6 px-6 rounded-xl max-w-md mx-auto space-y-5 bg-black  text-white shadow-2xl">

  {/* Heading */}
  <h2 className="text-xl font-semibold">
    <span className="bg-[#fded5b] text-black px-2 py-1 mr-1 rounded">
      Find
    </span>
    your suitable car tire
  </h2>

  {/* Season */}
  <div>
    <label className="block text-sm font-semibold mb-1 text-gray-300">
      Season
    </label>
    <select className="w-full rounded-md p-2 bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-[#fded5b] focus:outline-none">
      <option>Summer tires</option>
      <option>Winter tires</option>
      <option>All season tires</option>
    </select>
  </div>

  {/* Width | Height | Inch */}
  <div className="grid grid-cols-3 gap-3">
    {["Width", "Height", "Inch"].map((label, i) => (
      <div key={i}>
        <label className="block text-sm font-semibold mb-1 text-gray-300">
          {label}
        </label>
        <select className="w-full rounded-md p-2 bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-[#fded5b] focus:outline-none">
          <option>205</option>
          <option>215</option>
          <option>225</option>
        </select>
      </div>
    ))}
  </div>

  <hr className="border-dashed border-neutral-700" />

  {/* Delivery options */}
  <div>
    <p className="font-semibold mb-2 text-gray-200">
      Where should we deliver your tires?
    </p>

    <label className="flex items-center gap-2 p-2 rounded-md mb-2 bg-neutral-900 border border-neutral-700 cursor-pointer hover:border-[#fded5b]">
      <input type="radio" name="delivery" defaultChecked />
      <span>Deliver to my home or garage</span>
    </label>

    <label className="flex items-center gap-2 p-2 rounded-md bg-neutral-900 border border-neutral-700 relative cursor-pointer hover:border-[#fded5b]">
      <input type="radio" name="delivery" />
      <span>Deliver to an installation partner</span>
      <span className="absolute right-2 top-2 text-xs bg-[#fded5b] text-black px-2 py-0.5 rounded font-semibold">
        Most chosen
      </span>
    </label>
  </div>

  {/* Benefits */}
  <ul className="text-sm space-y-1 text-gray-300">
    <li>✔ Customer rating 9.5</li>
    <li>✔ Fast delivery</li>
    <li>✔ Installation always close by</li>
  </ul>

  {/* Button */}
  <Link href={`${process.env.NEXT_PUBLIC_FRONT_END}/sizes/14-14-15?type=SUV`}>
    <button className="w-full bg-[#fded5b] text-black p-3 rounded-lg font-semibold hover:scale-[1.02] transition-all">
      To search
    </button>
  </Link>

</div>
  );
}