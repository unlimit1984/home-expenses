/*
 * Author: Vladimir Vysokomornyi
 */

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { Credentials } from '../../shared/interfaces/credentials';
import { Tokens } from '../../interfaces/tokens';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private configService: ConfigService = inject(ConfigService);

  constructor(private httpClient: HttpClient) {
    console.log('==constructor AuthApiService, api', this.configService.config.API);
  }

  public signupStart(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(`${this.configService.config.API}/auth/signup-start`, credentials);
  }
  public signupFinish(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(`${this.configService.config.API}/auth/signup-finish`, credentials);
  }

  public signin(credentials: Credentials): Observable<Tokens> {
    return this.httpClient.post<Tokens>(`${this.configService.config.API}/auth/signin`, credentials);
  }

  public signout(): Observable<boolean> {
    // return timer(2000).pipe(map(() => true));
    return this.httpClient.get<boolean>(`${this.configService.config.API}/auth/signout`);
  }

  public refreshTokens(): Observable<Tokens> {
    return this.httpClient.post<Tokens>(`${this.configService.config.API}/auth/refresh-token`, null);
  }
}
