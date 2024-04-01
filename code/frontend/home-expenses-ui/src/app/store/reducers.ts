import { expensesReducer } from './expenses/expenses.reducer';
import { authReducer } from './auth/auth.reducer';
import { routerReducer } from '@ngrx/router-store';

export const reducers = {
  expenses: expensesReducer,
  auth: authReducer,
  router: routerReducer
};
