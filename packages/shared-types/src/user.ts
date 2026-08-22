// Edit user

import { ApiResponse } from "./index";

export interface EditInputUser {
  name: string;
  current_password: string;
  new_password: string;
}

export interface EditUser {
  id: string;
  name: string;
  email: string;
  payday_date: number;
  alert_threshold: number;
  created_at: string;
}

export type EditUserResponse = ApiResponse<EditUser>

// Delete user

export interface DeleteInputUser {
    password: string
}

