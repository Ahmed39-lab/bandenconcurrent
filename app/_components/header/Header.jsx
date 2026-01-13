"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";

import Topmenu from "./Topmenu";
import SearchMenu from "./SearchMenu";
import MegaMenu from "./MegaMenu";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;

  useEffect(() => {
    // client-side only
  }, []);

  const menuItems = [
    { name: "Car tires", slug: "car-tires" },
    { name: "Winter tires", slug: "winter-tires" },
    { name: "All-season tires", slug: "all-season-tires" },
    { name: "Tire brands", slug: "tire-brands" },
    { name: "Run-flat tires", slug: "run-flat-tires" },
    { name: "TipAPK", slug: "tipapk" },
    { name: "Assembly", slug: "assembly" },
  ];

  useEffect(() => {
    //console.log("API Function called!");

    const fetchProduct = async () => {
      const res = await fetch("/api/product");
      const data = await res.json();
     // console.log(data);
    };

    // fetchProduct();
  }, []);

  return (
    <>
      {/* Desktop */}
      <Topmenu />
      <SearchMenu />

      <header className="p-4 font-sans relative hidden md:block border-[#d2d2d2] border-b-1">
        <nav className="relative max-w-[1200px] mx-auto">
          <ul className="flex space-x-8">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="hover:text-blue-600 py-2 text-black text-sm md:text-[16px]"
                onMouseEnter={() => setOpenIndex(item.slug)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                <a href="#" className="flex font-semibold">
                  {item.name}
                  <ChevronDown />
                </a>

                {openIndex === item.slug && (
                  <div
                    className={`
                      mega-menu
                      absolute top-full left-1/2 -translate-x-1/2
                      w-screen bg-white shadow-lg p-6 z-50
                      border-t-2 border-[#d2d2d2]
                      transition-all duration-500 ease-in-out
                      overflow-hidden
                      ${
                        openIndex === item.slug
                          ? "opacity-100 max-h-[1000px]"
                          : "opacity-0 max-h-0"
                      }
                    `}
                  >
                    <MegaMenu
                      key={item.slug}
                      slug={item.slug}
                      openIndex={openIndex}
                      setOpenIndex={setOpenIndex}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden p-4 font-sans relative border-b border-gray-300">
        <div className="flex justify-between items-center">
          <div className="w-[150px] h-10 relative">
            <Link href={`${baseUrl}`}>
              <Image
                src="/images/logo.svg"
                alt="Hostbrake Logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="mt-4 bg-white shadow-lg border-t border-gray-200">
            <ul>
              {menuItems.map((item) => (
                <li key={item.slug} className="border-b border-gray-200">
                  <button
                    className="w-full flex justify-between items-center p-4"
                    onClick={() =>
                      setOpenIndex(openIndex === item.slug ? null : item.slug)
                    }
                  >
                    {item.name}
                    <ChevronDown size={16} />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === item.slug ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="p-4 bg-gray-50 grid grid-cols-1 gap-2">
                      <div>Submenu Item 1</div>
                      <div>Submenu Item 2</div>
                      <div>Submenu Item 3</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Mobile Search */}
      <section className="md:hidden">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center h-20 p-4">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <ShoppingCart size={24} />
        </div>
      </section>
    </>
  );
}
