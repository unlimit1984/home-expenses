/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, Inject, inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PredefinedTranslationsService } from '../../services/predefined-translations/predefined-translations.service';
import { ExpenseByCategory } from '../../interfaces/Expense';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { getExpensesByCat } from '../../store/expenses/expenses.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectExpensesByCat, selectIsLoading } from '../../store/expenses/expenses.selectors';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';

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

  public currentMonth: number;
  public displayedMonths: string[] = [];

  public currentYear: number;
  public displayedYears: number[] = [];

  private expensesByCat$: Observable<ExpenseByCategory[]>;
  public isLoading$: Observable<boolean>;
  public dataSource: MatTableDataSource<ExpenseByCategory>;

  private chartLabels: string[] = [];
  private chartData: number[] = [];
  public barChartType = 'bar' as const;
  public barChartData: ChartData<'bar'>;
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
  // public barChartData: ChartData<'bar'> = {
  //   labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  //   ]
  // };

  // public barChartData: ChartData<'bar'> = {
  //   labels: ['food', 'housing', 'transportation'],
  //   datasets: [{ data: [957, 670, 70], label: 'Fee' }]
  // };

  constructor(
    private predefinedTranslationsService: PredefinedTranslationsService,
    @Inject(LOCALE_ID) private locale: string,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(getExpenses());
    const currentDate: Date = new Date();

    this.currentMonth = currentDate.getMonth();
    this.displayedMonths = this.predefinedTranslationsService.translatedMonths;

    this.currentYear = currentDate.getFullYear();
    this.displayedYears = Array.from({ length: 10 }, (_, i) => this.currentYear - 9 + i);

    this.store.dispatch(getExpensesByCat({ month: this.currentMonth, year: this.currentYear }));

    this.isLoading$ = this.store.select(selectIsLoading);
    this.expensesByCat$ = this.store.select(selectExpensesByCat);
    this.expensesByCat$.pipe(takeUntil(this.unsubscribe$)).subscribe((expenses) => {
      this.dataSource = new MatTableDataSource(expenses);
      this.dataSource.sort = this.sort;

      this.chartLabels = [...expenses.map((expense) => expense.category)] || [];
      this.chartData = [...expenses.map((expenses) => expenses.cost)] || [];
      this.barChartData = {
        labels: this.chartLabels,
        datasets: [{ data: this.chartData, label: this.translate.instant('cost') }]
      };
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['category', 'cost'];

  public getTotalCost(expenses: ExpenseByCategory[]) {
    return expenses.map((t) => t.cost).reduce((acc, value) => acc + value, 0);
  }

  public applyFilter() {
    this.store.dispatch(getExpensesByCat({ month: this.currentMonth, year: this.currentYear }));
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  // events
  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    // console.log(event, active);
  }
}
