// PopularTires.tsx
// Modern clean version without React.FC
// Using direct function types (recommended way)

import Image from "next/image";
import Link from "next/link";
import { Sun, Snowflake, CloudSun, ArrowBigRight, ArrowRight } from "lucide-react";

// ---------------------
// Reusable List Item
// ---------------------
interface TireItemProps {
  title: string;
  href: string;
}

// Simple, clean functional component (no React.FC)
const TireItem = ({ title, href }: TireItemProps) => {
  return (
    <Link
      href={href}
      className="flex justify-between items-center py-2 border-b border-gray-200 hover:text-blue-600 transition"
    >
      <span>{title}</span>
      <span><ArrowRight /></span> {/* Simple arrow */}
    </Link>
  );
};

// ---------------------
// Category Card Component
// ---------------------
interface TireCategoryProps {
  icon: React.ReactNode;
  title: string;
  image: string;
  items: { title: string; href: string }[];
  readMore: string;
}

const TireCategory = ({
  icon,
  title,
  image,
  items,
  readMore,
}: TireCategoryProps) => {
  return (
    <div className="w-full md:w-1/3 p-4 border-[#ddd] border-r-2  border-l-2  bg-[white]">

      {/* Heading */}
      <div className="flex items-center gap-2 text-lg font-semibold mb-3">
        {icon}
        {title}
      </div>

      {/* Uncomment if you want the top small image */}
      {/* 
      <div className="mb-4">
        <Image src={image} alt={title} width={120} height={80} />
      </div>
      */}

      {/* List of Tires */}
      <div>
        {items.map((item, index) => (
          <TireItem key={index} title={item.title} href={item.href} />
        ))}
      </div>

      {/* Read more link */}
      <p className="mt-4 text-sm">
        <Link href={readMore} className="text-blue-600 underline">
          Read more here
        </Link>
      </p>
    </div>
  );
};

// ---------------------
// Main Component
// ---------------------
const PopularTires = () => {
  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END;
  return (
    <>
   <section className="">
   <div className="py-10 max-w-[1200px] mx-auto mt-[500px] md:mt-[300px]">
      <h2 className="text-2xl font-bold mb-8 pl-2">Most popular tire models</h2>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Summer Tires */}
        <TireCategory
          icon={<Sun className="text-yellow-500" />}
          title="Summer tires top 5"
          image="/images/summer.png"
          readMore="/summer-tires"
          items={[
            { title: "Pirelli Cinturato P7", href : `${baseUrl}/product/pirelli-cinturato` },
            { title: "Goodyear Efficientgrip Performance", href : `${baseUrl}/product/goodyear` },
            { title: "Michelin Energy Saver", href : `${baseUrl}/product/michelin-energy` },
            { title: "Bridgestone Turanza T005", href : `${baseUrl}/product/bridgestone` },
            { title: "Michelin Primacy 4", href : `${baseUrl}/product/michelin-primacy` },
          ]}
        />

        {/* All-season Tires */}
        <TireCategory
          icon={<CloudSun className="text-orange-500" />}
          title="All-season tires top 5"
          image="/images/allseason.png"
          readMore="/all-season-tires"
          items={[
            { title: "Vredestein Quatrac 5", href : `${baseUrl}/product/vredestein` },
            { title: "Goodyear Vector 4Seasons", href : `${baseUrl}/product/vector4` },
            { title: "Nexen N Blue 4 Season", href : `${baseUrl}/product/nexen-blue` },
            { title: "Nokian Weatherproof", href : `${baseUrl}/product/nokian` },
            { title: "Kleber Quadraxer 2", href : `${baseUrl}/product/kleber` },
          ]}
        />

        {/* Winter Tires */}
        <TireCategory
          icon={<Snowflake className="text-blue-500" />}
          title="Winter tires top 5"
          image="/images/winter.png"
          readMore="/winter-tires"
          items={[
            { title: "Dunlop Winter Sport 5", href : "product/dunlop" },
            { title: "Continental WinterContact TS 860", href : "product/continental" },
            { title: "Michelin Alpin 6", href : "product/alpin6" },
            { title: "Kleber Krisalp HP3", href : "product/krisalp" },
            { title: "Michelin Alpin 5", href : "product/alpin5" },
          ]}
        />

      </div>
    </div>
    </section>

{/* Most popular tire brands */}
       <section className="">
   <div className="py-10 max-w-[1200px] mx-auto mt-[50px]">
      <h2 className="text-2xl font-bold mb-8 pl-2">Most popular tire brands</h2>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Summer Tires */}
        <TireCategory
          icon={<Sun className="text-yellow-500" />}
          title="Summer tires top 5"
          image="/images/summer.png"
          readMore="/summer-tires"
          items={[
            { title: "Pirelli Cinturato P7", href: "product/pirelli-cinturato" },
            { title: "Goodyear Efficientgrip Performance", href: "product//goodyear" },
            { title: "Michelin Energy Saver", href: "product//michelin-energy" },
            { title: "Bridgestone Turanza T005", href: "/bridgestone" },
            { title: "Michelin Primacy 4", href: "product//michelin-primacy" },
          ]}
        />

        {/* All-season Tires */}
        <TireCategory
          icon={<CloudSun className="text-orange-500" />}
          title="All-season tires top 5"
          image="/images/allseason.png"
          readMore="/all-season-tires"
          items={[
            { title: "Vredestein Quatrac 5", href : "product/vredestein" },
            { title: "Goodyear Vector 4Seasons", href : "product/vector4" },
            { title: "Nexen N Blue 4 Season", href : "product/nexen-blue" },
            { title: "Nokian Weatherproof", href : "product/nokian" },
            { title: "Kleber Quadraxer 2", href : "product/kleber" },
          ]}
        />

        {/* Winter Tires */}
        <TireCategory
          icon={<Snowflake className="text-blue-500" />}
          title="Winter tires top 5"
          image="/images/winter.png"
          readMore="/winter-tires"
          items={[
            { title: "Dunlop Winter Sport 5", href : "product/dunlop" },
            { title: "Continental WinterContact TS 860", href : "product/continental" },
            { title: "Michelin Alpin 6", href : "product/alpin6" },
            { title: "Kleber Krisalp HP3", href : "product/krisalp" },
            { title: "Michelin Alpin 5", href : "product/alpin5" },
          ]}
        />

      </div>
    </div>
    </section>
    </>
  );
};

export default PopularTires;
