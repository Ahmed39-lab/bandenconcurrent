'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getProductByCategories, getVariations } from '../lib/product/product';

function MegaMenu({ slug, openIndex, setOpenIndex }) {
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
  const [popularProducts, setPopularProducts] = useState(null);
  const [variations,setVariations] = useState(null);
  const getProducts = async () => {
    const popProd = await getProductByCategories('passenger-tyres');
    setPopularProducts(popProd);
  };
  const getVariations1 = async () => 
  {
    const data = await getVariations();
    setVariations(data);
  }

  useEffect(() => {


    getProducts();
    getVariations1();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-6 text-black">

      {/* Column 1 */}
      <div className="p-2 border-r-2 border-[#d2d2d2]">
        <h2 className="font-bold text-lg mb-2">Popular Car Tyre</h2>

        {(popularProducts && popularProducts.length>0) && (
          <ul className="space-y-3">
            {popularProducts.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.slug ? `/product/${item.slug}` : '#'}
                  onClick={() => setOpenIndex(null)}
                >
                  {item.name || 'New'}
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
       

          { (variations && variations.length>0) && (
              variations.map((item,i)=>(
              <li key={i}>
            <Link href={`${baseUrl}/sizes/${item.allParams}`} onClick={() => setOpenIndex(null)}>
              {`w-${item.width}h-${item.height}s-${item.size}`}
            </Link>
            </li>      
              ))
          )
              
          }
          {/* <li>
            <Link href={`${baseUrl}/sizes/10-15-5`} onClick={() => setOpenIndex(null)}>
              w-10/h-10/s-15
            </Link>
          </li>
          <li><Link href={`${baseUrl}/sizes/Tyre45-78`} onClick={() => setOpenIndex(null)}>185/65 R17</Link></li>
          <li><Link href={`${baseUrl}/sizes/Tyre45-78`} onClick={() => setOpenIndex(null)}>185/65 R18</Link></li>
          <li><Link href={`${baseUrl}/sizes/Tyre45-78`} onClick={() => setOpenIndex(null)}>185/65 R19</Link></li>
          <li><Link href={`${baseUrl}/sizes/Tyre45-78`}>185/65 R15</Link></li>
          <li><Link href={`${baseUrl}/sizes/Tyre45-78`}>185/65 R17</Link></li>
          <li><Link href={`${baseUrl}/sizes/Tyre45-78`}>185/65 R18</Link></li>
          <li><Link href={`${baseUrl}/sizes/Tyre45-78`}>185/65 R19</Link></li> */}
        </ul>
      </div>

      {/* Column 3 */}
      <div className="p-2 border-r-2 border-[#d2d2d2]">
        <h2 className="font-bold text-lg mb-2">Brands</h2>
        <ul className="space-y-2">
          <li><Link href={`${baseUrl}/brand/bridgestone`}>Bridgestone</Link></li>
          <li><a href="#">Pirelli</a></li>
          <li><a href="#">Michelin</a></li>
          <li><a href="#">Bridgestone</a></li>
          <li><a href="#">Pirelli</a></li>
          <li><a href="#">Michelin</a></li>
        </ul>
      </div>

      {/* Column 4 */}
      <div className="p-2 border-r-2 border-[#d2d2d2]">
        <h2 className="font-bold text-lg mb-2">All-Season Tyre</h2>
        <ul className="space-y-2">
          <li><a href="#">Touring Tyre</a></li>
          <li><a href="#">Summer Tyre</a></li>
          <li><a href="#">Winter Tyre (Snow Tyre)</a></li>
          <li><a href="#">Touring Tyre</a></li>
          <li><a href="#">Summer Tyre</a></li>
          <li><a href="#">Winter Tyre (Snow Tyre)</a></li>
        </ul>
      </div>

    </div>
  );
}

export default MegaMenu;
