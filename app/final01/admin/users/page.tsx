'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editId, setEditId] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) setUsers(data.data || []);
    } catch (err) { console.error(err); }
    setIsLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleEditClick = (user: any) => {
    setEditId(user.user_id);
    setUsername(user.username);
    setEmail(user.email);
    setStatus(user.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: editId, username, email, status })
      });
      if (res.ok) {
        alert('อัปเดตข้อมูลผู้ใช้งานสำเร็จ!');
        setEditId(null);
        fetchUsers();
      }
    } catch (err) { alert('อัปเดตไม่สำเร็จ'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('ยืนยันการลบบัญชีผู้ใช้นี้? (รีวิวทั้งหมดของ User จะถูกลบด้วย)')) return;
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('ลบผู้ใช้งานสำเร็จ');
        fetchUsers();
      }
    } catch (err) { alert('ลบไม่สำเร็จ'); }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      
      {/* เมนูนำทางด้านบน */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 gap-4">
        <h1 className="text-2xl font-bold text-indigo-700">จัดการบัญชีผู้ใช้งาน</h1>
        <div className="flex flex-wrap gap-2">
          <Link href="/final01/admin/games" className="bg-green-600 text-white px-4 py-2 rounded-md font-bold shadow-sm hover:bg-green-700">🎮 จัดการเกม</Link>
          <Link href="/final01/admin/users" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-bold shadow-sm hover:bg-indigo-700">👥 จัดการผู้ใช้</Link>
          <Link href="/final01/admin/reviews" className="bg-red-600 text-white px-4 py-2 rounded-md font-bold shadow-sm hover:bg-red-700">💬 จัดการรีวิว</Link>
          <Link href="/final01" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-bold shadow-sm hover:bg-gray-300">🏠 หน้าหลัก</Link>
        </div>
      </div>

      <div className="border-2 border-solid border-amber-500 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">ฟอร์มแก้ไขข้อมูลผู้ใช้งาน</h2>
        {editId ? (
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700">ชื่อผู้ใช้ (Username)</label>
              <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="mt-1 w-full border rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">อีเมล (Email)</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full border rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">สถานะบัญชี</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className={`mt-1 w-full border rounded p-2 text-sm font-bold ${status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                <option value="active">Active (ใช้งานได้ปกติ)</option>
                <option value="suspended">Suspended (ระงับบัญชี/แบน)</option>
              </select>
            </div>
            <div className="md:col-span-3 flex gap-3 mt-2">
              <button type="submit" className="bg-amber-500 text-white px-5 py-2 rounded font-bold shadow hover:bg-amber-600">บันทึกการแก้ไข</button>
              <button type="button" onClick={() => setEditId(null)} className="bg-gray-200 px-5 py-2 rounded font-bold">ยกเลิก</button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 text-gray-500">กรุณากดปุ่ม "แก้ไข" จากตารางด้านล่าง</div>
        )}
      </div>

      <div className="border-2 border-solid border-gray-400 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">รายชื่อสมาชิกในระบบ</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 border">
            <thead className="bg-gray-100 uppercase font-bold text-xs">
              <tr>
                <th className="p-3 border text-center">ID</th>
                <th className="p-3 border">Username</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border text-center">Status</th>
                <th className="p-3 border text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.user_id} className="hover:bg-gray-50 border-b">
                  <td className="p-3 border text-center font-bold">{u.user_id}</td>
                  <td className="p-3 border font-semibold">{u.username}</td>
                  <td className="p-3 border">{u.email}</td>
                  <td className="p-3 border text-center">
                    {u.status === 'active' ? <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-xs">Active</span> : <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold text-xs">Banned</span>}
                  </td>
                  <td className="p-3 border text-center space-x-2">
                    <button onClick={() => handleEditClick(u)} className="bg-amber-500 text-white px-3 py-1.5 rounded text-xs font-bold shadow">แก้ไข</button>
                    <button onClick={() => handleDelete(u.user_id)} className="bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold shadow">ลบ</button>
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