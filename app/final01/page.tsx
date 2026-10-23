'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';

export default function HomePage() {
  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // เพิ่ม State สำหรับเก็บค่าตัวกรอง
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedPlatform, setSelectedPlatform] = useState('ทั้งหมด');

  const categories = ['ทั้งหมด', 'Simulation', 'Farming', 'Building', 'Action-Adventure'];
  const platforms = ['ทั้งหมด', 'PC', 'PlayStation', 'Xbox', 'Switch', 'iOS', 'Android'];

  useEffect(() => {
    fetch('/api/games?t=' + new Date().getTime(), { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setGames(data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // ฟังก์ชันกรองเกมตามหมวดหมู่และแพลตฟอร์มที่เลือก
  const filteredGames = games.filter((game: any) => {
    // 1. เช็คหมวดหมู่
    const matchCategory = selectedCategory === 'ทั้งหมด' || game.category === selectedCategory;

    // 2. เช็คแพลตฟอร์ม
    let platformList = [];
    try {
      platformList = typeof game.platforms === 'string' ? JSON.parse(game.platforms) : game.platforms;
    } catch (e) {
      platformList = [game.platforms];
    }
    const matchPlatform = selectedPlatform === 'ทั้งหมด' || (platformList && platformList.includes(selectedPlatform));

    return matchCategory && matchPlatform;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">10 อันดับเกมเล่นสบายๆ ผ่อนคลายสมอง</h1>

        {/* ส่วนปุ่มกดกรองเกม */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-gray-700 mr-2 text-sm">หมวดหมู่:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-gray-700 mr-2 text-sm">แพลตฟอร์ม:</span>
            {platforms.map(plat => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedPlatform === plat ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500 mt-10">กำลังอัปเดตการจัดอันดับ...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredGames.length > 0 ? filteredGames.map((game: any) => {
              let platformList = [];
              try {
                platformList = typeof game.platforms === 'string' ? JSON.parse(game.platforms) : game.platforms;
              } catch (e) {
                platformList = [game.platforms];
              }

              return (
                <div key={game.id} className="bg-white rounded-xl shadow-sm border p-4 flex flex-col h-full hover:shadow-md transition-shadow">
                  <img src={game.image} alt={game.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-gray-800">{game.title}</h3>
                    <p className="text-sm text-indigo-600 mb-2">หมวดหมู่: {game.category}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {platformList && platformList.map((plat: string, idx: number) => {
                        let bgColor = "bg-gray-500";
                        if (plat.includes("PC")) bgColor = "bg-gray-800";
                        else if (plat.includes("PlayStation")) bgColor = "bg-blue-600";
                        else if (plat.includes("Xbox")) bgColor = "bg-green-600";
                        else if (plat.includes("Switch")) bgColor = "bg-red-500";
                        else if (plat.includes("iOS")) bgColor = "bg-blue-400";
                        else if (plat.includes("Android")) bgColor = "bg-green-500";
                        return <span key={idx} className={`text-white text-[10px] px-2 py-1 rounded font-bold ${bgColor}`}>{plat}</span>;
                      })}
                    </div>

                    <div className="bg-gray-100 rounded p-2 mb-4 text-center">
                      <p className="text-sm font-bold text-yellow-500">★ {Number(game.average_rating).toFixed(1)}</p>
                      <p className="text-xs text-gray-500">({game.review_count} รีวิว)</p>
                    </div>
                  </div>

                  <Link href={`/final01/game/${game.id}`} className="w-full text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-medium mt-auto">
                    ดูรายละเอียด
                  </Link>
                </div>
              );
            }) : (
              <p className="text-center text-gray-500 col-span-full py-10">ไม่พบเกมที่ตรงกับตัวกรองของคุณ</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}