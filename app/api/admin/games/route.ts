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

export async function GET() {
  try {
    const db = await getDB();
    const [rows] = await db.execute(`
      SELECT g.*, c.category_name, p.platform_name 
      FROM games g
      LEFT JOIN categories c ON g.category_id = c.category_id
      LEFT JOIN platforms p ON g.platform_id = p.platform_id
      ORDER BY g.game_id DESC
    `);
    await db.end();

    const formattedRows = (rows as any[]).map(row => {
      let platNames = "";
      try { platNames = JSON.parse(row.platform_name).join(', '); } 
      catch (e) { platNames = row.platform_name; }
      return { ...row, category: row.category_name, platforms: platNames };
    });
    return NextResponse.json({ success: true, data: formattedRows });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await getDB();

    let category_id = 1;
    if (body.category === 'Farming') category_id = 2;
    else if (body.category === 'Building') category_id = 3;
    else if (body.category === 'Action-Adventure') category_id = 4;

    const platArray = body.platforms ? body.platforms.split(',').map((p: string) => p.trim()) : [];
    const platString = JSON.stringify(platArray);
    
    const [rows]: any = await db.execute(`SELECT platform_id FROM platforms WHERE platform_name = ? LIMIT 1`, [platString]);
    let platform_id;
    if (rows.length > 0) platform_id = rows[0].platform_id;
    else {
      const [insertRes]: any = await db.execute(`INSERT INTO platforms (platform_name) VALUES (?)`, [platString]);
      platform_id = insertRes.insertId;
    }

    await db.execute(
      `INSERT INTO games (game_title, category_id, platform_id, developer, description, download_url, image, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [body.title, category_id, platform_id, body.developer, body.description, body.downloadUrl || '', body.image || '', 1]
    );
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await getDB();

    let category_id = 1;
    if (body.category === 'Farming') category_id = 2;
    else if (body.category === 'Building') category_id = 3;
    else if (body.category === 'Action-Adventure') category_id = 4;

    const platArray = body.platforms ? body.platforms.split(',').map((p: string) => p.trim()) : [];
    const platString = JSON.stringify(platArray);
    
    const [rows]: any = await db.execute(`SELECT platform_id FROM platforms WHERE platform_name = ? LIMIT 1`, [platString]);
    let platform_id;
    if (rows.length > 0) platform_id = rows[0].platform_id;
    else {
      const [insertRes]: any = await db.execute(`INSERT INTO platforms (platform_name) VALUES (?)`, [platString]);
      platform_id = insertRes.insertId;
    }

    await db.execute(
      `UPDATE games SET game_title=?, category_id=?, platform_id=?, developer=?, description=?, download_url=?, image=?, is_active=? WHERE game_id=?`,
      [body.title, category_id, platform_id, body.developer, body.description, body.downloadUrl || '', body.image || '', body.is_active, body.id]
    );
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const db = await getDB();
    
    // 1. ทำการลบข้อมูลเกม
    await db.execute(`DELETE FROM games WHERE game_id=?`, [id]);

    // 2. ค้นหา ID ที่สูงที่สุดในตารางตอนนี้
    const [maxRows]: any = await db.execute(`SELECT MAX(game_id) as maxId FROM games`);
    const nextId = (maxRows[0].maxId || 0) + 1;

    // 3. สั่งรีเซ็ตตัวนับให้กลับมาเรียงต่อจาก ID ล่าสุดโดยอัตโนมัติ
    await db.execute(`ALTER TABLE games AUTO_INCREMENT = ${nextId}`);
    
    await db.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}