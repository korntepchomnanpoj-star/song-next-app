'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 1. ตรวจสอบสิทธิ์แอดมิน
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      setIsAdmin(true);
    }

    // 2. ตรวจสอบสถานะ User ทั่วไป
    const checkUserStatus = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        try {
          const res = await fetch('/api/admin/users');
          if (!res.ok) return;
          const data = await res.json();
          if (data.success && data.data) {
            const currentUser = data.data.find((u: any) => u.username === parsedUser.username);
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

  // ออกจากระบบ User
  const handleUserLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  // ออกจากระบบ Admin
  const handleAdminLogout = () => {
    localStorage.removeItem('admin');
    setIsAdmin(false);
    alert('ออกจากระบบแอดมินแล้ว');
    window.location.href = '/final01';
  };

  return (
    <nav className="bg-white border-b py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
      <Link href="/final01" className="text-2xl font-bold text-indigo-700">CozyGames Top 10</Link>
      
      <div className="flex flex-wrap items-center gap-3 justify-center">
        {/* กรณีเข้าสู่ระบบในฐานะ User ธรรมดา */}
        {user ? (
          <>
            <span className="text-sm font-bold text-indigo-700 flex items-center gap-2">
              👤 สถานะ: {user.username}
            </span>
            <button 
              onClick={handleUserLogout} 
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-red-700 shadow-sm transition"
            >
              ออกจากระบบ
            </button>
          </>
        ) : (
          /* กรณีเป็น Guest (ยังไม่ได้ล็อกอิน User) */
          <>
            <span className="text-sm font-bold text-gray-500 flex items-center gap-2">
              👤 สถานะ: ผู้เข้าชม (Guest)
            </span>
            <Link href="/final01/login" className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md text-sm font-bold hover:bg-indigo-50 transition">
              เข้าสู่ระบบ
            </Link>
            <Link href="/final01/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-indigo-700 shadow-sm transition">
              สมัครสมาชิก
            </Link>
          </>
        )}

        {/* ส่วนของแอดมิน: แยกปุ่มชัดเจน */}
        {isAdmin ? (
          <div className="flex items-center gap-2 pl-2 border-l">
            <Link href="/final01/admin/games" className="bg-amber-500 text-white px-3 py-2 rounded-md text-sm font-bold hover:bg-amber-600 transition">
              แผงควบคุมแอดมิน
            </Link>
            <button 
              onClick={handleAdminLogout} 
              className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition"
            >
              ออกแอดมิน
            </button>
          </div>
        ) : (
          !user && (
            <Link href="/final01/admin/login" className="border border-gray-300 text-gray-600 px-3 py-2 rounded-md text-sm font-bold hover:bg-gray-100 transition">
              เข้าสู่ระบบแอดมิน
            </Link>
          )
        )}
      </div>
    </nav>
  );
}