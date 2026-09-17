"use client";

import { useState } from "react";
import Link from "next/link";

export default function ShopList({ data }) {

  // alert(data);

  const [keyword, setKeyword] = useState("");

  const filterShops = data.filter(
    (item) => {
      const searchText = keyword.toLowerCase();
      return item.shopName.toLowerCase().includes(searchText)
    }
  );

  return (
    <div className="max-w-3xl ma-auto p-6">

      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="Search shop..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="mb-4 text-gray-600">
        Found {data.length} shop(s)
      </div>

      <div className="space-y-4">

        {
          filterShops.map(shop => (
            <div key={shop.shopId} className="border rounded-lg p-4">
              <h2 className="font-semibold">
                {shop.shopName}
              </h2>
              Open Status:{" "}
              <span className={shop.shopStatus ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                {shop.shopStatus ? "true" : "false"}
              </span>
              <Link
                href={`/week07/${shop.shopId}`}
                className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Detail
              </Link>
            </div>
          ))
        }

      </div>
    </div>
  );
}