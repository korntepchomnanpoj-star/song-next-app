import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

async function getDB() {
  return await mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'cozygames', port: 3306 
  });
}

export async function GET() {
  try {
    const db = await getDB();
    const [rows] = await db.execute('SELECT user_id, username, email, status, created_at FROM users ORDER BY created_at DESC');
    await db.end();
    return NextResponse.json({ success: true, data: rows });
  } catch (error) { return NextResponse.json({ success: false }, { status: 500 }); }
}

export async function PUT(req: Request) {
  try {
    const { user_id, username, email, status } = await req.json();
    const db = await getDB();
    await db.execute(
      'UPDATE users SET username=?, email=?, status=? WHERE user_id=?',
      [username, email, status, user_id]
    );
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) { return NextResponse.json({ success: false }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const db = await getDB();
    // ลบรีวิวของ user นี้ก่อน (ป้องกัน Error Foreign Key) แล้วค่อยลบ User
    await db.execute('DELETE FROM reviews WHERE user_id=?', [id]);
    await db.execute('DELETE FROM users WHERE user_id=?', [id]);
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) { return NextResponse.json({ success: false }, { status: 500 }); }
}