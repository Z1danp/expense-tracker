import { ApiResponse } from "./index";

export interface Period {
  type: 'month' | 'year';
  label: string;
  month: number | null;
  year: number;
}

export interface SpendingTrend {
  total_spent: number;
  vs_last_period_percentage: number;
  trend_direction: 'up' | 'down';
}

export interface CategoryBreakdown {
  category_id: string;
  category_name: string;
  current_amount: number;
  previous_amount: number;
  is_overbudget: boolean;
}

export interface BestCategory {
  category_id: string;
  name: string;
  percentage_diff: number;
}

export interface NeedAttention {
  category_id: string;
  name: string;
  percentage_diff: number;
}

export interface Highlights {
  best_category: BestCategory;
  need_attention: NeedAttention;
}

export interface Report {
    period: Period;
    spending_trend: SpendingTrend;
    category_breakdown: CategoryBreakdown[];
    highlights: Highlights;
}

export type ReportResponse = ApiResponse<Report>