/*
 * Author: Vladimir Vysokomornyi
 */

import { createSelector } from '@ngrx/store';
import { ExpensesState } from './expenses.reducer';
import { AppState } from '../state';

export const selectExpensesState = (state: AppState): ExpensesState => state.expenses;

export const selectExpenses = createSelector(selectExpensesState, (state: ExpensesState) =>
  [...state.expenses].sort((a, b) => Number(b.date) - Number(a.date))
);

export const selectExpensesByCat = createSelector(selectExpensesState, (state: ExpensesState) =>
  [...state.expensesByCat].sort((a, b) => a.category.localeCompare(b.category))
);

export const selectIsLoading = createSelector(selectExpensesState, (state: ExpensesState) => state.isLoading);

export const selectError = createSelector(selectExpensesState, (state: ExpensesState) => state.error);
