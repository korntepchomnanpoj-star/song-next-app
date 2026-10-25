'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // เช็กสถานะหลังบ้านผ่าน API ดึงผู้ใช้ (ตัวที่เราทำไว้แล้วในหน้าแอดมิน)
        try {
          const res = await fetch('/api/admin/users');
          
          // ป้องกัน Error กรณี API มีปัญหา
          if (!res.ok) return;
          
          const data = await res.json();
          if (data.success && data.data) {
            // หา User ที่ล็อกอินอยู่ในรายการ
            const currentUser = data.data.find((u: any) => u.username === parsedUser.username);
            
            // ถ้าเจอและสถานะเป็น suspended ให้เตะออก
            if (currentUser && currentUser.status === 'suspended') {
              alert('บัญชีของคุณถูกระงับการใช้งาน ระบบจะทำการออกจากระบบอัตโนมัติ');
              localStorage.removeItem('user');
              setUser(null);
              window.location.href = '/final01';
            }
          }
        } catch (err) {
          console.error("Failed to check status", err);
        }
      }
    };
    
    checkUserStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
      <Link href="/final01" className="text-2xl font-bold text-indigo-700">CozyGames Top 10</Link>
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {user ? (
          <>
            <span className="text-sm font-bold text-indigo-700 flex items-center gap-2">
              👤 สถานะ: {user.username}
            </span>
            <Link href="/final01/admin/games" className="border border-gray-300 px-4 py-2 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
              เข้าสู่ระบบแอดมิน
            </Link>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-red-700 shadow-sm transition">
              ออกจากระบบ
            </button>
          </>
        ) : (
          <>
            <span className="text-sm font-bold text-indigo-700 flex items-center gap-2">
              👤 สถานะ: ผู้เข้าชม (Guest)
            </span>
            <Link href="/final01/admin/login" className="border border-gray-300 px-4 py-2 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
              เข้าสู่ระบบแอดมิน
            </Link>
            <Link href="/final01/login" className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md text-sm font-bold hover:bg-indigo-50 transition">
              เข้าสู่ระบบ
            </Link>
            <Link href="/final01/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-indigo-700 shadow-sm transition">
              สมัครสมาชิก
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}