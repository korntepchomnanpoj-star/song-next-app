import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// ฟังก์ชันสำหรับเตรียมโฟลเดอร์ (ถ้าไม่มีมันจะสร้างให้เองตอนอัปโหลด)
async function ensureUploadsFolderExists() {
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  try {
    await mkdir(uploadDir, { recursive: true });
    return uploadDir;
  } catch (error) {
    console.error("Error creating uploads folder:", error);
    return uploadDir;
  }
}

export async function GET() {
  try {
    const [rows]: any = await pool.query('SELECT * FROM games ORDER BY game_id DESC');
    return NextResponse.json({ success: true, games: rows });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'ดึงข้อมูลเกมไม่สำเร็จ' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const platforms = formData.get('platforms') as string;
    const developer = formData.get('developer') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File | null;

    if (!title || !category || !platforms) {
      return NextResponse.json({ success: false, message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบ' }, { status: 400 });
    }

    let imageUrl = '';

    if (file && file.size > 0) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = Date.now() + '-' + file.name.replace(/\s/g, '-');
        
        // รับประกันว่ามีโฟลเดอร์แน่นอน
        const uploadDir = await ensureUploadsFolderExists();
        const uploadPath = join(uploadDir, fileName);
        
        await writeFile(uploadPath, buffer);
        imageUrl = `/uploads/${fileName}`; // เซฟแค่ชื่อ Path สั้นๆ ลง Database
      } catch (fileError) {
        console.error("File upload error:", fileError);
        return NextResponse.json({ success: false, message: 'บันทึกรูปภาพลงโฟลเดอร์ไม่สำเร็จ' }, { status: 500 });
      }
    }

    try {
      await pool.query(
        'INSERT INTO games (game_title, category, platforms, developer, description, image, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        [title, category, platforms, developer || '', description || '', imageUrl]
      );
      return NextResponse.json({ success: true, message: 'บันทึกเกมลงระบบสำเร็จ!' });
    } catch (dbError: any) {
      console.error("Database Insert error:", dbError);
      return NextResponse.json({ success: false, message: 'บันทึกลง Database ไม่สำเร็จ' }, { status: 500 });
    }

  } catch (error: any) {
    console.error("General POST error:", error);
    return NextResponse.json({ success: false, message: 'เกิดข้อผิดพลาดจากฝั่งเซิร์ฟเวอร์' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const platforms = formData.get('platforms') as string;
    const developer = formData.get('developer') as string;
    const description = formData.get('description') as string;
    const isActive = formData.get('isActive') as string;
    const file = formData.get('image') as File | null;
    let imageUrl = formData.get('existingImage') as string;

    if (!id || !title) {
      return NextResponse.json({ success: false, message: 'ข้อมูลไม่ครบถ้วน' }, { status: 400 });
    }

    if (file && file.size > 0) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = Date.now() + '-' + file.name.replace(/\s/g, '-');
        
        const uploadDir = await ensureUploadsFolderExists();
        const uploadPath = join(uploadDir, fileName);
        
        await writeFile(uploadPath, buffer);
        imageUrl = `/uploads/${fileName}`; 
      } catch (fileError) {
        console.error("File upload error (PUT):", fileError);
        return NextResponse.json({ success: false, message: 'แก้ไขรูปภาพไม่สำเร็จ' }, { status: 500 });
      }
    }

    try {
      await pool.query(
        `UPDATE games 
         SET game_title = ?, category = ?, platforms = ?, developer = ?, description = ?, image = ?, is_active = ?
         WHERE game_id = ?`,
        [title, category, platforms, developer || '', description || '', imageUrl || '', parseInt(isActive), id]
      );
      return NextResponse.json({ success: true, message: 'อัปเดตข้อมูลและสถานะสำเร็จ!' });
    } catch (dbError: any) {
      console.error("Database Update error:", dbError);
      return NextResponse.json({ success: false, message: 'อัปเดต Database ไม่สำเร็จ' }, { status: 500 });
    }

  } catch (error) {
    console.error("General PUT error:", error);
    return NextResponse.json({ success: false, message: 'เกิดข้อผิดพลาดในการแก้ไข' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ไม่พบรหัส' }, { status: 400 });

    await pool.query('DELETE FROM games WHERE game_id = ?', [id]);
    return NextResponse.json({ success: true, message: 'ลบข้อมูลสำเร็จแล้ว!' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'เกิดข้อผิดพลาดในการลบ' }, { status: 500 });
  }
}