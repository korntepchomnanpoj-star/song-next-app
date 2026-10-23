'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        alert(data.message);
        // บันทึกสถานะแอดมินลง LocalStorage
        localStorage.setItem('admin', JSON.stringify(data.admin));
        // พาเด้งไปหน้าจัดการข้อมูลเกมที่เราทำไว้
        router.push('/final01/admin/games');
      } else {
        alert(data.message);
      }
    } catch (err) {
      setLoading(false);
      alert('ระบบมีปัญหา กรุณาลองใหม่');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border-t-4 border-amber-500">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-sm text-gray-500">เฉพาะผู้ดูแลระบบเท่านั้น</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ชื่อผู้ใช้แอดมิน</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="Admin Username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white font-bold py-2 rounded-md hover:bg-amber-700 transition duration-200"
          >
            {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/final01" className="text-sm text-indigo-600 hover:underline">
            &larr; กลับหน้าหลักผู้ใช้ทั่วไป
          </Link>
        </div>
      </div>
    </div>
  );
}