import Breadcrumbs from "@/app/_components/generals/breadrumbs";
import PopularTires from "@/app/_components/product/popular";
import ProductContent from "@/app/_components/product/productContent";
import ProductImageSlider from "@/app/_components/product/ProductImageSlider";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const { id } = await props.params;

  return (
    <>
      <section>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-4 px-2 md:px-0">
            <div>
              <Breadcrumbs />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <ProductImageSlider id={id} />
              <ProductContent />
            </div>
          </div>
        </div>
      </section>
      <PopularTires />
    </>
  );
}
