/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, Inject, inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PredefinedTranslationsService } from '../../services/predefined-translations/predefined-translations.service';
import { ExpenseResponse } from '../../interfaces/Expense';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { getExpenses } from '../../store/expenses/expenses.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectExpenses, selectIsLoading } from '../../store/expenses/expenses.selectors';
import { formatDate } from '@angular/common';

export interface Transaction {
  date: string;
  category: string;
  item: string;
  cost: number;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public form: FormGroup;

  private store = inject(Store);
  public expenses$: Observable<ExpenseResponse[]>;
  public expenses: ExpenseResponse[];
  public isLoading$: Observable<boolean>;

  public currentMonth: number;
  public displayedMonths: string[] = [];

  public currentYear: number;
  public displayedYears: number[] = [];
  public dataSource: MatTableDataSource<ExpenseResponse>;

  constructor(
    private predefinedTranslationsService: PredefinedTranslationsService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getExpenses());
    const currentDate: Date = new Date();

    this.currentMonth = currentDate.getMonth();
    this.displayedMonths = this.predefinedTranslationsService.translatedMonths;

    this.currentYear = currentDate.getFullYear();
    this.displayedYears = Array.from({ length: 10 }, (_, i) => this.currentYear - 9 + i);

    this.expenses$ = this.store.select(selectExpenses);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.expenses$.pipe(takeUntil(this.unsubscribe$)).subscribe((expenses) => {
      this.dataSource = new MatTableDataSource(expenses);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['date', 'category', 'cost', 'comment'];

  getTotalCost(expenses: ExpenseResponse[]) {
    return expenses.map((t) => t.cost).reduce((acc, value) => acc + value, 0);
  }

  public getFormattedDate(timestamp: string): string {
    return formatDate(new Date(Number(timestamp)), 'YYYY-MM-dd HH:mm:ss', this.locale);
  }
}
