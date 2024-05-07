import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000
export const DB_HOST = process.env.VE_HOST || 'localhost'
export const DB_USER = process.env.VE_USER || 'root'
export const DB_PASSWORD = process.env.VE_PASSWORD || 'mypassword'
export const DB_NAME = process.env.VE_NAME || 'mydb'
export const DB_PORT = process.env.VE_PORT || 3306
