import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    

    if (!slug) {
      return NextResponse.json(
        { error: "Slug query parameter is required" },
        { status: 400 }
      );
    }

    // ------------------------------------
    // 🔹 Strapi Query (get product by slug)
    // ------------------------------------
    const params = new URLSearchParams({
      "filters[slug][$eq]": slug,
      populate: "*", // optional: remove if not needed
    });

    const apiUrl = `${process.env.STRAPI_API_URL}/products?${params.toString()}`;

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
    //console.log("Single Product Route",resData);
    
//console.log("Route Data with out filter ", resData)
    // ------------------------------------
    // 🔹 Format Data (Strapi v4)
    // ------------------------------------
    const data = resData.data.map((product) => ({
      id: product.id,
      name: product.name || "",
      slug: product.slug || "",
      price: product.price ?? "",
      description: product.description || "",
     images: product.images || [],   // ✅ FIX
      categoryName:product.category?.title || "",
      categorySlug:product.category?.slug || "",
      brandName: product.brand?.title || "",
      brandSlug: product.brand?.slug || ""
        
    }));
console.log("Route Data filter ", data)
    return NextResponse.json(data[0] || null);

  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
