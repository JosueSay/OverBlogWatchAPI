import mysql from 'mysql2/promise'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './config'

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  port: DB_PORT,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool
