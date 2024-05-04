/*
 * Author: Vladimir Vysokomornyi
 */

import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PredefinedTranslationsService {
  private readonly _months: string[] = [
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

  private _displayedMonths: { [language: string]: string[] } = {};
  private translate: TranslateService = inject(TranslateService);

  get translatedMonths(): string[] {
    if (!this._displayedMonths[this.translate.currentLang]) {
      this._displayedMonths = {
        ...this._displayedMonths,
        [this.translate.currentLang]: []
      };
      for (const month of this._months) {
        const translatedMonth: string = this.translate.instant(`month.${month}`);
        this._displayedMonths[this.translate.currentLang].push(translatedMonth);
      }
    }
    return this._displayedMonths[this.translate.currentLang];
  }
}
