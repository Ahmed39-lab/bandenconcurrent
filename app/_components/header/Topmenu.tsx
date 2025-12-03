import { Check } from "lucide-react";
import React from "react";

function Topmenu() {
  return (
   <>
   {/* Desktop top menu */}
   <section className="bg-[#fff59d]  pt-1.5 pb-1.5 font-semibold text-[#203658] text-sm">
      <ul className="max-w-[1200px] flex  mx-auto flex-col md:flex-row justify-between space-x-3 decoration-0">
        <li className="flex space-x-2 items-center">
          <Check />
          <span>Rated 9.5 by 46,591 customers</span>
        </li>
        <li className="flex space-x-2 items-center">
          <Check />
          <span>Snelle levering</span>
        </li>
        <li className="flex space-x-2 items-center">
          <Check />
          <span>Heldere prijzen, geen verborgen kosten</span>
        </li>
        <li className="flex space-x-2 items-center">
          <Check />
          <span>Montage altijd dichtbij</span>
        </li>
      </ul>
    </section>
    </>
  );
}

export default Topmenu;
