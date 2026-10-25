'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import ReviewList from '../../components/ReviewList';

export default function GameDetailPage() {
  const params = useParams();
  const { id } = params;
  
  const [game, setGame] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ดึงข้อมูลจริงจาก Database
    const fetchGameData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/admin/games');
        const data = await res.json();
        
        if (data.success && data.data) {
          const foundGame = data.data.find((g: any) => String(g.game_id) === String(id));
          setGame(foundGame);
        }
      } catch (error) {
        console.error("Error fetching game details", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchGameData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl font-bold text-gray-500">กำลังโหลดข้อมูลเกม...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <main className="p-8 max-w-5xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-red-600 mb-4">ไม่พบข้อมูลเกมนี้ในระบบ</h1>
          <Link href="/final01" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold transition">
            &larr; กลับหน้าหลัก
          </Link>
        </main>
      </div>
    );
  }

  // แยกแพลตฟอร์มเป็น Array เพื่อวนลูปโชว์ปุ่ม
  let platformArray = [];
  try {
    platformArray = typeof game.platforms === 'string' ? game.platforms.split(',').map((p: string) => p.trim()) : game.platforms;
  } catch (e) {
    platformArray = [];
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="p-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/final01" className="text-indigo-600 hover:underline font-medium">
            &larr; ย้อนกลับไปหน้าหลัก
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">

            <div className="md:w-5/12">
              <div className="bg-gray-200 aspect-video w-full rounded-lg flex items-center justify-center overflow-hidden border shadow-sm">
                {game?.image ? (
                  <img src={game.image} alt={game.game_title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-sm">[ รอใส่ภาพหน้าปกเกม ]</span>
                )}
              </div>
            </div>

            <div className="md:w-7/12 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {game.game_title}
                </h1>

                <div className="mb-5 space-y-1">
                  <p className="text-indigo-600 font-semibold">
                    หมวดหมู่: {game.category || "รอระบุหมวดหมู่"}
                  </p>
                  <p className="text-gray-500 text-sm font-medium">
                    ผู้พัฒนา: <span className="text-gray-800">{game.developer || "รอระบุผู้พัฒนา"}</span>
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase">แพลตฟอร์มที่รองรับ:</h3>
                  <div className="flex flex-wrap gap-2">
                    {platformArray && platformArray.length > 0 ? (
                      platformArray.map((platform: string, index: number) => {
                        let bgColor = "bg-gray-500";
                        if (platform.toLowerCase().includes("pc")) bgColor = "bg-gray-800";
                        else if (platform.toLowerCase().includes("playstation")) bgColor = "bg-blue-600";
                        else if (platform.toLowerCase().includes("android")) bgColor = "bg-green-500";
                        else if (platform.toLowerCase().includes("ios")) bgColor = "bg-blue-400";
                        else if (platform.toLowerCase().includes("xbox")) bgColor = "bg-green-600";
                        else if (platform.toLowerCase().includes("switch")) bgColor = "bg-red-500";

                        return (
                          <span key={index} className={`px-3 py-1 text-white rounded-md text-xs font-semibold ${bgColor}`}>
                            {platform}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-gray-400 text-sm">รอระบุแพลตฟอร์ม</span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-700 mb-2 mt-2">จุดเด่นและรายละเอียด:</h3>
                <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">
                  {game.description || "[ รอใส่ข้อความรายละเอียดเกม... ]"}
                </p>
              </div>

              <div>
                {/* ลิงก์ดาวน์โหลด */}
                {game?.download_url && game.download_url !== "#" ? (
                  <a
                    href={game.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition shadow-md"
                  >
                    ดาวน์โหลด / ไปยังหน้าร้านค้า ↗
                  </a>
                ) : (
                  <button disabled className="px-6 py-2.5 bg-gray-300 text-gray-500 font-medium text-sm rounded-lg cursor-not-allowed">
                    ยังไม่มีลิงก์ดาวน์โหลด
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        <ReviewList />
      </main>
    </div>
  );
}