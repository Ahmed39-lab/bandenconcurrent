//const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
export async function getProductsBySize(slug,queryObj = {}) {

  // Build query string
  //console.log("Helper object",queryObj)
  const queryString = Object.entries(queryObj)
    .map(([key, value]) =>
      Array.isArray(value) ? `${key}=${value.join(",")}` : `${key}=${value}`
    )
    .join("&");

  

  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;

  const url = `${baseUrl}/api/product/size/?slug=${slug}${queryString ? "&" + queryString : ""}`;
  const res = await fetch(
    `${url}`,
    {
      cache: "no-store",
      // next: { revalidate: 0 } // alternative
    }
  );
  return res.json();
}


// utils/fetchProduct.js
export async function fetchSearchProducts(searchQuery) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
    const apiUrl = `${baseUrl}/api/product/search?searchQuery=${encodeURIComponent(searchQuery)}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // agar data hamesha fresh chahiye
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    
    return data; // yahan Strapi ka response return ho raha
  } catch (error) {
    //console.error("Fetch Error:", error);
    return null;
  }
}
