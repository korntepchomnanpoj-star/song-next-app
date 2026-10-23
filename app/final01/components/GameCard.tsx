import React from 'react';
import Link from 'next/link';

type GameCardProps = {
  id: number;
  title: string;
  category: string;
  image: string;
  platforms: string[];
};

export default function GameCard({ id, title, category, image, platforms }: GameCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">

      <div className="bg-gray-200 aspect-video w-full flex items-center justify-center border-b overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm font-medium">[ รอใส่รูปภาพ ]</span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

        <p className="text-sm text-gray-500 mb-2">
          หมวดหมู่: <span className="text-indigo-600 font-medium">{category}</span>
        </p>

        <div className="mb-4">
          <span className="text-sm text-gray-500 block mb-1">แพลตฟอร์ม:</span>
          <div className="flex flex-wrap gap-1">
            {platforms && platforms.length > 0 ? (
              platforms.map((p, index) => {
                let bgColor = "bg-gray-500";
                if (p.includes("PC")) bgColor = "bg-gray-800";
                else if (p.includes("PlayStation")) bgColor = "bg-blue-600";
                else if (p.includes("PlayStore") || p.includes("Android")) bgColor = "bg-green-500";
                else if (p.includes("AppStore") || p.includes("iOS")) bgColor = "bg-blue-400";
                else if (p.includes("Xbox")) bgColor = "bg-green-600";
                else if (p.includes("Switch")) bgColor = "bg-red-500";

                return (
                  <span key={index} className={`px-2 py-0.5 text-white text-[10px] rounded font-medium ${bgColor}`}>
                    {p}
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400 text-xs">รอระบุ</span>
            )}
          </div>
        </div>

        <Link href={`/final01/game/${id}`} className="mt-auto">
          <button className="w-full py-2 bg-green-500 text-white text-sm font-semibold rounded hover:bg-green-600 transition">
            ดูรายละเอียด
          </button>
        </Link>
      </div>

    </div>
  );
}