/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@angular/core';
import { IConfig } from '../../shared/interfaces/config';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { refreshTokensTick } from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
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
}
