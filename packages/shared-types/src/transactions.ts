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

// Spend Error Handling 422 Unprocessable Entity

export interface SpendError {
  field: string;
  message: string
}

export interface SpendError422 {

}



