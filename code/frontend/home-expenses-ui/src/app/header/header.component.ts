/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { signout } from '../store/auth/auth.actions';
import { ConfigService } from '../services/config/config.service';
import { TokenAuthService } from '../services/token-vault/token-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public tokenAuthService = inject(TokenAuthService);

  constructor(private store: Store, public configService: ConfigService) {}

  signout() {
    this.store.dispatch(signout());
  }
}
