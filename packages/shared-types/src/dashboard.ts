import { ApiResponse, SurvivalStatus } from './index';

export interface SummaryDashboard {
  alert_threshold: number;
  total_spending: number;
  spending_pct: number;
  total_budgeted: number;
  remaining_budget: number;
  days_left: 12;
  is_alert: boolean;
}

export interface CategoryBreakdown {
  category_id: string;
  cateogry_name: string;
  total_amount: number;
  percentage: number;
  is_alert: boolean;
}

export interface RecentTransactions {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface Insight {
  vs_last_month_percentage: number;
  daily_limit: number;
  survival_status: SurvivalStatus;
}

export interface Dashboard {
  summary: SummaryDashboard;
  category_breakdown: CategoryBreakdown[];
  recent_transactions: RecentTransactions[];
  insight: Insight;
}

export type DashboardResponse = ApiResponse<Dashboard>;
