import React from "react";
import Breadcrumbs from "@/app/_components/generals/breadrumbs";
import {
  getProductBySlug,
} from "@/app/_components/lib/product/product";
import PopularTires from "@/app/_components/product/popular";
import ProductContent from "@/app/_components/product/productContent";
import ProductImageSlider from "@/app/_components/product/ProductImageSlider";

export default async function Page(props) {
  const { id } = await props.params;

  if (!id) {
   // console.log("No product ID provided");
  }

  const data = await getProductBySlug(id);
  //console.log("single image data",data)

  return (
    <>
      <section>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-4 px-2 md:px-0">
            <div>
             <Breadcrumbs />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {data && (
                <>
                  <ProductImageSlider data={data} />
                  <ProductContent data={data} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <PopularTires />
    </>
  );
}
