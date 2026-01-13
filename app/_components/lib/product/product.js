// src/lib/getProducts.js

const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;

// Get products by category
export async function getProductByCategories(category) {
   //console.log("products by caegory");
  const res = await fetch(
    `${baseUrl}/api/productCategory?cat=${category}`,
    {
      cache: "no-store",
      // next: { revalidate: 0 } // alternative
    }
  );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch products by category");
  // }

  return res.json();
}

// Get Variations Lists
export async function getVariations() {
  // console.log("Catgory fields is called");
  const res = await fetch(
    `${baseUrl}/api/product/variation`,
    {
      cache: "no-store",
      // next: { revalidate: 0 } // alternative
    }
  );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch products by category");
  // }

  return res.json();
}


// Get single product by slug
export async function getProductBySlug(slug) {
  console.log("From API", slug);
  const res = await fetch(
    `${baseUrl}/api/product/singleProduct?slug=${slug}`,
    {
      cache: "no-store",
      // next: { revalidate: 0 } // alternative
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product by slug");
  }

  return res.json();
}
