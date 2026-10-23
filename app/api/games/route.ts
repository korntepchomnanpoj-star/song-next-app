import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await mysql.createConnection({
      host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
      user: '279RAWtMQwyNT7C.root',
      password: 'cni8kqIHa61PnCJc',
      database: 'cozygames',
      port: 4000,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false
      }
    });

    // ดึงข้อมูลโดย JOIN ตาราง categories และ platforms ให้ตรงกับ E-R Diagram ปัจจุบัน
    const [rows] = await db.execute(`
      SELECT 
        g.game_id AS id, 
        g.game_title AS title, 
        c.category_name AS category, 
        p.platform_name AS platforms,
        g.image,
        ROUND(IFNULL(AVG(r.rating_score), 0), 1) AS average_rating,
        COUNT(r.review_id) AS review_count
      FROM games g
      LEFT JOIN categories c ON g.category_id = c.category_id
      LEFT JOIN platforms p ON g.platform_id = p.platform_id
      LEFT JOIN reviews r ON g.game_id = r.game_id
      WHERE g.is_active = 1
      GROUP BY g.game_id, g.game_title, c.category_name, p.platform_name, g.image
      ORDER BY average_rating DESC, review_count DESC, g.game_id DESC
    `);

    await db.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database Error (Games):", error);
    // ส่ง Array ว่างกลับไปแทน Error เพื่อไม่ให้หน้าเว็บจอขาว
    return NextResponse.json([], { status: 500 });
  }
}