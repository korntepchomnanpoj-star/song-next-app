import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = { host: 'localhost', user: 'root', password: '', database: 'cozygames' };

// ดึงคอมเมนต์มาแสดง
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    if (!gameId) return NextResponse.json([]);

    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.execute(`
      SELECT r.*, u.username 
      FROM reviews r 
      JOIN users u ON r.user_id = u.user_id 
      WHERE r.game_id = ? 
      ORDER BY r.created_at DESC
    `, [gameId]);
    
    await db.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET Reviews Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

// รับคอมเมนต์ลงฐานข้อมูล
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("ข้อมูลรีวิวที่ส่งมา:", body); // เช็คใน Terminal ได้ว่าส่งอะไรมาบ้าง

    const { game_id, user_id, rating_score, comment_text } = body;

    // เช็คว่าข้อมูลส่งมาครบไหม
    if (!game_id || !user_id || !rating_score) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบถ้วน (อาจจะลืมส่ง user_id)' }, { status: 400 });
    }

    const db = await mysql.createConnection(dbConfig);
    await db.execute(
      'INSERT INTO reviews (user_id, game_id, rating_score, comment_text) VALUES (?, ?, ?, ?)',
      [user_id, game_id, rating_score, comment_text || ""]
    );
    
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST Review Error:", error);
    return NextResponse.json({ error: 'บันทึกรีวิวลงฐานข้อมูลไม่สำเร็จ' }, { status: 500 });
  }
}