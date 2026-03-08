'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getProductByCategories, getVariations } from '../lib/product/product';

function MegaMenu({ setOpenIndex }) {
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
  const [popularProducts, setPopularProducts] = useState(null);
  const [variations, setVariations] = useState(null);

  useEffect(() => {
     if (popularProducts && variations) return;
    const fetchData = async () => {
      const [popProd, variationsData] = await Promise.all([
        getProductByCategories('passenger-tyres'),
        getVariations()
      ]);

      setPopularProducts(popProd);
      setVariations(variationsData);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-6 text-white">

      {/* Column 1 */}
      <div className="p-3 border-r border-neutral-800">
        <h2 className="font-semibold text-[15px] uppercase tracking-wider mb-3 text-gray-300">
          Popular Car Tyre
        </h2>

        {(popularProducts && popularProducts.length > 0) && (
          <ul className="space-y-2 text-sm">
            {popularProducts.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.slug ? `/product/${item.slug}` : '#'}
                  onClick={() => setOpenIndex(null)}
                  className="hover:text-gray-400 transition"
                >
                  {item.name || 'New'}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Column 2 */}
      <div className="p-3 border-r border-neutral-800">
        <h2 className="font-semibold text-[15px] uppercase tracking-wider mb-3 text-gray-300">
          Tyre Sizes
        </h2>

        <ul className="space-y-2 text-sm">
          {(variations && variations.length > 0) &&
            variations.map((item, i) => (
              <li key={i}>
                <Link
                  href={`${baseUrl}/sizes/${item.allParams}`}
                  onClick={() => setOpenIndex(null)}
                  className="hover:text-gray-400 transition"
                >
                  {`w-${item.width} h-${item.height} s-${item.size}`}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Column 3 */}
      <div className="p-3 border-r border-neutral-800">
        <h2 className="font-semibold text-[15px] uppercase tracking-wider mb-3 text-gray-300">
          Brands
        </h2>

        <ul className="space-y-2 text-sm">
          <li><Link href={`${baseUrl}/brand/bridgestone`} className="hover:text-gray-400">Bridgestone</Link></li>
          <li><a href="#" className="hover:text-gray-400">Pirelli</a></li>
          <li><a href="#" className="hover:text-gray-400">Michelin</a></li>
          <li><a href="#" className="hover:text-gray-400">Goodyear</a></li>
          <li><a href="#" className="hover:text-gray-400">Continental</a></li>
        </ul>
      </div>

      {/* Column 4 */}
      <div className="p-3">
        <h2 className="font-semibold text-[15px] uppercase tracking-wider mb-3 text-gray-300">
          All Season Tyres
        </h2>

        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-gray-400">Touring Tyre</a></li>
          <li><a href="#" className="hover:text-gray-400">Summer Tyre</a></li>
          <li><a href="#" className="hover:text-gray-400">Winter Tyre</a></li>
          <li><a href="#" className="hover:text-gray-400">Performance Tyre</a></li>
          <li><a href="#" className="hover:text-gray-400">Off-road Tyre</a></li>
        </ul>
      </div>

    </div>
  );
}

export default MegaMenu;