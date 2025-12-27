//const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
export async function getProductsBySize(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
  const res = await fetch(
    `${baseUrl}/api/product/size/?slug=${slug}`,
    {
      cache: "no-store",
      // next: { revalidate: 0 } // alternative
    }
  );
  return res.json();
}
