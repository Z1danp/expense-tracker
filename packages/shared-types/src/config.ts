import { ApiResponse, PaymentMethod } from './index';

export interface CycleProgress {
  current_day: number;
  total_days: number;
}

export interface Contract {
  signer_name: string;
  cycle_progress: CycleProgress;
}

export interface CycleProtocol {
  payday_date: number;
  current_cycle_start: string;
  current_cycle_end: string;
  days_until_reset: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  type: 'expense' | 'income';
  limit_amount: number | null;
  is_active: boolean;
}

export interface BudgetMatrix {
  total_budget_limit: number;
  categories: BudgetCategory[];
}

export interface Account {
  id: string;
  name: string;
  type: PaymentMethod;
  balance: number;
  is_active: boolean;
}

export interface Preference {
  alert_threshold: number;
}

export interface Config {
  contract: Contract;
  cycle_protocol: CycleProtocol;
  budget_matrix: BudgetMatrix;
  accounts: Account[];
  preferences: Preference;
}

export type ConfigResponse = ApiResponse<Config>;
