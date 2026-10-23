'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// ข้อมูลจำลอง 10 เกมให้ตรงกับหน้าเว็บเป๊ะๆ (แปลงให้อยู่ในรูปแบบที่แอดมินใช้)
const initialMockGames = [
  { game_id: 1, game_title: "Dinkum", category: "Simulation", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1062520/header.jpg", platforms: "PC, Switch", developer: "James Bendon", description: "เกมแนวจำลองชีวิตในออสเตรเลีย", is_active: 1 },
  { game_id: 2, game_title: "Stardew Valley", category: "Farming", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg", platforms: "PC, PlayStation, Xbox, Switch, iOS, Android", developer: "ConcernedApe", description: "เกมปลูกผักทำฟาร์มยอดฮิต", is_active: 1 },
  { game_id: 3, game_title: "Townscaper", category: "Building", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1291340/header.jpg", platforms: "PC, PlayStation, Xbox, Switch, iOS, Android", developer: "Oskar Stålberg", description: "เกมสร้างเมืองสีสันสดใส", is_active: 1 },
  { game_id: 4, game_title: "Dorfromantik", category: "Building", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1455840/header.jpg", platforms: "PC, Switch", developer: "Toukana Interactive", description: "เกมต่อแผ่นป้ายสร้างหมู่บ้าน", is_active: 1 },
  { game_id: 5, game_title: "Slime Rancher", category: "Farming", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/433340/header.jpg", platforms: "PC, PlayStation, Xbox, Switch", developer: "Monomi Park", description: "เกมทำฟาร์มสไลม์สุดน่ารัก", is_active: 1 },
  { game_id: 6, game_title: "Terraria", category: "Action-Adventure", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg", platforms: "PC, PlayStation, Xbox, Switch, iOS, Android", developer: "Re-Logic", description: "เกมเอาชีวิตรอดและสำรวจโลก 2D", is_active: 1 },
  { game_id: 7, game_title: "Insaniquarium Deluxe", category: "Simulation", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3320/header.jpg", platforms: "PC", developer: "PopCap Games", description: "เกมเลี้ยงปลาในตำนาน", is_active: 1 },
  { game_id: 8, game_title: "Minecraft Dungeons", category: "Action-Adventure", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/header.jpg", platforms: "PC, PlayStation, Xbox, Switch", developer: "Mojang Studios", description: "เกมลุยดันเจี้ยนสไตล์มายคราฟ", is_active: 1 },
  { game_id: 9, game_title: "Subnautica", category: "Action-Adventure", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/header.jpg", platforms: "PC, PlayStation, Xbox, Switch", developer: "Unknown Worlds", description: "เกมเอาชีวิตรอดใต้ทะเลลึก", is_active: 1 },
  { game_id: 10, game_title: "Jurassic World Evolution 2", category: "Simulation", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1244460/header.jpg", platforms: "PC, PlayStation, Xbox", developer: "Frontier Developments", description: "เกมสร้างและบริหารสวนสนุกไดโนเสาร์", is_active: 1 },
];

export default function AdminGamesPageMock() {
  // ใช้ State เก็บข้อมูลแทน Database เพื่อทำแบบจำลอง
  const [games, setGames] = useState<any[]>(initialMockGames);

  // State ร่วมสำหรับฟอร์ม
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Simulation');
  const [platforms, setPlatforms] = useState('');
  const [developer, setDeveloper] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState('1'); 
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState(''); 

  const platformOptions = ["PC", "PlayStation", "Xbox", "Switch", "iOS", "Android"];

  // ฟังก์ชันล้างฟอร์ม
  const resetForm = () => {
    setEditId(null);
    setTitle('');
    setCategory('Simulation');
    setPlatforms('');
    setDeveloper('');
    setDescription('');
    setIsActive('1');
    setExistingImage('');
    setImagePreview(null);
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // 1. จำลองการดึงข้อมูลมาแก้ไข (กดปุ่มแก้ไข)
  const handleEditClick = (game: any) => {
    setEditId(game.game_id);
    setTitle(game.game_title);
    setCategory(game.category);
    setPlatforms(game.platforms);
    setDeveloper(game.developer || '');
    setDescription(game.description || '');
    setIsActive(String(game.is_active));
    setExistingImage(game.image || '');
    setImagePreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ฟังก์ชันจำลองการอัปโหลดรูปภาพ (ทำเป็น Preview ไว้เฉยๆ)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // ติ๊กเลือกแพลตฟอร์ม
  const handlePlatformChange = (plat: string) => {
    let currentPlats = platforms ? platforms.split(',').map(p => p.trim()).filter(Boolean) : [];
    if (currentPlats.includes(plat)) {
      currentPlats = currentPlats.filter(p => p !== plat);
    } else {
      currentPlats.push(plat);
    }
    setPlatforms(currentPlats.join(', '));
  };

  // 2. จำลองการบันทึกข้อมูล (INSERT / UPDATE) ลงใน React State
  const handleSubmit = (e: React.FormEvent, type: 'INSERT' | 'UPDATE') => {
    e.preventDefault();

    if (!platforms) {
      alert("กรุณาเลือกแพลตฟอร์มอย่างน้อย 1 รายการ");
      return;
    }

    // รูปภาพที่จะใช้เซฟ (ถ้ารูปใหม่มาใช้รูปใหม่ ถ้าไม่มีใช้รูปเดิม)
    const finalImage = imagePreview || existingImage;

    if (type === 'INSERT') {
      // จำลองการเพิ่มข้อมูล
      const newId = games.length > 0 ? Math.max(...games.map(g => g.game_id)) + 1 : 1;
      const newGame = {
        game_id: newId,
        game_title: title,
        category: category,
        platforms: platforms,
        developer: developer,
        description: description,
        image: finalImage,
        is_active: 1
      };
      setGames([newGame, ...games]); // เอาไว้บนสุดของตาราง
      alert('บันทึกข้อมูลจำลองสำเร็จ! (ระบบไม่ได้บันทึกลง Database จริง)');
    } else if (type === 'UPDATE' && editId) {
      // จำลองการแก้ไขข้อมูล
      const updatedGames = games.map(g => {
        if (g.game_id === editId) {
          return {
            ...g,
            game_title: title,
            category: category,
            platforms: platforms,
            developer: developer,
            description: description,
            image: finalImage,
            is_active: parseInt(isActive)
          };
        }
        return g;
      });
      setGames(updatedGames);
      alert('อัปเดตข้อมูลจำลองสำเร็จ! (ระบบไม่ได้บันทึกลง Database จริง)');
    }
    resetForm();
  };

  // 3. จำลองการลบข้อมูล (DELETE)
  const handleDelete = (id: number) => {
    if (!confirm('ยืนยันการลบข้อมูลเกมนี้ (จำลอง)?')) return;
    
    // ตัดข้อมูลออกจาก Array
    const filteredGames = games.filter(g => g.game_id !== id);
    setGames(filteredGames);
    alert('ลบข้อมูลจำลองสำเร็จแล้ว!');
  };

  const renderFormFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">ชื่อเกม *</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full border border-gray-300 rounded p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">หมวดหมู่ *</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full border border-gray-300 rounded p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
          <option value="Simulation">Simulation</option>
          <option value="Farming">Farming</option>
          <option value="Building">Building</option>
          <option value="Action-Adventure">Action-Adventure</option>
        </select>
      </div>
      
      <div className="md:col-span-2 border border-gray-300 rounded-md p-3 bg-white">
        <label className="block text-sm font-bold text-gray-700 mb-2">แพลตฟอร์ม * (เลือกได้มากกว่า 1)</label>
        <div className="flex flex-wrap gap-4">
          {platformOptions.map((plat) => {
            const isChecked = platforms.split(',').map(p => p.trim()).includes(plat);
            return (
              <label key={plat} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  onChange={() => handlePlatformChange(plat)}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">{plat}</span>
              </label>
            );
          })}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">ผู้พัฒนา (Developer)</label>
        <input type="text" value={developer} onChange={(e) => setDeveloper(e.target.value)} className="mt-1 w-full border border-gray-300 rounded p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">อัปโหลดรูปภาพ (JPG/PNG)</label>
        <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 w-full border border-gray-300 rounded p-1.5 text-sm bg-white" />
      </div>
      
      {(imagePreview || existingImage) && (
        <div className="md:col-span-2">
          <p className="text-xs text-gray-500 mb-1">ภาพพรีวิว:</p>
          <img src={imagePreview || existingImage} alt="Preview" className="h-24 w-auto object-contain border rounded shadow-sm" />
        </div>
      )}

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">คำอธิบาย</label>
        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full border border-gray-300 rounded p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-2xl font-bold text-amber-600">จัดการข้อมูลเกม (Mock System)</h1>
        <Link href="/final01" className="text-indigo-600 hover:underline text-sm font-semibold">&larr; กลับหน้าหลัก</Link>
      </div>
      
      <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-3 rounded text-sm font-bold">
        ระบบนี้เป็นโหมด "จำลอง (Mock)" การเพิ่ม/แก้ไข/ลบ ข้อมูลจะเปลี่ยนแค่บนหน้าจอเท่านั้น ไม่กระทบกับ Database จริง เหมาะสำหรับทดสอบและเก็บภาพรายงาน
      </div>

      {/* 6.1 ฟอร์มเพิ่มข้อมูลใหม่ (INSERT) */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">6.1 ฟอร์มเพิ่มข้อมูลเกมใหม่ (Input Form - ฝั่ง Admin)</h2>
        {!editId ? (
          <form onSubmit={(e) => handleSubmit(e, 'INSERT')}>
            {renderFormFields()}
            <div className="mt-4">
              <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded font-bold shadow hover:bg-green-700 transition">
                + บันทึกเกมลงระบบ (INSERT)
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded">
            กำลังอยู่ในโหมดแก้ไขข้อมูล กรุณายกเลิกเพื่อเพิ่มข้อมูลใหม่
          </div>
        )}
      </div>

      {/* 6.2 ฟอร์มแก้ไขข้อมูลและสถานะ (UPDATE) */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">6.2 ฟอร์มแก้ไขข้อมูลเกมและจัดการสถานะ (Update Form - ฝั่ง Admin)</h2>
        {editId ? (
          <form onSubmit={(e) => handleSubmit(e, 'UPDATE')}>
            {renderFormFields()}
            
            <div className="mt-4 p-3 bg-gray-50 border rounded-md">
              <label className="block text-sm font-bold text-gray-800 mb-2">สถานะการแสดงผลบนหน้าเว็บ:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="radio" value="1" checked={isActive === '1'} onChange={(e) => setIsActive(e.target.value)} className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-green-700 font-semibold">เปิดแสดงผล (is_active = 1)</span>
                </label>
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="radio" value="0" checked={isActive === '0'} onChange={(e) => setIsActive(e.target.value)} className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-red-600 font-semibold">ซ่อนเกม (is_active = 0)</span>
                </label>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button type="submit" className="bg-teal-700 text-white px-5 py-2 rounded font-bold shadow hover:bg-teal-800 transition">
                อัปเดตข้อมูล (UPDATE)
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-5 py-2 rounded font-bold hover:bg-gray-300 transition">
                ยกเลิก
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded">
            กรุณากดปุ่ม <b>"แก้ไข"</b> จากตารางด้านล่าง เพื่อนำข้อมูลมาจัดการในส่วนนี้
          </div>
        )}
      </div>

      {/* 6.3 การลบข้อมูลและตารางแสดงผล (DELETE) */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">6.3 การลบข้อมูลและตารางแสดงผล (Delete Action / View)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 border">
            <thead className="bg-gray-100 uppercase font-bold text-xs">
              <tr>
                <th className="p-3 border text-center">ID</th>
                <th className="p-3 border text-center">รูปภาพ</th>
                <th className="p-3 border text-center">ชื่อเกม</th>
                <th className="p-3 border text-center">หมวดหมู่</th>
                <th className="p-3 border text-center">สถานะ</th>
                <th className="p-3 border text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {games.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400 font-semibold">
                    ไม่มีข้อมูลเกมในระบบ
                  </td>
                </tr>
              ) : (
                games.map((g) => (
                  <tr key={g.game_id} className="hover:bg-gray-50 border-b">
                    <td className="p-3 border text-center font-bold">{g.game_id}</td>
                    <td className="p-3 border text-center">
                      {g.image ? <img src={g.image} className="w-10 h-10 object-cover mx-auto rounded" alt="" /> : '-'}
                    </td>
                    <td className="p-3 border font-semibold">{g.game_title}</td>
                    <td className="p-3 border text-center">{g.category}</td>
                    <td className="p-3 border text-center">
                      {g.is_active ? (
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-bold">แสดงผล</span>
                      ) : (
                        <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-bold">ซ่อน</span>
                      )}
                    </td>
                    <td className="p-3 border text-center space-x-2">
                      <button onClick={() => handleEditClick(g)} className="bg-amber-500 text-white px-3 py-1.5 rounded text-xs font-bold shadow hover:bg-amber-600">
                        แก้ไข (UPDATE)
                      </button>
                      <button onClick={() => handleDelete(g.game_id)} className="bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold shadow hover:bg-red-800">
                        ลบข้อมูล (DELETE)
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}