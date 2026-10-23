import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  user: '279RAwtMQwyNT7C.root', // เอาค่า User จากหน้าเว็บ TiDB มาใส่
  password: 'cni8kqIHa61PnCjC', // ใส่รหัสผ่าน TiDB ที่เซฟไว้
  database: 'cozygames',
  port: 4000,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});