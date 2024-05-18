/*
 * Author: Vladimir Vysokomornyi
 */

import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async loginAndSucceed(): Promise<void> {
    const appUrl = process.env.APP_URL;
    const username = process.env.PLAYWRIGHT_USERNAME;
    const password = process.env.PLAYWRIGHT_PASSWORD;

    await this.fillCredentials(appUrl, username, password);

    await expect(this.page.getByText('Error code:')).not.toBeVisible();
  }
  async loginWithCredentials(username: string, password: string): Promise<void> {
    const appUrl = process.env.APP_URL;
    await this.fillCredentials(appUrl, username, password);
  }

  private async fillCredentials(appUrl: string, username: string, password: string): Promise<void> {
    await this.page.waitForURL('**/auth/signin');
    expect(this.page.url()).toBe(`${appUrl}/auth/signin`);
    await this.page.waitForSelector('input[id="loginName"]');
    await this.page.waitForSelector('input[id="loginPassword"]');

    await this.page.getByRole('textbox', { name: 'email' }).fill(username);
    await this.page.getByRole('textbox', { name: 'password' }).fill(password);
    await this.page.waitForSelector('button[data-test-id="loginBtn"]');
    await this.page.click('button[data-test-id="loginBtn"]');
  }
}
