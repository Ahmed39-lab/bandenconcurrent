import { ChevronRight, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getProductByCategories } from "../lib/product/product";

async function Popular() {
  const motorbikeData = await getProductByCategories("motorbike-tyres");
  const passengerData = await getProductByCategories("truck-tyres");

  return (
    <section className="pt-1.5 pb-1.5 mt-[550px] md:mt-[350px] bg-black mb-20 text-white text-sm font-normal">
      <div className="max-w-[1200px] flex-col mx-auto md:flex-row justify-between space-x-3">
        <h2 className="text-3xl font-bold mb-4 text-[#fded5b]">
          Most Popular Tires
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
          <div>
            {motorbikeData && motorbikeData.length > 0 && (
              <ProductByCategotry title="Summer tires top 5" data={motorbikeData} />
            )}
          </div>

          <div>
            {motorbikeData && motorbikeData.length > 0 && (
              <ProductByCategotry title="Summer tires top 5" data={motorbikeData} />
            )}
          </div>

          <div>
            {motorbikeData && motorbikeData.length > 0 && (
              <ProductByCategotry title="Summer tires top 5" data={motorbikeData} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Popular;

const ProductByCategotry = ({ title, data }) => {
  return (
    <div
      className="bg-black flex-col p-5 rounded-lg text-sm text-white shadow-lg"
      style={{ border: "1px solid #fded5b" }} // only thin outer border
    >
      {/* Title with custom yellow icon */}
      <div className="flex gap-2 items-center mb-4">
        <Sun className="w-5 h-5" style={{ color: "#fded5b" }} />
        <h1 className="text-sm font-semibold" style={{ color: "#fded5b" }}>
          {title}
        </h1>
      </div>

      {/* List of tires */}
      <ul className="pl-2">
        {data?.map((tire, index) => (
          <li key={tire.slug}>
            <Link
              href={`/product/${tire.slug}`}
              className={`flex items-center justify-between p-3 rounded-lg hover:bg-[#fded5b]/10 transition`}
            >
              <span className="text-white">{tire.name}</span>
              <ChevronRight className="w-5 h-5" style={{ color: "#fded5b" }} />
            </Link>
            {/* Add a subtle divider only between items, not top border everywhere */}
            {index < data.length - 1 && (
              <div className="border-t border-yellow-600/30 mx-3"></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};