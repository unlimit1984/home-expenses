import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timer } from 'rxjs';
import { Expense } from '../../interfaces/Expense';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../config/config.service';

const expensesMock: Expense[] = require('../../mock/expenses-mock.json');

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private configService: ConfigService = inject(ConfigService);
  constructor(private httpClient: HttpClient) {}

  private apiUrl = this.configService.config.API;

  public getExpenses(): Observable<Expense[]> {
    // return timer(2000).pipe(map(() => expensesMock));

    // .get<{ _embedded: {expenses: Expense[]} }>('http://localhost:8080/api/expenses')

    return this.httpClient
      .get<{ _embedded: { expenses: Expense[] } }>(`${this.apiUrl}/expenses`)
      .pipe(map((response) => response._embedded.expenses));
  }

  public createExpense(expenseBody: Expense): Observable<Expense> {
    return this.httpClient.post<Expense>(`${this.apiUrl}/expenses`, expenseBody);
  }
}
