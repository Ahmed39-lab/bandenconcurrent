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
    <footer className="bg-gray-100 mt-10 py-8 text-sm text-black">
      <div className="max-w-[1300px] mx-auto px-4">
        {/* Top Row: Logo + Rating */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
<div className="relative w-[150px] h-10">
  <Link href={`${baseUrl}`}>
    <Image
      src="/images/logo.svg"
      alt="Logo"
      fill
    />
    </Link>
  </div>


          <div className="text-gray-700">⭐⭐⭐⭐⭐ Rating: 4.9</div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {columns.map((col, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-2 text-[16px]">{col.title}</h3>
              <ul className="space-y-1 text-black">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-black">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div>
            <h3 className="font-semibold mb-2">Newsletter</h3>
            <p className="text-sm text-gray-700 mb-2">
              Subscribe to get our latest updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 border rounded w-full"
              />
              <button className="bg-black text-white px-4 py-2 rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-4 text-sm gap-4">
          {/* Left Section: Copyright + Menu */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© {new Date().getFullYear()} Hostbrake. All rights reserved.</span>
            {footerMenu.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="hover:text-black ml-2"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Right Section: Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-black">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-black">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-black">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-black">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
