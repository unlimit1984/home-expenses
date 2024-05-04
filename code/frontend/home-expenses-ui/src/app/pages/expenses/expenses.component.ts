/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PredefinedTranslationsService } from '../../services/predefined-translations/predefined-translations.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
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

  public displayedMonths: string[] = [];
  public currentMonth: number;

  constructor(private predefinedTranslationsService: PredefinedTranslationsService) {}

  ngOnInit(): void {
    this.displayedMonths = this.predefinedTranslationsService.translatedMonths;
    this.currentMonth = new Date().getMonth();
  }
}
