import { ExpensesState } from './expenses/expenses.reducer';
import { AuthState } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.reducer';

export interface AppState {
  expenses: ExpensesState;
  auth: AuthState;
  router: RouterStateUrl;
}
