import { NextResponse } from "next/server";

export async function GET() {
  try {
    //const apiUrl = `${process.env.STRAPI_API_URL}/variations?${params.toString()}`;
      const apiUrl = `${process.env.STRAPI_API_URL}/variations`;
      
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product from Strapi");
    }

                      const resData = await res.json();
   
        const data = resData.data.map((product) => ({
          id: product.id,
          width: product.width || "",
          height: product.height || "",
          size: product.size || "",
          allParams: `${product.width}-${product.height}-${product.size}`,
          price: product.price,
        }));
// console.log("variations filte data ", data)
 const filteredData = Array.from(
  new Map(
    data.map(product => [product.allParams, product])
  ).values()
)

   return NextResponse.json(filteredData || null);

  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}

   
    // // const url = new URL(request.url);
    // // const slug = url.searchParams.get("slug");
    

    // // if (!slug) {
    // //   return NextResponse.json(
    // //     { error: "Slug query parameter is required" },
    // //     { status: 400 }
    // //   );
    // // }

    // // // ------------------------------------
    // // // 🔹 Strapi Query (get product by slug)
    // // // ------------------------------------
    // // const params = new URLSearchParams({
    // //   "filters[slug][$eq]": slug,
    // //   populate: "*", // optional: remove if not needed
    // // });