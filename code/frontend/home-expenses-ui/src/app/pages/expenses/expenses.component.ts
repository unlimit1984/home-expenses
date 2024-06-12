/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, Inject, inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PredefinedTranslationsService } from '../../services/predefined-translations/predefined-translations.service';
import { ExpenseByCategory, ExpenseResponse } from '../../interfaces/Expense';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { getExpenses, getExpensesByCat } from '../../store/expenses/expenses.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectExpenses, selectExpensesByCat, selectIsLoading } from '../../store/expenses/expenses.selectors';
import { formatDate } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';

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
  public expensesByCat$: Observable<ExpenseByCategory[]>;
  // public expenses: ExpenseResponse[];
  public isLoading$: Observable<boolean>;

  public currentMonth: number;
  public displayedMonths: string[] = [];

  public currentYear: number;
  public displayedYears: number[] = [];
  // public dataSource: MatTableDataSource<ExpenseResponse>;
  public dataSource: MatTableDataSource<ExpenseByCategory>;

  constructor(
    private predefinedTranslationsService: PredefinedTranslationsService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(getExpenses());
    const currentDate: Date = new Date();

    this.currentMonth = currentDate.getMonth();
    this.displayedMonths = this.predefinedTranslationsService.translatedMonths;

    this.currentYear = currentDate.getFullYear();
    this.displayedYears = Array.from({ length: 10 }, (_, i) => this.currentYear - 9 + i);

    this.store.dispatch(getExpensesByCat({ month: this.currentMonth, year: this.currentYear }));

    // this.expenses$ = this.store.select(selectExpenses);
    // this.isLoading$ = this.store.select(selectIsLoading);
    // this.expenses$.pipe(takeUntil(this.unsubscribe$)).subscribe((expenses) => {
    //   this.dataSource = new MatTableDataSource(expenses);
    //   this.dataSource.sort = this.sort;
    // });
    this.expensesByCat$ = this.store.select(selectExpensesByCat);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.expensesByCat$.pipe(takeUntil(this.unsubscribe$)).subscribe((expenses) => {
      this.dataSource = new MatTableDataSource(expenses);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['category', 'cost'];

  // getTotalCost(expenses: ExpenseResponse[]) {
  //   return expenses.map((t) => t.cost).reduce((acc, value) => acc + value, 0);
  // }
  public getTotalCost(expenses: ExpenseByCategory[]) {
    return expenses.map((t) => t.cost).reduce((acc, value) => acc + value, 0);
  }

  public getFormattedDate(timestamp: string): string {
    return formatDate(new Date(Number(timestamp)), 'YYYY-MM-dd HH:mm:ss', this.locale);
  }

  public applyFilter() {
    this.store.dispatch(getExpensesByCat({ month: this.currentMonth, year: this.currentYear }));
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true
      }
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end'
      // }
    }
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40
    ];

    this.chart?.update();
  }
}
