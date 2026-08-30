// ===============================
// REGISTER
// ===============================

import type { Request, Response } from 'express';
import { registerSchema } from './auth.schema.js';
import type {
  RegisterResponse,
  ValidationErrorResponse,
  ApiErrorResponse,
  ValidationError,
} from '@expense-tracker/shared-types';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';
import { users } from '../../db/schema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (
  req: Request,
  res: Response<RegisterResponse | ValidationErrorResponse | ApiErrorResponse>
) => {
  try {
    // validasi input dengan zod
    const validation = registerSchema.safeParse(req.body);
    // kondisi jika validasi gagal
    if (!validation.success) {
      const formattedError: ValidationError[] = validation.error.issues.map(
        (issue) => ({
          field: issue.path.join('.') || 'general',
          message: issue.message,
        })
      );

      return res.status(422).json({
        success: false,
        message: 'Validation Error',
        errors: formattedError,
      });
    }

    // data sudah valid

    const { name, email, password } = validation.data;

    // cek apakah email sudah terdaftar
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // simpan user ke postgres via drizzle
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password_hash: passwordHash,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        payday_date: users.payday_date,
        alert_threshold: users.alert_threshold,
        created_at: users.created_at,
      });

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    //   buat token jwt
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRRET is not configured in .env');
    }

    const token = jwt.sign({ userId: newUser.id }, jwtSecret, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // kirim response sukses
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          ...newUser,
          created_at: newUser.created_at.toISOString(),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
