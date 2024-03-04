/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenAuthService } from './services/token-vault/token-auth.service';

export const broadCastChannel = new BroadcastChannel('authentication');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private router = inject(Router);
  private tokenAuthService = inject(TokenAuthService);

  constructor() {
    broadCastChannel.onmessage = (event) => {
      console.log('==broadCastChannel event', event.data);
      if (event.data === 'Logout') {
        this.tokenAuthService.clearAllTokens();
        this.router.navigate(['/auth/signin']);
      }
    };
  }
}
