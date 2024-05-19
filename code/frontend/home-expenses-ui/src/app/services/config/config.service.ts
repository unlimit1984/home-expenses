/*
 * Author: Vladimir Vysokomornyi
 */

import { inject, Injectable } from '@angular/core';
import { IConfig } from '../../shared/interfaces/config';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { refreshTokensTick } from '../../store/auth/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../shared/enums/language';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private translateService = inject(TranslateService);
  private _config: IConfig = null;
  get config() {
    return { ...this._config };
  }
  constructor(private http: HttpClient, private store: Store) {
    console.log('==constructor ConfigService');
  }

  private _initialize(config: IConfig) {
    if (!this._config) {
      console.log('==initialize ConfigService');
      this._config = config;
    } else {
      console.warn('Config was already initialized earlier. Should be initialized just once');
    }
  }

  public loadConfig(): Observable<IConfig> {
    console.log('==loadConfig');
    return this.http.get('./assets/config/config.json').pipe(
      tap((response: IConfig) => {
        this._initialize(response);
        this.store.dispatch(refreshTokensTick());
      }),
      catchError((err) => {
        console.warn(`Can't load config`);
        throw err;
      })
    );
  }

  public getSelectedLanguage(): string {
    const lang: string = localStorage.getItem('selectedLanguage');
    if (lang && Object.keys(Language).includes(lang)) {
      return lang;
    }

    localStorage.setItem('selectedLanguage', Language.en);
    return Language.en;
  }

  public setSelectedLanguage(lang: string): void {
    if (lang && Object.keys(Language).includes(lang)) {
      this.translateService.use(lang);
      localStorage.setItem('selectedLanguage', Language[lang]);
    }
  }
}
