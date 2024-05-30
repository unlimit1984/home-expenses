/*
 * Author: Vladimir Vysokomornyi
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { LogoutPage } from '../page-objects/LogoutPage';

test.describe('login', () => {
  let appUrl = process.env.APP_URL;

  const trustedApps: string[] = ['https://local.home-expenses.com:8444', 'localhost'];
  if (trustedApps.includes(appUrl)) {
    test.use({ ignoreHTTPSErrors: true });
  }

  test('has env vars', async () => {
    expect(process.env.PLAYWRIGHT_USERNAME).toBeTruthy();
    expect(process.env.PLAYWRIGHT_PASSWORD).toBeTruthy();
    expect(process.env.APP_URL).toBeTruthy();
  });

  test('has correct title', async ({ page }) => {
    await page.goto(appUrl);
    await expect(page).toHaveTitle(/Home Expenses/);
  });

  test('has Login page', async ({ page }) => {
    await page.goto(appUrl);
    await expect(page).toHaveTitle(/Home Expenses/);
    await page.waitForURL('**/auth/signin');
    expect(page.url()).toBe(`${appUrl}/auth/signin`);
    await page.waitForSelector('input[id="loginName"]');
    await page.waitForSelector('input[id="loginPassword"]');
  });

  test('has Unauthorized page if login failed', async ({ page }) => {
    await page.goto(appUrl);

    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('bad-user@mail.com', 'bad-password');

    await page.waitForURL('**/401');
    expect(page.url()).toBe(`${appUrl}/401`);
    await expect(page.getByText('Error code: 401')).toBeVisible();
    await expect(page.getByText('Unauthorized Access')).toBeVisible();
  });

  test('has All Expenses page if login succeed', async ({ page }) => {
    await page.goto(appUrl);

    const loginPage = new LoginPage(page);
    await loginPage.loginAndSucceed();

    await page.waitForURL('**/all-expenses');
    expect(page.url()).toBe(`${appUrl}/all-expenses`);

    const logoutPage = new LogoutPage(page);
    await logoutPage.logout();
  });

  test('has Settings page', async ({ page }) => {
    await page.goto(appUrl);

    const loginPage = new LoginPage(page);
    await loginPage.loginAndSucceed();

    await page.waitForSelector('a[data-test-id="settings-link-desktop"]');
    await page.click('a[data-test-id="settings-link-desktop"]');
    await page.waitForURL('**/settings');

    const logoutPage = new LogoutPage(page);
    await logoutPage.logout();
  });
});
