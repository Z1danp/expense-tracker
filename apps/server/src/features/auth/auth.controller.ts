// ===============================
// REGISTER
// ===============================

import type { Request, Response } from 'express';
import { loginSchema, registerSchema } from './auth.schema.js';
import type {
  RegisterResponse,
  ValidationErrorResponse,
  ApiErrorResponse,
  ValidationError,
  LoginResponse,
} from '@expense-tracker/shared-types';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';
import { users } from '../../db/schema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtGenerator = (userId: string) => {
  //   buat token jwt
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured in .env');
  }

  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: '7d',
  });

  return token;
};

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

    const token = jwtGenerator(newUser.id);

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

export const login = async (
  req: Request,
  res: Response<LoginResponse | ApiErrorResponse | ValidationErrorResponse>
) => {
  try {
    // validasi input dengan zod
    const validation = loginSchema.safeParse(req.body);
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
    // Hashing password
    const { email, password } = validation.data;

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password_hash
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // generate jwt

    const token = jwtGenerator(existingUser.id);
    // kirim cookie dan informasi login
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          payday_date: existingUser.payday_date,
          alert_threshold: existingUser.alert_threshold,
          created_at: existingUser.created_at.toISOString(),
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
