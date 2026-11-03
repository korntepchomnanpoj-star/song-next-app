เข้า http://localhost/phpmyadmin/index.php เพื่อเพิ่มฐานข้อมูล
1. นำเข้าฐานข้อมูล (Database)

-เปิดโปรแกรม XAMPP แล้วกด Start ที่บรรทัด Apache และ MySQL

-เปิดเบราว์เซอร์ เข้าไปที่ http://localhost/phpmyadmin

-กด New เพื่อสร้างฐานข้อมูลใหม่ ตั้งชื่อว่า cozygames

-คลิกที่ชื่อ cozygames ด้านซ้ายมือ จากนั้นเลือกเมนู Import ด้านบน

-กด Choose File เลือกไฟล์ .sql ที่แนบมาให้ แล้วเลื่อนลงมากดปุ่ม Import (หรือ Go) ด้านล่างสุด


2. ติดตั้งและรันโปรเจกต์ (Next.js)

-แตกไฟล์ Zip โปรเจกต์ แล้วเปิดโฟลเดอร์นั้นขึ้นมาด้วยโปรแกรม VS Code

-เปิด Terminal ใน VS Code (ไปที่เมนู Terminal > New Terminal)

-พิมพ์คำสั่ง npm install แล้วกด Enter (รอระบบโหลดแพ็กเกจสักครู่)

-เมื่อโหลดเสร็จ พิมพ์คำสั่ง npm run dev แล้วกด Enter

3. เปิดหน้าเว็บไซต์

เปิดเบราว์เซอร์ แล้วพิมพ์ URL: http://localhost:3000/final01

หน้าเว็บจะแสดงผลและดึงข้อมูลจาก XAMPP ในเครื่องมาแสดงได้สมบูรณ์ 100%

เทสระบบ admin
user:admin
pass:admin123