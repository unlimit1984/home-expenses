import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { Credentials } from '../../shared/interfaces/credentials';
import { Tokens } from '../../interfaces/tokens';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private configService: ConfigService = inject(ConfigService);

  constructor(private httpClient: HttpClient) {}

  private apiUrl = this.configService.config.API;

  public signupStart(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/auth/signup-start`, credentials);
  }
  public signupFinish(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/auth/signup-finish`, credentials);
  }

  public signin(credentials: Credentials): Observable<Tokens> {
    return this.httpClient.post<Tokens>(`${this.apiUrl}/auth/signin`, credentials);
  }

  public signout(): Observable<boolean> {
    // return timer(2000).pipe(map(() => true));
    return this.httpClient.get<boolean>(`${this.apiUrl}/auth/signout`);
  }

  public refreshTokens(): Observable<Tokens> {
    return this.httpClient.post<Tokens>(`${this.apiUrl}/auth/refresh-token`, null);
  }
}
