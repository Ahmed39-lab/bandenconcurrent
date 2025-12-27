import { get } from "http";

// src/lib/getProducts.ts
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
// export async function getProductsBySize(sizeSlug: string) {
  
//   //   console.log(baseUrl)
//   // const res = await fetch(
//   //   `${baseUrl}/api/product?sizeSlug=${sizeSlug}`,
//   //   {
//   //     cache: "no-store",
//   //     // next: { revalidate: 0 } // alternative
//   //   }
//   // );

//   // if (!res.ok) throw new Error("Failed to fetch products");

//   // return res.json();
// }

export async function getProductByCategories(category: string) {
  const res = await fetch(
    `${baseUrl}/api/productCategory?cat=${category}`,
    {
      cache: "no-store",
      // next: { revalidate: 0 } // alternative
    }
  );
  return res.json();
}
export async function getProductBySlug(slug: string) {
  const res = await fetch(
    `${baseUrl}/api/product/singleProduct?slug=${slug}`,
    {
      cache: "no-store",
      // next: { revalidate: 0 } // alternative
    }
  );
  return res.json();
}
