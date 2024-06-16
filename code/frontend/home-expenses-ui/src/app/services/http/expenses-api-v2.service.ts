/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timer } from 'rxjs';
import { ExpenseByCategory, ExpenseDto, ExpenseResponse } from '../../interfaces/Expense';
import { ConfigService } from '../config/config.service';
const expensesByCatMock: ExpenseByCategory[] = require('../../mock/expenses-by-cat-mock.json');
const expensesByCatMock2: ExpenseByCategory[] = require('../../mock/expenses-by-cat-mock-2.json');
@Injectable({
  providedIn: 'root'
})
export class ExpensesApiV2Service {
  constructor(private httpClient: HttpClient, private configService: ConfigService) {}

  public getExpenses(): Observable<ExpenseResponse[]> {
    return this.httpClient.get<ExpenseResponse[]>(`${this.configService.config.API}/expense/findMine`);
  }

  public createExpense(expenseBody: ExpenseDto): Observable<any> {
    return this.httpClient.post<any>(`${this.configService.config.API}/expense/create`, expenseBody);
  }

  public getExpensesByCatWithMonthAndYear(month: number, year: number): Observable<ExpenseByCategory[]> {
    console.log('Applying filter', month, year);
    if (month == 5 && year == 2024) {
      return timer(2000).pipe(map(() => expensesByCatMock));
    } else {
      return timer(2000).pipe(map(() => expensesByCatMock2));
    }
  }
}
