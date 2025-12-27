import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("cat");

    if (!category) {
      return NextResponse.json(
        { error: "Category (cat) query parameter is required" },
        { status: 400 }
      );
    }

    // ------------------------------------
    // 🔹 All query params in one object
    // ------------------------------------
    const params = new URLSearchParams({
      "filters[category_id][slug][$eq]": category,
      "fields[0]": "name",
      "fields[1]": "slug",
      "populate[category_id][fields][0]": "title",
      "populate[category_id][fields][1]": "slug",
    });


    // ------------------------------------
    // 🔹 Final URL
    // ------------------------------------
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

// Strapi returns array in resData.data
// const data = resData.data.map((product:any) => ({
//   name: product.attributes.name,
//   slug: product.attributes.slug,
//   category: {
//     title: product.attributes.category_id?.data?.attributes?.title || "",
//     slug: product.attributes.category_id?.data?.attributes?.slug || "",
//   },
// }));
const data = resData.data.map((product:any) => ({
  name: product.name || "",
  slug: product.slug || "",
  category: {
    title: product.category_id?.[0]?.title || "",
    slug: product.category_id?.[0]?.slug || "",
  },
}));
//console.log("Fetched products by category:", data);
    return NextResponse.json(data);

  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
