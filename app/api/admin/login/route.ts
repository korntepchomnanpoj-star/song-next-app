import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db'; // ปรับ path ให้ชี้ไปที่ db.ts ของคุณ

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบ' }, { status: 400 });
    }

    // เช็คในฐานข้อมูลว่ามี username และ password นี้ตรงกันไหม
    const [rows]: any = await pool.query(
      'SELECT * FROM admins WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      // ถ้าล็อกอินถูก ส่งข้อมูลกลับไปให้หน้าเว็บ
      return NextResponse.json({ 
        success: true, 
        message: 'เข้าสู่ระบบแอดมินสำเร็จ!',
        admin: { username: rows[0].username, role: 'admin' }
      });
    } else {
      return NextResponse.json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านแอดมินไม่ถูกต้อง' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล' }, { status: 500 });
  }
}