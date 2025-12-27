
'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getProductByCategories } from '../lib/product/product';
import { json } from 'stream/consumers';
  type MegaMenuProps = {
  slug: string;
  openIndex: string | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<string | null>>; // correct type
};
function MegaMenu({ slug, openIndex, setOpenIndex }: MegaMenuProps) {
   const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
   //console.log("THis is base url:",baseUrl)
   const [popularProducts,setpopularProducts] = useState<any>(null)
   

 useEffect(() => {
  const fetchData = async () => {
    const popProd = await getProductByCategories("motorbike-tyres1");
    setpopularProducts(popProd)
  };

  fetchData();
}, []);


 
   

  return (
       <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-6 text-black">
          {/* Column 1 */}
  <div className="p-2 border-r-2 border-[#d2d2d2]">
    <h2 className="font-bold text-lg mb-2">Popular Car Tyre</h2>
    {/* {JSON.stringify(popularProducts,null,2)} */}
  {popularProducts && (
  <ul className="space-y-3">
{popularProducts.map((item:any, index:number) => (
  <li key={index}>
  <Link href={item.slug ? `/product/${item.slug}` : "#"}>
    {item.name || "New"}
  </Link>
</li>

))}
  </ul>
 
)}

  
  </div>

  {/* Column 2 */}
  <div className="p-2 border-r-2 border-[#d2d2d2]">
    <h2 className="font-bold text-lg mb-2">Tyre Sizes</h2>
    <ul className="space-y-2">
      <li><Link href={`${baseUrl}/sizes/10-15-5`} className="" onClick={()=>setOpenIndex(null )}>w-10/h-10/s-15</Link></li>
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
       <li><Link href={`${baseUrl}/brand/bridgestone`} className="">Bridgestone</Link></li>
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