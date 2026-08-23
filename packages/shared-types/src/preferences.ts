import { ApiErrorResponse, ApiResponse } from './api';

export interface EditPaydayRequest {
  payday_date: number;
}

export interface AlertThresholdRequest {
  alert_threshold: number;
}

export interface CyclePreview {
  start_date: string;
  end_date: string;
  days_until_reset: number;
}

export interface Preferences {
  id: string;
  name: string;
  email: string;
  payday_date: number;
  alert_threshold: number;
  cycle_preview: CyclePreview;
}

export type PreferenceResponse = ApiResponse<Preferences>;
