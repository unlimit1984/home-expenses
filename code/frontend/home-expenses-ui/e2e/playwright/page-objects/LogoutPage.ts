/*
 * Author: Vladimir Vysokomornyi
 */

import { expect, Locator, Page } from '@playwright/test';

export class LogoutPage {
  readonly page: Page;

  readonly signOut: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signOut = page.getByText('Sign out');
  }

  async logout(): Promise<void> {
    await expect(this.signOut).toBeVisible();
    await this.signOut.click();
    await expect(this.signOut).not.toBeVisible();
  }
}
