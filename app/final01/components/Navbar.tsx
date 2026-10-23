'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState<{ username: string } | null>(null);

  // ดึงข้อมูลการล็อกอินตอนโหลดหน้าเว็บ
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // ลบข้อมูลออกจากเครื่อง
    setUser(null);
    window.location.reload(); // รีเฟรชหน้าเว็บ
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/final01">
        <h1 className="text-xl font-bold text-indigo-600 cursor-pointer">CozyGames Top 10</h1>
      </Link>

      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-full shadow-inner border border-gray-200">
          <span className="mr-2 text-lg">👤</span>
          {/* ถ้ามี user ให้โชว์ชื่อ ถ้าไม่มีให้โชว์ Guest */}
          <span>สถานะ: <span className="font-bold text-indigo-600">
            {user ? user.username : 'ผู้เข้าชม (Guest)'}
          </span></span>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>
        
        {/* แก้ไขปุ่มแอดมินให้โครงสร้างเหมือนปุ่มอื่น ไม่ซ้ำซ้อน */}
        <Link href="/final01/admin/login">
          <button className="px-4 py-2 text-sm text-gray-600 border border-gray-400 rounded-md hover:bg-gray-100 transition">
            เข้าสู่ระบบแอดมิน
          </button>
        </Link>
        
        <div className="w-px h-6 bg-gray-300"></div>

        {/* ถ้าล็อกอินแล้ว โชว์ปุ่มออกจากระบบ ถ้ายังโชว์ปุ่มเข้าสู่ระบบ */}
        {user ? (
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            ออกจากระบบ
          </button>
        ) : (
          <div className="space-x-3 flex items-center">
            <Link href="/final01/login">
              <button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition">
                เข้าสู่ระบบ
              </button>
            </Link>
            <Link href="/final01/register">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                สมัครสมาชิก
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}