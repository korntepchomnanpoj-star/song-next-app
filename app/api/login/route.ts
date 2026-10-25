import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    const db = await mysql.createConnection({ 
      host: 'localhost', user: 'root', password: '', database: 'cozygames', port: 3306
    });
    
    // ดึง status มาตรวจสอบด้วย
    const [users]: any = await db.execute(
      'SELECT user_id, username, email, status FROM users WHERE email = ? AND password_hash = ?',
      [email, password]
    );
    
    await db.end();

    if (users.length > 0) {
      const user = users[0];
      
      // 1. เช็กว่าโดนแบน (ระงับบัญชี) หรือไม่
      if (user.status === 'suspended') {
        return NextResponse.json({ error: 'บัญชีของคุณถูกระงับการใช้งาน กรุณาติดต่อแอดมิน' }, { status: 403 });
      }

      // 2. ถ้าสถานะปกติ (active) ให้เข้าสู่ระบบได้
      return NextResponse.json({ 
        success: true, 
        user: { 
          user_id: user.user_id, 
          username: user.username, 
          email: user.email 
        } 
      });
    } else {
      return NextResponse.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' }, { status: 500 });
  }
}