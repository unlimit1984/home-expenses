/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, inject, OnDestroy } from '@angular/core';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  public configService = inject(ConfigService);

  private syncTabsInterval: string | number | NodeJS.Timeout;
  private autoReloadTimer: string | number | NodeJS.Timeout;
  public timeLeft = 3;
  public isAppAvailable = false;

  constructor() {
    if (this.configService.config.featureFlags.multiTabMode) {
      this.removeOldAgeTab();
      this.makeAppCurrentOrBlockWithReloadTimer();
    }
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
}
