import { ApiResponse } from './index';

// Shared sub-types

export interface CategoryTrans {
  id: string;
  name: string;
}

export interface AccountTrans {
  id: string;
  name: string;
  current_balance: number;
}

// Add transaction request bodies

export interface AddTransaction {
  type: 'expense' | 'income';
  amount: number;
  title: string;
  category_id: string;
  account_id: string;
  date: string;
  notes: string | null;
}

export type AddSpend = AddTransaction & { type: 'expense' };
export type AddIncome = AddTransaction & { type: 'income' };

// Transaction response shape

export interface Transaction<T extends 'expense' | 'income'> {
  id: string;
  type: T;
  title: string;
  amount: number;
  fee: number;
  date: string;
  notes: string | null;
  category: CategoryTrans;
  account: AccountTrans;
  created_at: string;
}

export type Spend = Transaction<'expense'>;
export type Income = Transaction<'income'>;

export type SpendResponse = ApiResponse<Spend>;
export type IncomeResponse = ApiResponse<Income>;

// Transfer

export interface AddTransfer {
  type: 'transfer';
  amount: number;
  fee: number;
  account_id: string;
  to_account_id: string;
  title: string;
  date: string;
  notes: string | null;
}

export interface Transfer {
  id: string;
  type: 'transfer';
  title: string;
  amount: number;
  fee: number;
  date: string;
  notes: string | null;
  from_account: AccountTrans;
  to_account: AccountTrans;
  created_at: string;
}

export type TransferResponse = ApiResponse<Transfer>;
