// /app/sizes/[sizeSlug]/page.js
//import { getProductsBySize } from '@/app/_components/lib/product/product';
//import Variations from '@/app/_components/product/variations';
import React from 'react';

// Server component
export default async function Page({ params }) {
  const { slug } = await params;
  // const products = await getProductsBySize(slug);
  // console.log(products);

  return (
    <>
      <div>{slug}</div>
      {/* <Variations /> */}
    </>
  );
}
