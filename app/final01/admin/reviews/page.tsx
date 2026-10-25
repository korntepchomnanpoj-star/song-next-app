'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      if (data.success) setReviews(data.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('ยืนยันการลบรีวิวที่ไม่เหมาะสมนี้ออกจากระบบ?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('ลบรีวิวสำเร็จ');
        fetchReviews();
      }
    } catch (err) { alert('ลบไม่สำเร็จ'); }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      
      {/* เมนูนำทางด้านบน */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 gap-4">
        <h1 className="text-2xl font-bold text-red-700">ตรวจสอบและจัดการรีวิว</h1>
        <div className="flex flex-wrap gap-2">
          <Link href="/final01/admin/games" className="bg-green-600 text-white px-4 py-2 rounded-md font-bold shadow-sm hover:bg-green-700">🎮 จัดการเกม</Link>
          <Link href="/final01/admin/users" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-bold shadow-sm hover:bg-indigo-700">👥 จัดการผู้ใช้</Link>
          <Link href="/final01/admin/reviews" className="bg-red-600 text-white px-4 py-2 rounded-md font-bold shadow-sm hover:bg-red-700">💬 จัดการรีวิว</Link>
          <Link href="/final01" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-bold shadow-sm hover:bg-gray-300">🏠 หน้าหลัก</Link>
        </div>
      </div>

      <div className="border-2 border-solid border-red-500 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">รีวิวทั้งหมดจากผู้ใช้งาน</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 border">
            <thead className="bg-gray-100 uppercase font-bold text-xs">
              <tr>
                <th className="p-3 border text-center w-12">ID</th>
                <th className="p-3 border w-32">ผู้รีวิว</th>
                <th className="p-3 border w-48">เกมที่รีวิว</th>
                <th className="p-3 border">ข้อความรีวิว</th>
                <th className="p-3 border text-center w-24">คะแนน</th>
                <th className="p-3 border text-center w-20">ลบทิ้ง</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.review_id} className="hover:bg-gray-50 border-b">
                  <td className="p-3 border text-center font-bold">{r.review_id}</td>
                  <td className="p-3 border font-bold text-indigo-700">{r.username}</td>
                  <td className="p-3 border font-semibold">{r.game_title}</td>
                  <td className="p-3 border text-gray-600">{r.comment_text}</td>
                  <td className="p-3 border text-center text-amber-500 text-lg">
                    {Array(r.rating_score).fill('★').join('')}
                  </td>
                  <td className="p-3 border text-center">
                    <button onClick={() => handleDelete(r.review_id)} className="bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold shadow hover:bg-red-700">ลบ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}