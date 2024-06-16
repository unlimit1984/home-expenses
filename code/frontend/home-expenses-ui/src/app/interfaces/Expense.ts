/*
 * Author: Vladimir Vysokomornyi
 */

export interface ExpenseCreateForm {
  date: string;
  category: string;
  cost: number;
  comment: string;
}

export interface ExpenseDto extends ExpenseCreateForm {
  email: string;
}
export interface ExpenseResponse extends ExpenseCreateForm {
  id: number;
}

export interface ExpenseByCategory {
  category: string;
  cost: number;
}
