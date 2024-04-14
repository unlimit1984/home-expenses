/*
 * Author: Vladimir Vysokomornyi
 */

import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test.describe('login', () => {
  test.beforeAll(async () => {
    await chromium.launch({
      ignoreHTTPSErrors: true,
      headless: true
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

  test.skip('Go to Settings', async ({ page }) => {
    await page.goto('https://local.home-expenses.com:8444');

    await page.waitForURL('**/auth/signin');
    await expect(page.url()).toBe('https://local.home-expenses.com:8444/auth/signin');
    await page.waitForSelector('input[id="loginName"]');
    await page.waitForSelector('input[id="loginPassword"]');

    await page.getByRole('textbox', { name: 'email' }).fill('');
    await page.getByRole('textbox', { name: 'password' }).fill('');
    await page.waitForSelector('button[data-test-id="loginBtn"]');
    await page.click('button[data-test-id="loginBtn"]');

    await page.waitForURL('**/all-expenses');
    await expect(page.url()).toBe('https://local.home-expenses.com:8444/all-expenses');

    await page.waitForSelector('a[data-test-id="settings-link-desktop"]');
    await page.click('a[data-test-id="settings-link-desktop"]');
    await page.waitForURL('**/settings');
  });

  test("Print env var",  async({ page }) => {
    console.log('Test');
    console.log('process.env.USERNAME', process.env.USERNAME);
    console.log('process.env.PASSWORD', process.env.PASSWORD);
  });
});
