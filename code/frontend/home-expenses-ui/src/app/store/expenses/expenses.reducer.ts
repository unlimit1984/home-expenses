/*
 * Author: Vladimir Vysokomornyi
 */

import { Action, createReducer, on } from '@ngrx/store';
import {
  createExpense,
  createExpensesError,
  createExpensesResult,
  getExpenses,
  getExpensesError,
  getExpensesResult
} from './expenses.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Expense } from '../../interfaces/Expense';

export interface ExpensesState {
  expenses: Expense[];
  isLoading: boolean;
  error: HttpErrorResponse;
  // isMockedData: boolean;
}

const expensesInitialState: ExpensesState = {
  expenses: [],
  isLoading: false,
  error: null
  // isMockedData: null
};

const _expensesReducer = createReducer(
  expensesInitialState,

  on(getExpenses, (state, action) => ({
    ...state,
    isLoading: true
    // isMockedData: action.isMockedData
  })),
  on(getExpensesResult, (state, action) => ({
    ...state,
    expenses: action.expenses,
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
