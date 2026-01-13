import { NextResponse } from "next/server";

export async function GET(request) {
  try {
   //  console.log("products by test caegory");
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
      "filters[category][slug][$eq]": category,
      "fields[0]": "name",
      "fields[1]": "slug",
      "populate[category][fields][0]": "title",
      "populate[category][fields][1]": "slug",
    });

// http://localhost:1337/api/products?
// filters[category][slug][$eq]=motorbike-tyres1&
// fields[0]=name&
// fields[1]=slug&
// populate[category][fields][0]=title&
// populate[category][fields][1]=slug


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

    if (!res.ok) {
      throw new Error("Failed to fetch products by category");
    }

    const resData = await res.json();
   

    // ------------------------------------
    // 🔹 Format Data (Strapi v4 safe)
    // ------------------------------------
    // const data = resData.data.map((product) => ({
    //   name: product.attributes?.name || "",
    //   slug: product.attributes?.slug || "",
    //   category: {
    //     title:
    //       product.attributes?.category_id?.data?.attributes?.title || "",
    //     slug:
    //       product.attributes?.category_id?.data?.attributes?.slug || "",
    //   },
    // }));

    return NextResponse.json(resData.data);

  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
