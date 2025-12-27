// /app/sizes/[sizeSlug]/page.tsx
import { getProductsBySize } from '@/app/_components/lib/product/product';
import Variations from '@/app/_components/product/variations';
import React from 'react';


interface PageProps {
  params: Promise<{ slug: string }>;
}

// Server component
export default async function page({ params }: PageProps) {
 // const sizeSlug = params.sizeSlug; // direct string
 const { slug } =await params;
 //const products = await getProductsBySize(sizeSlug);
 //console.log(products)

  return (
    <>
            <div>{slug}</div>
            <Variations />
            {/* <div>const { sizeSlug }</div> */}
    </>
    
  );
}
