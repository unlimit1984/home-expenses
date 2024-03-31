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
import { ExpensesApiV2Service } from '../../services/http/expenses-api-v2.service';
import { TokenAuthService } from '../../services/token-vault/token-auth.service';
import { ExpenseDto } from '../../interfaces/Expense';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ExpensesEffects {
  constructor(
    private actions$: Actions,
    private expensesV2Service: ExpensesApiV2Service,
    private tokenAuthService: TokenAuthService
  ) {}

  getExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExpenses),
      switchMap((action) => {
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
        const email = this.tokenAuthService.getEmail();
        if (email) {
          const expense: ExpenseDto = { ...action.expense, email };
          return this.expensesV2Service.createExpense(expense).pipe(
            map((response) => createExpensesResult({ expense: response })),
            catchError((error) => of(createExpensesError({ error })))
          );
        }
        return of(
          createExpensesError({
            error: new HttpErrorResponse({
              error: 'Email is skipped',
              status: 400
            })
          })
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
