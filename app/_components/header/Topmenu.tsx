import { Check } from "lucide-react";
import React from "react";

function Topmenu() {
  return (
    <>
      {/* Desktop top menu */}
      <section className="bg-black border-b border-neutral-800 py-1">
        <ul className="max-w-[1200px] flex mx-auto flex-col md:flex-row justify-between space-x-3 text-xs font-medium">
          
          <li className="flex space-x-2 items-center">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#fded5b]">
              <Check size={10} className="text-black" />
            </span>
            <span className="text-white">Rated 9.5 by 46,591 customers</span>
          </li>

          <li className="flex space-x-2 items-center">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#fded5b]">
              <Check size={10} className="text-black" />
            </span>
            <span className="text-white">Snelle levering</span>
          </li>

          <li className="flex space-x-2 items-center">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#fded5b]">
              <Check size={10} className="text-black" />
            </span>
            <span className="text-white">Heldere prijzen, geen verborgen kosten</span>
          </li>

          <li className="flex space-x-2 items-center">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#fded5b]">
              <Check size={10} className="text-black" />
            </span>
            <span className="text-white">Montage altijd dichtbij</span>
          </li>

        </ul>
      </section>
    </>
  );
}

export default Topmenu;