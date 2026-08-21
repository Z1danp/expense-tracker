export interface EntityRef {
  id: string;
  name: string;
}

export interface EntityRefWithBalance extends EntityRef {
  current_balance: number;
}
