/*
 * Author: Vladimir Vysokomornyi
 */

import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  Inject,
  inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PredefinedTranslationsService } from '../../services/predefined-translations/predefined-translations.service';
import { ExpenseResponse } from '../../interfaces/Expense';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDataDatasourceTemplate } from '../../shared/templates/mat-data-datasource.template';
import { Store } from '@ngrx/store';
import { getExpenses } from '../../store/expenses/expenses.actions';
import { map, Observable, of, Subject, switchMap, takeUntil, timer } from 'rxjs';
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
export class ExpensesComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, AfterViewChecked {
  private unsubscribe$ = new Subject<void>();

  public form: FormGroup;

  readonly months: string[] = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ];

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
    // this.isLoading$ = timer(3000).pipe(switchMap((_) => this.store.select(selectIsLoading)));
    this.expenses$.pipe(takeUntil(this.unsubscribe$)).subscribe((expenses) => {
      console.log('subscribe', expenses.length);
      this.dataSource = new MatTableDataSource(expenses);
      this.dataSource.sort = this.sort;
    });

    // this.dataSource$ = this.expenses$.pipe(
    //   map((entries) => {
    //     const ds = new MatTableDataSource(entries);
    //     return ds;
    //   })
    // );

    // this.expenses$.subscribe(entries => {
    //   const ds = new MatTableDataSource(entries);
    //   this.dataSource$ = of(ds);
    //   this.sort?.sortChange.subscribe(() => {
    //     ds.sort = this.sort;
    //   });
    // });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit()');
    // this.dataSource.sort = this.sort;
    // this.dataSource$?.subscribe((dataSource) => {
    //   setTimeout(() => {
    //     dataSource.sort = this.sort;
    //   });
    // });
    // this.dataSource$ = this.expenses$.pipe(
    //   map((entries) => {
    //     const ds = new MatTableDataSource(entries);
    //     // if (this.sort) {
    //     //   console.log('===sort in AfterViewInit');
    //     //   // ds.sort = this.sort;
    //     // }
    //     this.sort?.sortChange.subscribe(() => {
    //       console.log('===sort in AfterViewInit');
    //       ds.sort = this.sort;
    //     });
    //
    //     return ds;
    //   })
    // );
  }

  ngAfterContentInit(): void {
    // if (this.sort) {
    //   console.log('===sort in AfterContentInit');
    // }
    // this.dataSource$ = this.expenses$.pipe(
    //   map((entries) => {
    //     const ds = new MatTableDataSource(entries);
    //     // ds.data = entries;
    //     if (this.sort) {
    //       console.log('===sort in AfterViewInit');
    //       ds.sort = this.sort;
    //     }
    //     return ds;
    //   })
    // );
  }

  ngAfterViewChecked(): void {
    // this.dataSource$ = this.expenses$.pipe(
    //   map((entries) => {
    //     const ds = new MatTableDataSource(entries);
    //     if (this.sort) {
    //       ds.sort = this.sort;
    //       console.log('===sort in ngAfterViewChecked');
    //     }
    //     return ds;
    //   })
    // );
  }

  displayedColumns = ['date', 'category', 'cost', 'comment'];
  // data: ExpenseCreateForm[] = [
  //   { date: '2024-04-23', category: 'food', cost: 15, comment: 'My comment' },
  //   { date: '2024-04-24', category: 'food', cost: 39, comment: 'My comment' },
  //   { date: '2024-04-25', category: 'food', cost: 39, comment: 'My comment' },
  //   { date: '2024-04-26', category: 'food', cost: 20, comment: 'My comment' },
  //   { date: '2024-04-27', category: 'food', cost: 39, comment: 'My comment' },
  //   { date: '2024-04-28', category: 'food', cost: 49, comment: 'My comment' }
  // ];
  // dataSource = new MatTableDataSource(this.data);
  // dataSource = new MatDataDatasourceTemplate<ExpenseCreateForm>(this.data);

  // getTotalCost() {
  //   return this.data.map((t) => t.cost).reduce((acc, value) => acc + value, 0);
  // }
  getTotalCost(expenses: ExpenseResponse[]) {
    return expenses.map((t) => t.cost).reduce((acc, value) => acc + value, 0);
  }

  public getFormattedDate(timestamp: string): string {
    return formatDate(new Date(Number(timestamp)), 'YYYY-MM-dd HH:mm:ss', this.locale);
  }
}
