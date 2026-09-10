import type { Request, Response } from 'express';
import { eq, and, desc } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { accounts } from '../../db/schema.js';
import {
  createAccountSchema,
  updateAccountSchema,
  accountIdParamSchema,
} from './accounts.schema.js';
import type {
  ApiResponse,
  ApiErrorResponse,
  ValidationErrorResponse,
  ValidationError,
  AddAccountResponse,
  EditAccountResponse,
  Account as AccountDTO,
} from '@expense-tracker/shared-types';

export interface AccountsListData {
  total_net_worth: number;
  accounts: AccountDTO[];
}

export type AccountsListResponse = ApiResponse<AccountsListData>;

// ==========================================
// 1. GET ALL ACCOUNTS (List & Total Net Worth)
// ==========================================
export const getAccounts = async (
  req: Request,
  res: Response<
    AccountsListResponse | ApiErrorResponse | ValidationErrorResponse
  >
) => {
  try {
    // cek apakah ada userID 
    const userId = req.userId;
    if (!userId) {
      // kalo ga ada kirim response unauthorized
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    // Query hanya akun aktif milik user yang sedang login
    const userAccounts = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.user_id, userId), eq(accounts.is_active, true)))
      .orderBy(desc(accounts.created_at));

    // Hitung total net worth dari semua akun aktif (sudah dijamin aktif dari database)
    // reduce -> akumulasi jumlah saldo, dimana sum = wadah akumulator, acc = akun saat ini, 0 = nilai awal
    const total_net_worth = userAccounts.reduce(
      (sum, acc) => sum + Number(acc.balance),
      0
    );
    
      // menggunakan DTO untuk merahasiakan identitas user_id, karena user_id bisa diambil dari cookie ketika fetch API
    const formattedAccounts: AccountDTO[] = userAccounts.map((acc) => ({
      id: acc.id, 
      name: acc.name,
      type: acc.type,
      balance: Number(acc.balance),
      is_active: acc.is_active,
      created_at: acc.created_at.toISOString(),
    }));

    return res.status(200).json({
      success: true,
      message: 'Accounts fetched successfully',
      data: {
        total_net_worth,
        accounts: formattedAccounts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// ==========================================
// 2. CREATE ACCOUNT (POST /api/v1/accounts)
// ==========================================
export const createAccount = async (
  req: Request,
  res: Response<AddAccountResponse | ApiErrorResponse | ValidationErrorResponse>
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    // validasi zod dengan safeParse 
    const validation = createAccountSchema.safeParse(req.body);
    if (!validation.success) {
      const errors: ValidationError[] = validation.error.issues.map(
        (issue) => ({
          field: issue.path.join('.') || 'general',
          message: issue.message,
        })
      );
      return res.status(422).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }
    // destructuring hasil validasi response untuk buat akun baru di database
    const { name, type, initial_balance } = validation.data;

    const [newAccount] = await db
      .insert(accounts)
      .values({
        user_id: userId,
        name,
        type,
        balance: initial_balance,
        is_active: true,
      })
      .returning();
    
    // guard eksplisit untuk menghilangkan error typescript
    if (!newAccount) {
      throw new Error('Failed to insert account');
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: newAccount.id,
        name: newAccount.name,
        type: newAccount.type,
        balance: Number(newAccount.balance),
        is_active: true,
        created_at: newAccount.created_at.toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// ==========================================
// 3. UPDATE ACCOUNT (PATCH /api/v1/accounts/:id)
// ==========================================
export const updateAccount = async (
  req: Request,
  res: Response<
    EditAccountResponse | ApiErrorResponse | ValidationErrorResponse
  >
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const paramValidation = accountIdParamSchema.safeParse(req.params);
    if (!paramValidation.success) {
      return res.status(422).json({
        success: false,
        message: 'Invalid account ID in URL parameter',
        errors: paramValidation.error.issues.map((issue) => ({
          field: issue.path.join('.') || 'id',
          message: issue.message,
        })),
      });
    }

    const bodyValidation = updateAccountSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      return res.status(422).json({
        success: false,
        message: 'Validation error',
        errors: bodyValidation.error.issues.map((issue) => ({
          field: issue.path.join('.') || 'general',
          message: issue.message,
        })),
      });
    }

    const { id } = paramValidation.data;
    const { name, type, is_active } = bodyValidation.data;

    // Eksekusi update
    const [updatedAccount] = await db
      .update(accounts)
      .set({ // logic dalam spread ini, 1. cek key (misal name) jika tidak undefined maka true 2. jika true langsung check kondisi name, sehingga hasil akhir di set itu `name: BCA`. Jika 
        ...(name !== undefined && { name }),
        ...(type !== undefined && { type }),
        ...(is_active !== undefined && { is_active }),
      })
      .where(and(eq(accounts.id, id), eq(accounts.user_id, userId)))
      .returning();

    if (!updatedAccount) {
      throw new Error('Failed to update account');
    }

    return res.status(200).json({
      success: true,
      message: 'Account updated successfully',
      data: {
        id: updatedAccount.id,
        name: updatedAccount.name,
        type: updatedAccount.type,
        balance: Number(updatedAccount.balance),
        is_active: updatedAccount.is_active,
        created_at: updatedAccount.created_at.toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};