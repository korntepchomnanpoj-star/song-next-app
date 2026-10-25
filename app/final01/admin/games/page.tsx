'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminGamesPageReal() {
  const [games, setGames] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Simulation');
  const [platforms, setPlatforms] = useState('');
  const [developer, setDeveloper] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(''); // เพิ่ม State สำหรับลิงก์ดาวน์โหลด
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState('1'); 
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const platformOptions = ["PC", "PlayStation", "Xbox", "Switch", "iOS", "Android"];

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/games');
      const data = await res.json();
      if (data.success) {
        setGames(data.data || []);
      } else {
        setGames([]);
      }
    } catch (error) {
      console.error("Fetch error");
      setGames([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const resetForm = () => {
    setEditId(null); setTitle(''); setCategory('Simulation'); setPlatforms('');
    setDeveloper(''); setDownloadUrl(''); setDescription(''); setIsActive('1'); setExistingImage(''); setImagePreview(null);
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleEditClick = (game: any) => {
    setEditId(game.game_id); setTitle(game.game_title); setCategory(game.category); setPlatforms(game.platforms);
    setDeveloper(game.developer || ''); setDownloadUrl(game.download_url || ''); setDescription(game.description || ''); setIsActive(String(game.is_active));
    setExistingImage(game.image || ''); setImagePreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  const handlePlatformChange = (plat: string) => {
    let currentPlats = platforms ? platforms.split(',').map(p => p.trim()).filter(Boolean) : [];
    if (currentPlats.includes(plat)) currentPlats = currentPlats.filter(p => p !== plat);
    else currentPlats.push(plat);
    setPlatforms(currentPlats.join(', '));
  };

  const handleSubmit = async (e: React.FormEvent, type: 'INSERT' | 'UPDATE') => {
    e.preventDefault();
    if (!platforms) return alert("กรุณาเลือกแพลตฟอร์ม");

    setIsSubmitting(true);
    const finalImage = imagePreview || existingImage;
    const payload = {
      id: editId, title, category, platforms, developer, downloadUrl, description, image: finalImage, is_active: parseInt(isActive)
    };

    try {
      const res = await fetch('/api/admin/games', {
        method: type === 'INSERT' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(`${type === 'INSERT' ? 'บันทึกข้อมูล' : 'อัปเดตข้อมูล'} ลงฐานข้อมูล XAMPP สำเร็จ!`);
        fetchGames();
        resetForm();
      } else {
        alert('เกิดข้อผิดพลาดจากฐานข้อมูล (ลองเช็กชื่อ Database ใน phpMyAdmin)');
      }
    } catch (error) {
      alert('เชื่อมต่อ XAMPP ไม่สำเร็จ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('ยืนยันการลบข้อมูลเกมนี้จากฐานข้อมูลจริง?')) return;
    try {
      const res = await fetch(`/api/admin/games?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('ลบข้อมูลออกจาก XAMPP สำเร็จ!');
        fetchGames();
      } else {
        alert('ลบข้อมูลไม่สำเร็จ');
      }
    } catch (error) {
      alert('เชื่อมต่อ XAMPP ไม่สำเร็จ');
    }
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
                <input type="checkbox" checked={isChecked} onChange={() => handlePlatformChange(plat)} className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" />
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
        <label className="block text-sm font-medium text-gray-700">ลิงก์ดาวน์โหลด (URL)</label>
        <input type="url" placeholder="https://store.steampowered.com/..." value={downloadUrl} onChange={(e) => setDownloadUrl(e.target.value)} className="mt-1 w-full border border-gray-300 rounded p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div className="md:col-span-2">
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
        <h1 className="text-2xl font-bold text-green-700">จัดการข้อมูลเกม</h1>
        <Link href="/final01" className="text-indigo-600 hover:underline text-sm font-semibold">&larr; กลับหน้าหลัก</Link>
      </div>
      
      <div className="border-2 border-solid border-green-500 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">6.1 ฟอร์มเพิ่มข้อมูลเกมใหม่ (INSERT)</h2>
        {!editId ? (
          <form onSubmit={(e) => handleSubmit(e, 'INSERT')}>
            {renderFormFields()}
            <div className="mt-4">
              <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white px-5 py-2 rounded font-bold shadow hover:bg-green-700 transition disabled:opacity-50">
                {isSubmitting ? 'กำลังบันทึก...' : '+ บันทึกเกมลงระบบ'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded font-bold">
            ระบบอยู่ในโหมดแก้ไข กรุณากดยกเลิกด้านล่างเพื่อเพิ่มข้อมูลใหม่
          </div>
        )}
      </div>

      <div className="border-2 border-solid border-amber-500 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">6.2 ฟอร์มแก้ไขข้อมูลเกม (UPDATE)</h2>
        {editId ? (
          <form onSubmit={(e) => handleSubmit(e, 'UPDATE')}>
            {renderFormFields()}
            <div className="mt-4 p-3 bg-gray-50 border rounded-md">
              <label className="block text-sm font-bold text-gray-800 mb-2">สถานะการแสดงผล:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="radio" value="1" checked={isActive === '1'} onChange={(e) => setIsActive(e.target.value)} className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-green-700 font-semibold">เปิดแสดงผล</span>
                </label>
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="radio" value="0" checked={isActive === '0'} onChange={(e) => setIsActive(e.target.value)} className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-red-600 font-semibold">ซ่อนเกม</span>
                </label>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button type="submit" disabled={isSubmitting} className="bg-amber-500 text-white px-5 py-2 rounded font-bold shadow hover:bg-amber-600 transition disabled:opacity-50">
                {isSubmitting ? 'กำลังอัปเดต...' : 'อัปเดตข้อมูล'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-5 py-2 rounded font-bold hover:bg-gray-300 transition">
                ยกเลิก
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded">
            กรุณากดปุ่ม <b>"แก้ไข"</b> จากตารางด้านล่าง เพื่อนำข้อมูลมาจัดการ
          </div>
        )}
      </div>

      <div className="border-2 border-solid border-gray-400 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">6.3 ตารางแสดงผลจากฐานข้อมูลจริง</h2>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-10 font-bold text-gray-500">กำลังโหลด...</div>
          ) : (
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
                {(!games || games.length === 0) ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-400 font-semibold">ไม่มีข้อมูลเกมในระบบ (ตารางว่างเปล่า)</td>
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
                        <button onClick={() => handleEditClick(g)} className="bg-amber-500 text-white px-3 py-1.5 rounded text-xs font-bold shadow hover:bg-amber-600">แก้ไข</button>
                        <button onClick={() => handleDelete(g.game_id)} className="bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold shadow hover:bg-red-800">ลบ</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}