import { ChevronRight, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getProductByCategories } from "../lib/product/product";

async function Popular() {
  const motorbikeData = await getProductByCategories("motorbike-tyres");
  const passengerData = await getProductByCategories("truck-tyres");
  //console.log('hello', catData);

  

  return (
    <>
      <section className="pt-1.5 pb-1.5 mt-[550px] md:mt-[350px] text-black text-sm font-normal">
        <div className="max-w-[1200px] flex-col mx-auto md:flex-row justify-between space-x-3">
          <h2 className="text-2xl font-bold mb-4">
            Most Popular Tires
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
            <div>
            { (motorbikeData && motorbikeData.length>0) && (
                 <ProductByCategotry title="Summer tires top 5" data={motorbikeData} />
            ) }
             
            </div>

            <div>
                { (motorbikeData && motorbikeData.length>0) && (
                 <ProductByCategotry title="Summer tires top 5" data={motorbikeData} />
            ) }
            </div>

            <div>
                 { (passengerData && passengerData.length>0) && (
                 <ProductByCategotry title="Summer tires top 5" data={passengerData} />
            ) }
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Popular;

const ProductByCategotry = ({ title, data }) => {
  return (
    <div className="bg-white flex-col p-4 rounded-lg text-sm text-black">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2 items-center">
          <Sun className="text-yellow-400" />
          <h1 className="text-sm text-black font-semibold">
            {title}
          </h1>
        </div>
      </div>

      <ul className="border-l-2 border-[#dddd] pl-3">
        {data && data?.map((tire) => (
          <li key={tire.slug} className="border-t-2 border-[#dddd]">
            <Link
              href={`/product/${tire.slug}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition"
            >
              <span>{tire.name}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
