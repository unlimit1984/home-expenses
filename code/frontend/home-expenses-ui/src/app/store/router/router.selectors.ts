/*
 * Author: Vladimir Vysokomornyi
 */

import { RouterStateUrl } from './router.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

// Select the URL from the router state
export const selectRouterUrl = createSelector(selectRouterState, (routerState) =>
  routerState?.state?.url ? routerState.state.url : null
);
