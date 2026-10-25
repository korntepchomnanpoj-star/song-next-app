import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    const db = await mysql.createConnection({ 
      host: 'localhost', user: 'root', password: '', database: 'cozygames', port: 3306 
    });
    
    // ดึงสถานะล่าสุดจากฐานข้อมูล
    const [users]: any = await db.execute('SELECT status FROM users WHERE username = ?', [username]);
    await db.end();

    if (users.length > 0) {
      return NextResponse.json({ success: true, status: users[0].status });
    }
    return NextResponse.json({ success: false, error: 'User not found' });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}