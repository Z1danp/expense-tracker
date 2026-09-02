import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sql } from 'drizzle-orm';
import { db } from './db/index.js';
import authRoutes from './features/auth/auth.routes.js';
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// set auth route
app.use('/api/v1/auth', authRoutes);
// health check endpoint

app.get('/health', async (_req, res) => {
  try {
    const result = await db.execute<{ now: string }>(sql`SELECT NOW()`);

    res.json({
      status: 'ok',
      message: 'Server and Database connected succesfully!',
      timestamp: result.rows[0]?.now,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening color your night on http://localhost:${PORT}`);
});
