import Breadcrumbs from "@/app/_components/generals/breadrumbs";
import PopularTires from "@/app/_components/product/popular";
import ProductContent from "@/app/_components/product/productContent";
import ProductImageSlider from "@/app/_components/product/ProductImageSlider";
import React from "react";


interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {  
  const { id } = await params;  // ❗ Correct way (no await)

  return (
    <>
      <section>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-4 px-2 md:px-0">
            <div>
                

                        <Breadcrumbs />

            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* LEFT SIDE IMAGE GALLERY */}
              {/* <div className="w-1/2 bg-gray-100 p-4 rounded">
                Left image slider for product single page
                <br />
                <span className="text-xs text-gray-500">Product ID: {id}</span>
              </div> */}
              <ProductImageSlider id={id} />

              {/* RIGHT SIDE PRODUCT DETAILS */}
             <ProductContent />
            </div>
          </div>
        </div>
      </section>
      <PopularTires />
    </>
  );
}
