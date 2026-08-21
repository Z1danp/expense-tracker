import {
  AccountTrans,
  ApiResponse,
  CategoryTrans,
  PeriodType,
  TransactionType,
} from './index';

export interface SummaryLog {
  period_type: PeriodType;
  total_count: number;
  total_amount: number;
}

export interface AccountLog {
  id: string;
  name: string;
}

export interface ItemLog {
  id: string;
  title: string;
  type: TransactionType;
  amount: number;
  category: CategoryTrans;
  account: AccountLog;
  created_at: string;
}

export interface Log {
  summary: SummaryLog;
  items: ItemLog[];
}

export type LogResponse = ApiResponse<Log>;
