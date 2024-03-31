import { createAction, props } from '@ngrx/store';
import { ExpenseCreateForm, ExpenseResponse } from '../../interfaces/Expense';
import { HttpErrorResponse } from '@angular/common/http';

// export const getExpenses = createAction('[Expenses] Get expenses', props<{ isMockedData: boolean }>());
export const getExpenses = createAction('[Expenses] Get expenses');

export const getExpensesResult = createAction(
  '[Expenses] Get expenses result',
  props<{ expenses: ExpenseResponse[] }>()
);

export const getExpensesError = createAction('[Expenses] Get expenses error', props<{ error: HttpErrorResponse }>());

export const createExpense = createAction('[Expenses] Create expense', props<{ expense: ExpenseCreateForm }>());

export const createExpensesResult = createAction('[Expenses] Create expense result', props<{ expense: any }>());
export const createExpensesError = createAction(
  '[Expenses] Create expense error',
  props<{ error: HttpErrorResponse }>()
);

export const noOpAction = createAction('[Expenses] No Operation Action');
