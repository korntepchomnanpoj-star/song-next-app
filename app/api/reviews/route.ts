import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

async function getDB() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cozygames',
    port: 3306 
  });
}

// 1. ดึงข้อมูลรีวิว (GET)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get('gameId');
    const db = await getDB();
    const [rows] = await db.execute(`
      SELECT r.*, u.username 
      FROM reviews r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.game_id = ?
      ORDER BY r.created_at DESC
    `, [gameId]);
    await db.end();
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}

// 2. เพิ่มรีวิวใหม่ (POST)
export async function POST(req: Request) {
  try {
    const { game_id, username, rating_score, comment_text } = await req.json();
    const db = await getDB();
    
    // หา user_id จาก username
    const [users]: any = await db.execute('SELECT user_id FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
        await db.end();
        return NextResponse.json({ success: false, error: 'User not found' });
    }
    const user_id = users[0].user_id;

    await db.execute(
      'INSERT INTO reviews (user_id, game_id, rating_score, comment_text) VALUES (?, ?, ?, ?)',
      [user_id, game_id, rating_score, comment_text]
    );
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}

// 3. แก้ไขรีวิว (PUT)
export async function PUT(req: Request) {
  try {
    const { review_id, rating_score, comment_text } = await req.json();
    const db = await getDB();
    await db.execute(
      'UPDATE reviews SET rating_score = ?, comment_text = ? WHERE review_id = ?',
      [rating_score, comment_text, review_id]
    );
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}

// 4. ลบรีวิว (DELETE)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const review_id = searchParams.get('reviewId');
    const db = await getDB();
    await db.execute('DELETE FROM reviews WHERE review_id = ?', [review_id]);
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}