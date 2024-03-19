import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'josuesay',
    database: 'blog_josuess',
    password: '12345',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
