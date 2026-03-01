import React from "react";
import Link from "next/link";

export default function SimpleTireForm() {
  return (
    <div className="pt-6 pb-6 rounded-md max-w-md mx-auto space-y-5">

      <h2 className="text-xl font-semibold">
        <span className="bg-blue-600 text-white px-2 py-1 mr-1">
          Find
        </span>
        your suitable car tire
      </h2>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Season
        </label>
        <select className="w-full rounded p-2 bg-white border-none">
          <option>Summer tires</option>
          <option>Winter tires</option>
          <option>All season tires</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {["Width", "Height", "Inch"].map((label, i) => (
          <div key={i}>
            <label className="block text-sm font-semibold mb-1">
              {label}
            </label>
            <select className="w-full rounded p-2 bg-white border-none">
              <option>205</option>
              <option>215</option>
              <option>225</option>
            </select>
          </div>
        ))}
      </div>

      <hr className="border-dashed border-gray-500" />

      <div>
        <p className="font-semibold mb-2">
          Where should we deliver your tires?
        </p>

        <label className="flex items-center gap-2 p-2 rounded mb-2 bg-white">
          <input type="radio" name="delivery" defaultChecked />
          <span>Deliver to my home or garage</span>
        </label>

        <label className="flex items-center gap-2 p-2 rounded bg-white relative">
          <input type="radio" name="delivery" />
          <span>Deliver to an installation partner</span>
          <span className="absolute right-2 top-2 text-xs bg-black text-white px-2 py-0.5 rounded">
            Most chosen
          </span>
        </label>
      </div>

      <ul className="text-sm space-y-1">
        <li>✔ Customer rating 9.5</li>
        <li>✔ Fast delivery</li>
        <li>✔ Installation always close by</li>
      </ul>

      <Link href={`${process.env.NEXT_PUBLIC_FRONT_END}/sizes/14-14-15?type=SUV`}>
        <button className="w-full bg-green-600 text-white p-3 rounded">
          To search
        </button>
      </Link>

    </div>
  );
}