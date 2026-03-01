"use client";
import Image from "next/image";
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

function Footer() {
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END || "";

  const columns = [
    { title: "Services", links: ["Service A", "Service B", "Service C", "Service D"] },
    { title: "Products", links: ["Product 1", "Product 2", "Product 3", "Product 4"] },
    { title: "Company", links: ["About Us", "Careers", "Contact", "Blog"] },
    { title: "Support", links: ["FAQ", "Help Center", "Terms & Conditions", "Privacy Policy"] },
  ];

  const footerMenu = [
    { title: "Privacy Policy", href: "#" },
    { title: "Terms & Conditions", href: "#" },
    { title: "Contact", href: "#" },
  ];

  return (
    <footer className="bg-black border-t border-neutral-800 mt-10 py-10 text-sm text-white">
      <div className="max-w-[1300px] mx-auto px-4">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="relative w-[150px] h-10">
            <Link href={`${baseUrl}`}>
              <Image
                src="/images/logo.svg"
                alt="Logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          <div className="text-gray-400 text-sm">
            ⭐⭐⭐⭐⭐ Rating: 4.9
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {columns.map((col, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-3 text-[15px] uppercase tracking-wide text-gray-300">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-3 uppercase tracking-wide text-gray-300">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Subscribe to get our latest updates.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 bg-neutral-900 border border-neutral-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-[#fded5b] text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-neutral-800 pt-5 text-xs text-gray-400 gap-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span>© {new Date().getFullYear()} Hostbrake. All rights reserved.</span>
            {footerMenu.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="hover:text-white transition"
              >
                {item.title}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white transition"><Twitter size={18} /></a>
            <a href="#" className="hover:text-white transition"><Instagram size={18} /></a>
            <a href="#" className="hover:text-white transition"><Linkedin size={18} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;