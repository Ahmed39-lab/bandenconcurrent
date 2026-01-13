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
