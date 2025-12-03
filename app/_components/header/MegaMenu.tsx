
'use client';
import Link from 'next/link';
import React from 'react'
  type MegaMenuProps = {
  slug: string;
  openIndex: string | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<string | null>>; // correct type
};
function MegaMenu({ slug, openIndex, setOpenIndex }: MegaMenuProps) {
   const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
   console.log("THis is base url:",baseUrl)

 
   

  return (
       <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-6 text-black">
          {/* Column 1 */}
  <div className="p-2 border-r-2 border-[#d2d2d2]">
    <h2 className="font-bold text-lg mb-2">Popular Car Tyre</h2>
    <ul className="space-y-3">
      <li><a href="#" className="">Michelin Pilot Sport 4</a></li>
      <li><a href="#" className="">Bridgestone Turanza T005</a></li>
      <li><a href="#" className="">Dunlop SP Sport LM704</a></li>
      <li><a href="#" className="">Michelin Pilot Sport 4</a></li>
      <li><a href="#" className="">Bridgestone Turanza T005</a></li>
      <li><a href="#" className="">Dunlop SP Sport LM704</a></li>
      <li><a href="#" className="">Michelin Pilot Sport 4</a></li>
      <li><a href="#" className="">Bridgestone Turanza T005</a></li>
      <li><a href="#" className="">Dunlop SP Sport LM704</a></li>
    </ul>
  </div>

  {/* Column 2 */}
  <div className="p-2 border-r-2 border-[#d2d2d2]">
    <h2 className="font-bold text-lg mb-2">Tyre Sizes</h2>
    <ul className="space-y-2">
      <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="" onClick={()=>setOpenIndex(null)}>185/65 R15</Link></li>
      <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="" onClick={()=>setOpenIndex(null)}>185/65 R17</Link></li>
      <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="" onClick={()=>setOpenIndex(null)}>185/65 R18</Link></li>
      <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="" onClick={()=>setOpenIndex(null)}>185/65 R19</Link></li>
       <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="">185/65 R15</Link></li>
      <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="">185/65 R17</Link></li>
      <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="">185/65 R18</Link></li>
      <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="">185/65 R19</Link></li>
       <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="">185/65 R18</Link></li>
      <li><Link href={`${baseUrl}/sizes/Tyre45-78`} className="">185/65 R19</Link></li>
    </ul>
  </div>

  {/* Column 3 */}
  <div className="p-2 border-r-2 border-[#d2d2d2]">
    <h2 className="font-bold text-lg mb-2">Brands</h2>
    <ul className="space-y-2">
      <li><a href="#" className="">Michelin</a></li>
      <li><a href="#" className="">Bridgestone</a></li>
      <li><a href="#" className="">Pirelli</a></li>
      <li><a href="#" className="">Michelin</a></li>
      <li><a href="#" className="">Bridgestone</a></li>
      <li><a href="#" className="">Pirelli</a></li>
      <li><a href="#" className="">Michelin</a></li>
      <li><a href="#" className="">Bridgestone</a></li>
      <li><a href="#" className="">Pirelli</a></li>
    </ul>
  </div>

  {/* Column 4 */}
  <div className="p-2 border-r-2 border-[#d2d2d2]">
    <h2 className="font-bold text-lg mb-2">All-Season Tyre</h2>
    <ul className="space-y-2">
      <li><a href="#" className="">Touring Tyre</a></li>
      <li><a href="#" className="">Summer Tyre</a></li>
      <li><a href="#" className="">Winter Tyre (Snow Tyre)</a></li>
      <li><a href="#" className="">Touring Tyre</a></li>
      <li><a href="#" className="">Summer Tyre</a></li>
      <li><a href="#" className="">Winter Tyre (Snow Tyre)</a></li>
      <li><a href="#" className="">Touring Tyre</a></li>
      <li><a href="#" className="">Summer Tyre</a></li>
      <li><a href="#" className="">Winter Tyre (Snow Tyre)</a></li>
    </ul>
  </div>
</div>
  )
}

export default MegaMenu