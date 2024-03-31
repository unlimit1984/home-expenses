/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseDto, ExpenseResponse } from '../../interfaces/Expense';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesApiV2Service {
  constructor(private httpClient: HttpClient, private configService: ConfigService) {}

  public getExpenses(): Observable<ExpenseResponse[]> {
    return this.httpClient.get<ExpenseResponse[]>(`${this.configService.config.API}/expense/findByUser`);
  }

  public createExpense(expenseBody: ExpenseDto): Observable<any> {
    return this.httpClient.post<any>(`${this.configService.config.API}/expense/create`, expenseBody);
  }
}
