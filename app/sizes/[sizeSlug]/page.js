// /app/sizes/[sizeSlug]/page.jsx
import React from "react";
import Variations from "@/app/_components/product/variations";
import { getProductsBySize } from "@/app/_components/lib/helperAPI";

export default async function Page({ params, searchParams }) {
  // 1️⃣ Get dynamic route segment
  const { sizeSlug } = await params; // No need for await here
  const resolvedSearchParams = await searchParams;
  // 2️⃣ Convert all query params to a single string
  //const queryString = new URLSearchParams(searchParams).toString();
  //console.log("Query string:", queryString);
  // Example output: "brand=Brand1,Brand2&category=TyreA&minPrice=0&maxPrice=5000"

  // 3️⃣ Fetch data from your API

  
  const data = await getProductsBySize(sizeSlug,resolvedSearchParams);
  

  return (
    <>

    {/* Debug output */}
      <div className="mt-4 text-gray-600">
        {/* <p>
          <strong>Size Slug:</strong> {sizeSlug}
        </p> */}
        <p>
          {/* <strong>Query String:</strong> {JSON.stringify(searchParams,null,2)} */}
        </p>
      </div>
      {data && (
        <Variations data={data} slug={sizeSlug}  />
      )}

      
    </>
  );
}
