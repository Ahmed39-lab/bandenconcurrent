// /app/sizes/[sizeSlug]/page.jsx
//import { getProductsBySize } from '@/app/_components/lib/product/product';
import { getProductsBySize } from '@/app/_components/lib/helperAPI';
import Variations from '@/app/_components/product/variations';
import React from 'react';

// Server component
export default async function Page({ params }) {
  // params is a promise
  const { sizeSlug } = await params;

  // Uncomment if you want to fetch products
   const products = await getProductsBySize(sizeSlug);
   console.log("Currenrt Produts ",products);

  return (
    <>
   
      <Variations />
      {/* <div>{sizeSlug}</div> */}
    </>
  );
}
