/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createExpense,
  createExpensesError,
  createExpensesResult,
  getExpenses,
  getExpensesError,
  getExpensesResult
} from './expenses.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ExpensesApiV2Service } from '../../services/http/expenses-api-v2.service';

@Injectable()
export class ExpensesEffects {
  constructor(private actions$: Actions, private expensesV2Service: ExpensesApiV2Service, private store: Store) {}

  getExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExpenses),
      switchMap((action) => {
        // return this.expensesService.getExpenses().pipe(
        return this.expensesV2Service.getExpenses().pipe(
          map((expenses) => getExpensesResult({ expenses: expenses })),
          catchError((error) => of(getExpensesError({ error })))
        );
      })
    )
  );

  createExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createExpense),
      switchMap((action) => {
        // return this.expensesService.createExpense(action.expense).pipe(
        return this.expensesV2Service.createExpense(action.expense).pipe(
          map((response) => createExpensesResult({ expense: response })),
          catchError((error) => of(createExpensesError({ error })))
        );
      })
    )
  );

  createExpensesResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createExpensesResult),
      // withLatestFrom(this.store.select(selectIsMockedData)),
      // switchMap(([, isMockedData]) => {
      switchMap(() => {
        return of(getExpenses());
      })
    )
  );
}
