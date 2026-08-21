// spend
import { ApiResponse } from "./index";

export interface AddSpend {
  type: 'expense';
  amount: number;
  title: string;
  category_id: string;
  account_id: string;
  date: string;
  notes?: string;
}

export interface CategoryTrans {
  id: string;
  name: string;
}

export interface AccountTrans {
  id: string;
  name: string;
  current_balance: number;
}

export interface Spend {
  id: string;
  type: 'expense';
  title: string;
  amount: number;
  fee: number;
  date: string;
  notes?: string;
  category: CategoryTrans;
  account: AccountTrans;
  created_at: string;
}

export type SpendResponse = ApiResponse<Spend>;

// income

export interface AddIncome {
  type: 'income';
  amount: number;
  title: string;
  category_id: string;
  account_id: string;
  date: string;
  notes: string | null;
}

export interface Income {
  id: string;
  type: 'income';
  title: string;
  amount: number;
  fee: number;
  date: string;
  notes: string | null;
  category: CategoryTrans;
  account: AccountTrans;
  created_at: string;
}

export type IncomeResponse = ApiResponse<Income>;

