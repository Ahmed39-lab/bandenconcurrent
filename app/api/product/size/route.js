import { NextResponse } from "next/server";

export async function GET(request) {
  try {


     const url = new URL(request.url);

    // query parameter "slug" le lo
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return new Response(
        JSON.stringify({ error: "Slug query parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("currnt slug ", slug);
const [width,height,size] = slug.split("-");

console.log("Width:", width, "Height:", height, "Size:", size);
    const params = new URLSearchParams({
      "filters[width][$eq]": width,
       "filters[height][$eq]": height.toString(),
      // "filters[size][$eq]": size.toString(),
      populate: "*",
    });

    const apiUrl = `${process.env.STRAPI_API_URL}/variations?${params.toString()}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Strapi Error: ${res.status}`);
    }

    const resData = await res.json(); // ✅ CORRECT

    return NextResponse.json(resData);

  } catch (err) {
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
