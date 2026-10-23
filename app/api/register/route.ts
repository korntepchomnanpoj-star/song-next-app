import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    
    const db = await mysql.createConnection({ 
      host: 'localhost', user: 'root', password: '', database: 'cozygames' 
    });
    
    // เช็คว่ามีอีเมลนี้หรือยัง
    const [existingUsers]: any = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      await db.end();
      return NextResponse.json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' }, { status: 400 });
    }

    // บันทึก User ใหม่ (บันทึกรหัสผ่านลงคอลัมน์ password_hash)
    await db.execute(
      'INSERT INTO users (username, email, password_hash, status) VALUES (?, ?, ?, ?)',
      [username, email, password, 'active'] 
    );
    
    await db.end();
    return NextResponse.json({ success: true, message: 'สมัครสมาชิกสำเร็จ' });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' }, { status: 500 });
  }
}