/*
 * Author: Vladimir Vysokomornyi
 */

import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test.describe('login', () => {
  let username = process.env.PLAYWRIGHT_USERNAME;
  let password = process.env.PLAYWRIGHT_PASSWORD;
  let appUrl = process.env.APP_URL;

  test.beforeAll(async () => {
    await chromium.launch({
      ignoreHTTPSErrors: true
    });
  });
  test.beforeEach(() => {});

  test.skip('has correct title', async ({ page }) => {
    await page.goto('https://local.home-expenses.com:8444');
    await expect(page).toHaveTitle(/Home Expenses/);
  });

  test.skip('redirected to login page', async ({ page }) => {
    await page.goto('https://local.home-expenses.com:8444');

    await page.waitForURL('**/auth/signin');
    await expect(page.url()).toBe('https://local.home-expenses.com:8444/auth/signin');
    await page.waitForSelector('input[id="loginName"]');
    await page.waitForSelector('input[id="loginPassword"]');
  });

  test.skip('redirected to Unauthorized page if login failed', async ({ page }) => {
    await page.goto('https://local.home-expenses.com:8444');

    await page.waitForURL('**/auth/signin');
    await expect(page.url()).toBe('https://local.home-expenses.com:8444/auth/signin');
    await page.waitForSelector('input[id="loginName"]');
    await page.waitForSelector('input[id="loginPassword"]');

    await page.getByRole('textbox', { name: 'email' }).fill('');
    await page.getByRole('textbox', { name: 'password' }).fill('bad-password');
    await page.waitForSelector('button[data-test-id="loginBtn"]');
    await page.click('button[data-test-id="loginBtn"]');

    await page.waitForURL('**/all-expenses1');
    await expect(page.url()).toBe('https://local.home-expenses.com:8444/all-expenses');
  });

  test.skip('redirected to `/all-expenses` after successful login', async ({ page }) => {
    await page.goto('https://local.home-expenses.com:8444');

    await page.waitForURL('**/auth/signin');
    await expect(page.url()).toBe('https://local.home-expenses.com:8444/auth/signin');
    await page.waitForSelector('input[id="loginName"]');
    await page.waitForSelector('input[id="loginPassword"]');

    await page.getByRole('textbox', { name: 'email' }).fill('');
    await page.getByRole('textbox', { name: 'password' }).fill('');
    await page.waitForSelector('button[data-test-id="loginBtn"]');
    await page.click('button[data-test-id="loginBtn"]');

    await page.waitForURL('**/all-expenses1');
    await expect(page.url()).toBe('https://local.home-expenses.com:8444/all-expenses');
  });

  test('Go to Settings', async ({ page }) => {
    if (!appUrl) {
      appUrl = 'https://local.home-expenses.com:8444';
    }
    await page.goto(appUrl);
    // await page.goto('https://local.home-expenses.com:8444');

    await page.waitForURL('**/auth/signin');
    expect(page.url()).toBe(`${appUrl}/auth/signin`);
    await page.waitForSelector('input[id="loginName"]');
    await page.waitForSelector('input[id="loginPassword"]');

    await page.getByRole('textbox', { name: 'email' }).fill(username);
    await page.getByRole('textbox', { name: 'password' }).fill(password);
    await page.waitForSelector('button[data-test-id="loginBtn"]');
    await page.click('button[data-test-id="loginBtn"]');

    await page.waitForURL('**/all-expenses');
    expect(page.url()).toBe(`${appUrl}/all-expenses`);

    await page.waitForSelector('a[data-test-id="settings-link-desktop"]');
    await page.click('a[data-test-id="settings-link-desktop"]');
    await page.waitForURL('**/settings');
  });

  test.skip('Print env var', async ({ page }) => {
    console.log('Print env var');
    console.log('process.env.PLAYWRIGHT_USERNAME', process.env.PLAYWRIGHT_USERNAME);
    console.log('process.env.PLAYWRIGHT_PASSWORD', process.env.PLAYWRIGHT_PASSWORD);
  });
});
