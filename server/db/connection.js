//MySQL 연결 풀

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '000000',
  database: 'bp',
});

export default pool;
