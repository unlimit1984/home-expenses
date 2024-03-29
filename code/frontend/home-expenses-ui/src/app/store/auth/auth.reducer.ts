/*
 * Author: Vladimir Vysokomornyi
 */

import { Action, createReducer, on } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import { signin, signinFailed, signinSuccess, signout, signoutFailed, signoutSuccess } from './auth.actions';

export interface AuthState {
  isLoading: boolean;
  error: HttpErrorResponse;
}

const authInitialState: AuthState = {
  isLoading: false,
  error: null
};

const _authReducer = createReducer(
  authInitialState,

  on(signin, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(signinSuccess, (state, action) => ({
    ...state,
    isLoading: false
  })),
  on(signinFailed, (state, action) => ({
    ...state,
    isLoading: false
  })),

  on(signout, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(signoutSuccess, (state, action) => ({
    ...state,
    isLoading: false
  })),
  on(signoutFailed, (state, action) => ({
    ...state,
    isLoading: false
  }))
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
