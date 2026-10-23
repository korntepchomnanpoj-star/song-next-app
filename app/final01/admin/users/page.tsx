import { getAllUsers } from '../../lib/user-auth';

export default function AdminUsersPage() {
	return (
		<main className="mx-auto max-w-6xl px-6 py-10">
			<h1 className="text-2xl font-semibold">จัดการผู้ใช้</h1>
			<UsersTable />
		</main>
	);
}

async function UsersTable() {
	const users = await getAllUsers();

	return (
		<div className="mt-6 overflow-x-auto">
			<table className="w-full border-collapse text-left text-sm">
				<thead>
					<tr className="border-b border-gray-300 text-gray-600">
						<th className="py-3 pr-4">ชื่อผู้ใช้</th>
						<th className="py-3 pr-4">อีเมล</th>
						<th className="py-3 pr-4">สถานะ</th>
						<th className="py-3">สมัครเมื่อ</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id} className="border-b border-gray-200">
							<td className="py-3 pr-4 font-medium">{user.username}</td>
							<td className="py-3 pr-4">{user.email}</td>
							<td className="py-3 pr-4">{user.status}</td>
							<td className="py-3">{new Date(user.createdAt).toLocaleDateString('th-TH')}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
