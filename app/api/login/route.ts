import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    const db = await mysql.createConnection({ 
      host: 'localhost', user: 'root', password: '', database: 'cozygames' 
    });
    
    const [users]: any = await db.execute(
      'SELECT user_id, username, email FROM users WHERE email = ? AND password_hash = ? AND status = "active"',
      [email, password]
    );
    
    await db.end();

    if (users.length > 0) {
      // คืนค่าข้อมูล User กลับไปให้หน้าเว็บใช้งาน
      return NextResponse.json({ success: true, user: users[0] });
    } else {
      return NextResponse.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' }, { status: 500 });
  }
}