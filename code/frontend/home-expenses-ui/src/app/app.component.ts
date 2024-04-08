/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from './services/config/config.service';
import { LayoutVersion } from './shared/interfaces/layout.version';
import { TokenAuthService } from './services/token-vault/token-auth.service';
import { Store } from '@ngrx/store';
import { signout } from './store/auth/auth.actions';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  protected readonly layoutVersion: LayoutVersion;
  protected readonly LayoutVersion = LayoutVersion;
  isSidenavCollapsed = true;
  collapsedWidth = 64; // Adjust as needed
  expandedWidth = 200; // Adjust as needed
  isMobile: boolean = false;

  public configService = inject(ConfigService);

  private syncTabsInterval: string | number | NodeJS.Timeout;
  private autoReloadTimer: string | number | NodeJS.Timeout;
  public timeLeft = 3;
  public isAppAvailable = false;

  public tokenAuthService = inject(TokenAuthService);
  public translateService = inject(TranslateService);

  constructor(private store: Store, private breakpointObserver: BreakpointObserver) {
    this.layoutVersion = this.configService.config.featureFlags.layoutVersion;

    if (this.configService.config.featureFlags.multiTabMode) {
      this.removeOldAgeTab();
      this.makeAppCurrentOrBlockWithReloadTimer();
    }

    this.translateService.use(this.configService.getSelectedLanguage());
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  signout() {
    this.store.dispatch(signout());
  }

  private removeOldAgeTab() {
    const dateAsString: string = localStorage.getItem('tab');
    if (dateAsString && dateAsString.length > 0) {
      if (Number(dateAsString) < Date.now() - 2000) {
        console.log('Old tab found, will be deleted from localStorage');
        localStorage.removeItem('tab');
      } else {
        localStorage.setItem('tab', Date.now().toString());
      }
    }
  }

  private makeAppCurrentOrBlockWithReloadTimer() {
    if (this.syncTabsInterval) {
      clearInterval(this.syncTabsInterval);
    }
    if (this.autoReloadTimer) {
      clearInterval(this.autoReloadTimer);
    }

    const tab: string = localStorage.getItem('tab');
    if (!tab) {
      this.isAppAvailable = true;
      localStorage.setItem('tab', Date.now().toString());
      this.syncTabsInterval = setInterval(() => {
        localStorage.setItem('tab', Date.now().toString());
      }, 1000);
    } else {
      this.isAppAvailable = false;
      this.autoReloadTimer = setInterval(async () => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          window.location.reload();
        }
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('tab');
    clearInterval(this.syncTabsInterval);
    clearInterval(this.autoReloadTimer);
  }

  toggleSidenav() {
    this.isSidenavCollapsed = !this.isSidenavCollapsed;
  }
}
