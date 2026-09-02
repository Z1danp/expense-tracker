import type { ApiErrorResponse } from '@expense-tracker/shared-types';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthPayload extends jwt.JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response<ApiErrorResponse>,
  next: NextFunction
) => {
  // ambil token dari cookie
  const token = req.cookies?.token;
  // cek jika token tidak ada
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
  // verifikasi token dalam try ... catch
  try {
    // verifikasi dengan JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
    const decode = jwt.verify(token, jwtSecret);

    // type-guarding untuk memastikan payload valid
    if (
      typeof decode === 'string' ||
      !decode ||
      typeof decode.userId !== 'string'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or token expired',
      });
    }
    // simpan userId ke dalam req

    req.userId = decode.userId;
    // lanjutkan ke handler
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or token expired',
    });
  }
};
