import mysql from 'mysql2/promise';

// ตั้งค่าเพื่อเชื่อมต่อกับฐานข้อมูล MySQL (XAMPP)
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // ค่าเริ่มต้นของ XAMPP คือ root
  password: '',         // ค่าเริ่มต้นของ XAMPP รหัสผ่านจะว่างเปล่า
  database: 'cozygames', // **เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ**
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});