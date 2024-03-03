/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

export const broadCastChannel = new BroadcastChannel('authentication');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private router = inject(Router);

  constructor() {
    broadCastChannel.onmessage = (event) => {
      console.log('==broadCastChannel event', event.data);
      if (event.data === 'Logout') {
        localStorage.clear();
        this.router.navigate(['/auth/signin']);
      }
    };
  }
}
