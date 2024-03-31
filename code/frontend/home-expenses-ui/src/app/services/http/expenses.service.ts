import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timer } from 'rxjs';
import { ExpenseCreateForm } from '../../interfaces/Expense';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../config/config.service';

const expensesMock: ExpenseCreateForm[] = require('../../mock/expenses-mock.json');

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private configService: ConfigService = inject(ConfigService);
  constructor(private httpClient: HttpClient) {}

  private apiUrl = this.configService.config.API;

  public getExpenses(): Observable<ExpenseCreateForm[]> {
    // return timer(2000).pipe(map(() => expensesMock));

    // .get<{ _embedded: {expenses: Expense[]} }>('http://localhost:8080/api/expenses')

    return this.httpClient
      .get<{ _embedded: { expenses: ExpenseCreateForm[] } }>(`${this.apiUrl}/expenses`)
      .pipe(map((response) => response._embedded.expenses));
  }

  public createExpense(expenseBody: ExpenseCreateForm): Observable<ExpenseCreateForm> {
    return this.httpClient.post<ExpenseCreateForm>(`${this.apiUrl}/expenses`, expenseBody);
  }
}
