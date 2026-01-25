import { NextResponse } from "next/server";

export async function GET(request) {
  try {


     const url = new URL(request.url);

    // query parameter "slug" le lo
    //console.log("Comple url", url);
    const slug = url.searchParams.get("slug");
    const brand = url.searchParams.get("brand");
    const category = url.searchParams.get("category");
    const productType = url.searchParams.get("productType");
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    


    if (!slug) {
      return new Response(
        JSON.stringify({ error: "Slug query parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
   // console.log("currnt slug ", slug);
//const [width,height,size] = slug.split("-");

//console.log("Width:", width, "Height:", height, "Size:", size);
    // const params = new URLSearchParams({
    //   "filters[width][$eq]": width,
      
    //   //"filters[title][$eq]": 'GripmaxProduct',
    //  //  "filters[height][$eq]": height.toString(),
    //   // "filters[size][$eq]": size.toString(),
    //   populate: "*",
    // });
    const params = new URLSearchParams();
    params.set("populate[product][populate]", "*");
    // if (width) {
    // params.set("filters[width][$eq]", width);
    // }
    // if (height) {
    // params.set("filters[height][$eq]", height);
    // }

    // Example minPrice and maxPrice
if (minPrice > 0 && maxPrice > 0) {
  params.set("filters[price][$gte]", minPrice);
  params.set("filters[price][$lte]", maxPrice);
}

    if (productType) {
  // string ko array me convert karo (comma separated)
  const productTypeArray = productType.split(",").map(item => item.trim());

  // $in ke liye append karo
  productTypeArray.forEach((slug, index) => {
    params.append(`filters[product][product_type][slug][$in][${index}]`, slug);
  });
}
  if (category) {
  // string ko array me convert karo (comma separated)
  const categoryArray = category.split(",").map(item => item.trim());

  // $in ke liye append karo
  categoryArray.forEach((slug, index) => {
    params.append(`filters[product][category][slug][$in][${index}]`, slug);
  });
}
  if (brand) {
  // string ko array me convert karo (comma separated)
  const brandArray = brand.split(",").map(item => item.trim());

  // $in ke liye append karo
  brandArray.forEach((slug, index) => {
    params.append(`filters[product][brand][slug][$in][${index}]`, slug);
  });
}


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

    return NextResponse.json(resData.data);

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
