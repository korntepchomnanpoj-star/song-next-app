import { pool } from '../../../lib/db';

export default async function AdminUsersPage() {
    let users: any = [];
    
    try {
        // ดึงข้อมูลจากฐานข้อมูลโดยตรง ไม่ต้องผ่าน user-auth
        const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
        users = rows;
    } catch (error) {
        console.error('Error fetching users:', error);
    }

    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <h1 className="text-2xl font-semibold text-gray-800">จัดการผู้ใช้</h1>
            
            <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-gray-100">
                        <tr className="border-b border-gray-300 text-gray-600">
                            <th className="py-3 px-4">ชื่อผู้ใช้</th>
                            <th className="py-3 px-4">อีเมล</th>
                            <th className="py-3 px-4">สถานะ</th>
                            <th className="py-3 px-4">สมัครเมื่อ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: any) => (
                            <tr key={user.user_id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{user.username}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                                        {user.status || 'user'}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    {user.created_at ? new Date(user.created_at).toLocaleDateString('th-TH') : '-'}
                                </td>
                            </tr>
                        ))}
                        {(!users || users.length === 0) && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-gray-500">ไม่พบข้อมูลผู้ใช้</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}