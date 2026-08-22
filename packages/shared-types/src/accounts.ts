import { ApiResponse, PaymentMethod } from './index';

export interface AddAccountRequest {
  name: string;
  type: PaymentMethod;
  initial_balance: number
}

export interface AddAccount {
    id: string;
    name: string;
    type: PaymentMethod;
    balance: number;
    is_active: true;
    created_at: string
}

export type AddAccountResponse = ApiResponse<AddAccount>


// Edit account

export interface EditAccountRequest {
    name: string;
    type: PaymentMethod;
    is_active: false
}

export interface EditAccount {
    id: string;
    name: string;
    type: PaymentMethod;
    balance: number;
    is_active: boolean;
    created_at: string
}

export type EditAccountResponse = ApiResponse <EditAccount>
