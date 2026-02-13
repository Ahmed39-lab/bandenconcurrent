import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { service_name, description } = body;

    const res = await fetch(
      "http://localhost:1337/api/services",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            service_name,
            description,
          },
        }),
      }
    );

    const data = await res.json();

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
