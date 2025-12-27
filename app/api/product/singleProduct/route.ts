import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
      "populate": "*", // optional: remove if not needed
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

    const resData = await res.json();

    // ------------------------------------
    // 🔹 Format Data (Strapi v4)
    // ------------------------------------
    const data = resData.data.map((product: any) => ({
      id: product.id,
      name: product.name || "",
      slug: product.slug || "",
      price: product.price ?? "",
      description: product.description || "",
      images: product.images || null,
      category: product.category_id?.[0]?.slug || "",
    }));

//   const dataImages = resData.data.map((product: any) => {
//   const imgs = product.attributes?.images?.data || [];

//   return imgs.map((img: any) => ({
//     id: img.id,
//     url: img.attributes?.url,
//     alternativeText: img.attributes?.alternativeText,
//     formats: img.attributes?.formats || null,
//   }));
// });
//console.log("Fetched product images:", dataImages);
    return NextResponse.json(data[0]);

  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
