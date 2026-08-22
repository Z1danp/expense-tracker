// add categories

import { ApiResponse } from './api';

export interface AddCategoryRequest {
  name: string;
  type: 'expense' | 'income';
  limit_amount: number;
}

export interface CurrentBudget {
  id: string;
  limit_amount: number;
  cycle_start_date: string;
}

export interface AddCategory {
  id: string;
  name: string;
  type: 'expense' | 'income';
  is_active: true;
  current_budget: CurrentBudget;
  created_at: number;
}

export type AddCategoryResponse = ApiResponse<AddCategory>;

// edit categories

export interface EditCategoryRequest {
  name: string;
  limit_amount: number;
  is_active: boolean;
}

export interface EditCategory {
  id: string;
  name: string;
  type: 'expense' | 'income';
  is_active: boolean;
  current_budget: CurrentBudget;
}
