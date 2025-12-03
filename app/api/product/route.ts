import { error } from "console";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try{
       // return NextResponse.json({success:true,data:"This is my first Data"})

 //const apiUrl = `http://localhost:1337/api/brands`;
const url = new URL(request.url);

const id = url.searchParams.get('sizeSlug');
const apiUrl = `${process.env.STRAPI_API_URL}/products?populate=*`;
console.log(id)
//console.log("URL",process.env.STRAPI_API_URL)
const res = await fetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,  // <-- yahan token lagao
    "Content-Type": "application/json",
  },
  cache: "no-store",
});

const data = await res.json();
//console.log(data);


   // const data = await response.json();

    return NextResponse.json(data);
 

    }
    catch(err)
    {
return NextResponse.json(
      { error: error },
      { status: 500 }
    );
    }

} 