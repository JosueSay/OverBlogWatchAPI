import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'josues',
    database: 'blog_josuesay',
    password: '12345',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
