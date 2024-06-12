/*
 * Author: Vladimir Vysokomornyi
 */

import { Action, createReducer, on } from '@ngrx/store';
import {
  createExpense,
  createExpensesError,
  createExpensesResult,
  getExpenses,
  getExpensesByCat,
  getExpensesByCategoryResult,
  getExpensesError,
  getExpensesResult
} from './expenses.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ExpenseByCategory, ExpenseResponse } from '../../interfaces/Expense';

export interface ExpensesState {
  expenses: ExpenseResponse[];
  expensesByCat: ExpenseByCategory[];
  isLoading: boolean;
  error: HttpErrorResponse;
}

const expensesInitialState: ExpensesState = {
  expenses: [],
  expensesByCat: [],
  isLoading: null,
  error: null
};

const _expensesReducer = createReducer(
  expensesInitialState,

  on(getExpenses, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(getExpensesResult, (state, action) => ({
    ...state,
    expenses: action.expenses,
    isLoading: false
  })),

  on(getExpensesByCat, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(getExpensesByCategoryResult, (state, action) => ({
    ...state,
    expensesByCat: action.expensesByCat,
    isLoading: false
  })),
  on(getExpensesError, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
  })),

  on(createExpense, (state) => ({
    ...state,
    isLoading: true
  })),
  on(createExpensesResult, (state) => ({
    ...state,
    isLoading: false
  })),
  on(createExpensesError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);

export function expensesReducer(state: ExpensesState, action: Action) {
  return _expensesReducer(state, action);
}
