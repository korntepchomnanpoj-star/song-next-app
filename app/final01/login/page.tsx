'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            alert(`ยินดีต้อนรับคุณ ${data.user.username}`);
            router.push('/final01');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100 relative">

                {/* ปุ่มย้อนกลับหน้าหลัก */}
                <Link href="/final01" className="absolute top-4 left-4 text-indigo-600 hover:underline text-sm font-medium">
                    &larr; ย้อนกลับหน้าแรก
                </Link>

                <h2 className="text-2xl font-bold text-center mt-4 mb-6">เข้าสู่ระบบ</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                        <input type="email" required className="w-full mt-1 p-2 border rounded-md"
                            onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
                        <input type="password" required className="w-full mt-1 p-2 border rounded-md"
                            onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 mt-2">
                        เข้าสู่ระบบ
                    </button>
                </form>
                <p className="text-center mt-5 text-sm">ยังไม่มีบัญชี? <Link href="/final01/register" className="text-indigo-600 font-bold hover:underline">สมัครสมาชิก</Link></p>
            </div>
        </div>
    );
}