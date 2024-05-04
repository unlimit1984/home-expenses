/*
 * Author: Vladimir Vysokomornyi
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, fromEvent, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import {
  noOpAction,
  refreshTokensFailed,
  refreshTokensSuccess,
  refreshTokensTick,
  signin,
  signinFailed,
  signinSuccess,
  signout,
  signoutFailed,
  signoutSuccess,
  signupFinish,
  signupFinishFailure,
  signupFinishSuccess,
  signupStart,
  signupStartFailure,
  signupStartSuccess
} from './auth.actions';
import { AuthApiService } from '../../services/http/auth-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TokenAuthService } from '../../services/token-vault/token-auth.service';
import { BCCMessageType } from '../../broadcast-channel/broadcast-channel';
import { BroadcastService } from '../../services/broadcast-channel/broadcast.service';
import { selectRouterUrl } from '../router/router.selectors';

@Injectable()
export class AuthEffects implements OnDestroy {
  private refreshTokensTimer;

  private tokenAuthService = inject(TokenAuthService);

  constructor(
    private actions$: Actions,
    private store: Store,
    private authService: AuthApiService,
    private router: Router,
    private broadcastService: BroadcastService
  ) {}

  signupStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupStart),
      switchMap((action) => {
        return this.authService.signupStart(action.credentials).pipe(
          map(() => signupStartSuccess()),
          catchError((errorResponse: HttpErrorResponse) => of(signupStartFailure(errorResponse)))
        );
      })
    )
  );

  signupStartSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupStartSuccess),
        tap(() => {
          this.router.navigate(['/auth/signup-finish']);
        })
      ),
    { dispatch: false }
  );

  signupStartFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupStartFailure),
        tap(() => {
          this.router.navigate(['/400']);
        })
      ),
    { dispatch: false }
  );

  signupFinish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupFinish),
      switchMap((action) => {
        return this.authService.signupFinish(action.credentials).pipe(
          map(() => signupFinishSuccess()),
          catchError((errorResponse: HttpErrorResponse) => of(signupFinishFailure(errorResponse)))
        );
      })
    )
  );

  signupFinishSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupFinishSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  signupFinishFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupFinishFailure),
        tap(() => {
          this.router.navigate(['/400']);
        })
      ),
    { dispatch: false }
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signin),
      switchMap((action) =>
        this.authService.signin(action.credentials).pipe(
          map((tokens) => signinSuccess({ tokens })),
          catchError((errorResponse: HttpErrorResponse) => of(signinFailed(errorResponse)))
        )
      )
    )
  );

  signinSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signinSuccess),
        tap((action) => {
          if (
            action.tokens.access_token &&
            action.tokens.refresh_token &&
            action.tokens.access_token.length &&
            action.tokens.refresh_token.length
          ) {
            this.tokenAuthService.saveAccessToken(action.tokens.access_token);
            this.tokenAuthService.saveRefreshToken(action.tokens.refresh_token);
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/401']);
          }
        })
      ),
    { dispatch: false }
  );

  signinFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signinFailed),
        tap(() => {
          this.router.navigate(['/401']);
        })
      ),
    { dispatch: false }
  );

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signout),
      switchMap(() => {
        this.tokenAuthService.clearRefreshToken();
        return this.authService.signout().pipe(
          map((isLogouted) => {
            if (isLogouted) {
              return signoutSuccess();
            }
            return signoutFailed({ message: `Can't signout`, status: 400 });
          }),
          catchError((errorResponse: HttpErrorResponse) => of(signoutFailed(errorResponse)))
        );
      })
    )
  );

  signoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signoutSuccess),
        tap(() => {
          this.tokenAuthService.clearAllTokens();
          this.broadcastService.sendMessage(BCCMessageType.Logout);
          this.router.navigate(['/auth/signin']);
        })
      ),
    { dispatch: false }
  );

  signoutFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signoutFailed),
        tap(() => {
          // TODO Create toast with warning
          // https://github.com/users/home-expenses-github-username/projects/2/views/1?pane=issue&itemId=30461527
        })
      ),
    { dispatch: false }
  );

  refreshTokensTick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshTokensTick),
      withLatestFrom(this.store.select(selectRouterUrl)),
      switchMap(([action, url]) => {
        if (this.refreshTokensTimer) {
          clearTimeout(this.refreshTokensTimer);
        }

        const setTimerForRefreshTokens = () => {
          this.refreshTokensTimer = setTimeout(() => {
            this.store.dispatch(refreshTokensTick());
          }, 5 * 60 * 1000);
        };
        if (this.tokenAuthService.isValidRefreshToken()) {
          return this.authService.refreshTokens().pipe(
            tap((value) => {
              setTimerForRefreshTokens();
            }),
            map((tokens) => {
              return refreshTokensSuccess({ tokens });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              setTimerForRefreshTokens();
              return of(refreshTokensFailed(errorResponse));
            })
          );
        } else {
          if (url && !url.includes('/auth/')) {
            this.router.navigate(['/auth/signin']);
          }
          setTimerForRefreshTokens();
          return of(noOpAction());
        }
      })
    )
  );

  refreshTokensSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(refreshTokensSuccess),
        tap((action) => {
          if (
            action.tokens.access_token &&
            action.tokens.refresh_token &&
            action.tokens.access_token.length &&
            action.tokens.refresh_token.length
          ) {
            this.tokenAuthService.saveAccessToken(action.tokens.access_token);
            this.tokenAuthService.saveRefreshToken(action.tokens.refresh_token);
          }
        })
      ),
    { dispatch: false }
  );

  // TODO: What is it? Check
  storageEvent$ = createEffect(() =>
    fromEvent<StorageEvent>(window, 'storage').pipe(
      tap((value) => {
        // console.log('storageEvent$ value', value);
      })
    )
  );

  ngOnDestroy(): void {
    console.log('AuthEffects OnDestroy ');
    if (this.refreshTokensTimer) {
      clearInterval(this.refreshTokensTimer);
    }
  }
}
