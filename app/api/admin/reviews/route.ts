import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

async function getDB() {
  return await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'cozygames', port: 3306 });
}

export async function GET() {
  try {
    const db = await getDB();
    const [rows] = await db.execute(`
      SELECT r.review_id, r.rating_score, r.comment_text, r.created_at, u.username, g.game_title 
      FROM reviews r
      JOIN users u ON r.user_id = u.user_id
      JOIN games g ON r.game_id = g.game_id
      ORDER BY r.created_at DESC
    `);
    await db.end();
    return NextResponse.json({ success: true, data: rows });
  } catch (error) { return NextResponse.json({ success: false }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const db = await getDB();
    await db.execute('DELETE FROM reviews WHERE review_id=?', [id]);
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) { return NextResponse.json({ success: false }, { status: 500 }); }
}