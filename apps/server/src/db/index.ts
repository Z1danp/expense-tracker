import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'
import dotenv from 'dotenv';
import { error } from 'console';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in environment variables');
}

// inisialisasi HTTP client neon
const sql = neon(process.env.DATABASE_URL);

// bungkus dengan Drizzle ORM
export const db = drizzle(sql)