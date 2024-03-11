/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../../interfaces/Expense';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesApiV2Service {
  constructor(private httpClient: HttpClient, private configService: ConfigService) {}

  public getExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(`${this.configService.config.API}/expense/findByUser`);
  }

  public createExpense(expenseBody: Expense): Observable<Expense> {
    return this.httpClient.post<Expense>(`${this.configService.config.API}/expense/create`, expenseBody);
  }
}
