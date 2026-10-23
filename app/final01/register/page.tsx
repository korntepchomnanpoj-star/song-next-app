'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ----- ส่วนตรวจสอบเงื่อนไขรหัสผ่าน (Password Validation) -----
    const p = formData.password;

    // เช็คความยาวอย่างน้อย 8 ตัว
    if (p.length < 8) {
      alert("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
      return; // สั่งให้หยุดทำงาน ไม่ส่งข้อมูลไป API
    }

    // เช็คว่าต้องมี พิมพ์เล็ก พิมพ์ใหญ่ และอักษรพิเศษ (เช็คทีละเงื่อนไขแบบเข้าใจง่าย)
    const hasUpperCase = /[A-Z]/.test(p);      // เช็คว่ามี A-Z ไหม
    const hasLowerCase = /[a-z]/.test(p);      // เช็คว่ามี a-z ไหม
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(p); // เช็คตัวอักษรพิเศษ

    if (!hasUpperCase || !hasLowerCase || !hasSpecialChar) {
      alert("รหัสผ่านต้องประกอบด้วยตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก และตัวอักษรพิเศษ (!@#$%)");
      return;
    }
    // -------------------------------------------------------------

    // ถ้าผ่านเงื่อนไขหมด ค่อยส่งข้อมูลไปหา API
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (data.success) {
      alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
      router.push('/final01/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100 relative">

        {/* ปุ่มย้อนกลับหน้าหลัก (วางมุมซ้ายบนของกล่อง) */}
        <Link href="/final01" className="absolute top-4 left-4 text-indigo-600 hover:underline text-sm font-medium">
          &larr; ย้อนกลับหน้าแรก
        </Link>

        <h2 className="text-2xl font-bold text-center mt-4 mb-6">สมัครสมาชิก</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ชื่อผู้ใช้ (Username)</label>
            <input type="text" required className="w-full mt-1 p-2 border rounded-md"
              onChange={e => setFormData({ ...formData, username: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">อีเมล</label>
            {/* type="email" จะบังคับให้ต้องพิมพ์ให้ถูกรูปแบบอีเมลโดยอัตโนมัติ */}
            <input type="email" required className="w-full mt-1 p-2 border rounded-md"
              onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <input type="password" required className="w-full mt-1 p-2 border rounded-md"
              onChange={e => setFormData({ ...formData, password: e.target.value })} />
            <p className="text-xs text-gray-500 mt-1">
              *รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ พิมพ์เล็ก และอักษรพิเศษ
            </p>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 mt-2">
            ยืนยันการสมัคร
          </button>
        </form>
        <p className="text-center mt-5 text-sm">มีบัญชีอยู่แล้ว? <Link href="/final01/login" className="text-indigo-600 font-bold hover:underline">เข้าสู่ระบบ</Link></p>
      </div>
    </div>
  );
}