'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import ReviewList from '../../components/ReviewList';

export default function GameDetailPage() {
  const params = useParams();
  const gameId = Number(params?.id);

  // เพิ่มข้อมูล developer (ผู้พัฒนา/ค่ายเกม) ให้ครบทั้ง 10 เกม
  const gamesDetailData = [
    {
      id: 1,
      title: "Dinkum",
      developer: "James Bendon",
      category: "Simulation",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1062520/header.jpg",
      platforms: ["PC"],
      downloadUrl: "https://store.steampowered.com/app/1062520/Dinkum/",
      description: "เกมจำลองการใช้ชีวิตสไตล์เอาชีวิตรอดและพัฒนาชุมชนบนเกาะจำลองบรรยากาศชนบทของออสเตรเลีย ทำฟาร์ม จับแมลง ตกปลา และสร้างเมืองร่วมกับเพื่อนๆ"
    },
    {
      id: 2,
      title: "Stardew Valley",
      developer: "ConcernedApe",
      category: "Farming",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg",
      platforms: ["PC", "PlayStation", "Xbox", "Switch", "iOS", "Android"],
      downloadUrl: "https://store.steampowered.com/app/413150/Stardew_Valley/",
      description: "เกมทำฟาร์ม ปลูกผัก เลี้ยงสัตว์ ใช้ชีวิตสโลว์ไลฟ์ในหุบเขาอันเงียบสงบ พร้อมระบบสานสัมพันธ์กับชาวเมือง"
    },
    {
      id: 3,
      title: "Townscaper",
      developer: "Oskar Stålberg",
      category: "Building",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1291340/header.jpg",
      platforms: ["PC", "PlayStation", "Xbox", "Switch", "iOS", "Android"],
      downloadUrl: "https://store.steampowered.com/app/1291340/Townscaper/",
      description: "เกมสร้างเมืองบนผืนน้ำที่ไร้เป้าหมายและไม่มีบทลงโทษ เพียงคลิกเมาส์บล็อกตึก บ้าน และสะพานจะประกอบขึ้นมาโดยอัตโนมัติ เหมาะแก่การผ่อนคลายสมองอย่างแท้จริง"
    },
    {
      id: 4,
      title: "Dorfromantik",
      developer: "Toukana Interactive",
      category: "Building",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1455840/header.jpg",
      platforms: ["PC", "Switch"],
      downloadUrl: "https://store.steampowered.com/app/1455840/Dorfromantik/",
      description: "เกมต่อไพ่หกเหลี่ยมสร้างภูมิประเทศอันเงียบสงบ ทั้งป่าไม้ แม่น้ำ หมู่บ้าน และรางรถไฟ ผสานดนตรีประกอบฟังสบายที่ช่วยให้คลายเครียด"
    },
    {
      id: 5,
      title: "Slime Rancher",
      developer: "Monomi Park",
      category: "Farming",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/433340/header.jpg",
      platforms: ["PC", "PlayStation", "Xbox", "Switch"],
      downloadUrl: "https://store.steampowered.com/app/433340/Slime_Rancher/",
      description: "เกมทำฟาร์มสำรวจโลกมุมมองบุคคลที่หนึ่ง เลี้ยงดูและเพาะพันธุ์สไลม์หลากสีสันสุดน่ารัก สะสมผลผลิตเพื่อนำมาอัปเกรดฟาร์มและอุปกรณ์สำรวจ"
    },
    {
      id: 6,
      title: "Terraria",
      developer: "Re-Logic",
      category: "Action-Adventure",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg",
      platforms: ["PC", "PlayStation", "Xbox", "Switch", "iOS", "Android"],
      downloadUrl: "https://store.steampowered.com/app/105600/Terraria/",
      description: "เกม Sandbox 2D สไตล์ Action-Adventure ที่ให้ผู้เล่นออกสำรวจโลก ขุดค้นทรัพยากร คราฟต์ไอเทม สร้างฐาน และต่อสู้กับมอนสเตอร์"
    },
    {
      id: 7,
      title: "Insaniquarium Deluxe",
      developer: "PopCap Games, Inc.",
      category: "Simulation",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3320/header.jpg",
      platforms: ["PC"],
      downloadUrl: "https://store.steampowered.com/app/3320/Insaniquarium_Deluxe/",
      description: "เกมเลี้ยงปลาสุดคลาสสิก ให้อาหาร เก็บเหรียญ และปกป้องตู้ปลาจากเอเลี่ยนที่คอยมารุกราน"
    },
    {
      id: 8,
      title: "Minecraft Dungeons",
      developer: "Mojang Studios",
      category: "Action-Adventure",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/header.jpg",
      platforms: ["PC", "PlayStation", "Xbox", "Switch"],
      downloadUrl: "https://store.steampowered.com/app/1672970/Minecraft_Dungeons/",
      description: "เกมตะลุยดันเจี้ยนในโลก Minecraft ผจญภัยไปกับเพื่อนเพื่อต่อสู้กับเหล่ามอนสเตอร์และหาไอเทมสุดแกร่ง"
    },
    {
      id: 9,
      title: "Subnautica",
      developer: "Unknown Worlds Entertainment",
      category: "Action-Adventure",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/header.jpg",
      platforms: ["PC", "PlayStation", "Xbox", "Switch"],
      downloadUrl: "https://store.steampowered.com/app/264710/Subnautica/",
      description: "เกมผจญภัยเอาชีวิตรอดใต้ท้องทะเลลึกในต่างดาว สำรวจแนวปะการัง สร้างฐานใต้ทะเล และเผชิญหน้ากับสิ่งมีชีวิตลึกลับ"
    },
    {
      id: 10,
      title: "Jurassic World Evolution 2",
      developer: "Frontier Developments",
      category: "Simulation",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1244460/header.jpg",
      platforms: ["PC", "PlayStation", "Xbox"],
      downloadUrl: "https://store.steampowered.com/app/1244460/Jurassic_World_Evolution_2/",
      description: "เกมจำลองการสร้างและบริหารสวนสนุกไดโนเสาร์ระดับโลก ดูแลไดโนเสาร์หลากหลายสายพันธุ์ และรับมือกับปัญหาที่คาดไม่ถึง"
    },
  ];

  const currentGame = gamesDetailData.find((game) => game.id === gameId);

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
                {currentGame?.image ? (
                  <img src={currentGame.image} alt={currentGame.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-sm">[ รอใส่ภาพหน้าปกเกม ]</span>
                )}
              </div>
            </div>

            <div className="md:w-7/12 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentGame ? currentGame.title : `เกมอันดับที่ ${gameId}`}
                </h1>

                {/* ส่วนที่เพิ่มใหม่: โชว์หมวดหมู่ และ ผู้พัฒนา */}
                <div className="mb-5 space-y-1">
                  <p className="text-indigo-600 font-semibold">
                    หมวดหมู่: {currentGame ? currentGame.category : "รอระบุหมวดหมู่"}
                  </p>
                  <p className="text-gray-500 text-sm font-medium">
                    ผู้พัฒนา: <span className="text-gray-800">{currentGame?.developer || "รอระบุผู้พัฒนา"}</span>
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase">แพลตฟอร์มที่รองรับ:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentGame?.platforms && currentGame.platforms.length > 0 ? (
                      currentGame.platforms.map((platform, index) => {
                        let bgColor = "bg-gray-500";
                        if (platform.includes("PC")) bgColor = "bg-gray-800";
                        else if (platform.includes("PlayStation")) bgColor = "bg-blue-600";
                        else if (platform.includes("PlayStore") || platform.includes("Android")) bgColor = "bg-green-500";
                        else if (platform.includes("AppStore") || platform.includes("iOS")) bgColor = "bg-blue-400";
                        else if (platform.includes("Xbox")) bgColor = "bg-green-600";
                        else if (platform.includes("Switch")) bgColor = "bg-red-500";

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
                <p className="text-gray-600 leading-relaxed mb-6">
                  {currentGame ? currentGame.description : "[ รอใส่ข้อความรายละเอียดเกม... ]"}
                </p>
              </div>

              <div>
                {currentGame?.downloadUrl && currentGame.downloadUrl !== "#" ? (
                  <a
                    href={currentGame.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition"
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