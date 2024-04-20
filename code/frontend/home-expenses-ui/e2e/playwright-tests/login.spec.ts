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

  test('has correct title', async ({ page }) => {
    await page.goto(appUrl);
    await expect(page).toHaveTitle(/Home Expenses1/);
  });

  test('redirected to login page', async ({ page }) => {
    await page.goto(appUrl);

    await page.waitForURL('**/auth/signin');
    expect(page.url()).toBe(`${appUrl}/auth/signin`);
    await page.waitForSelector('input[id="loginName"]');
    await page.waitForSelector('input[id="loginPassword"]');
  });

  test('redirected to Unauthorized page if login failed', async ({ page }) => {
    await page.goto(appUrl);

    await page.waitForURL('**/auth/signin');
    expect(page.url()).toBe(`${appUrl}/auth/signin`);
    await page.waitForSelector('input[id="loginName"]');
    await page.waitForSelector('input[id="loginPassword"]');

    await page.getByRole('textbox', { name: 'email' }).fill('bad-user@mail.com');
    await page.getByRole('textbox', { name: 'password' }).fill('bad-password');
    await page.waitForSelector('button[data-test-id="loginBtn"]');
    await page.click('button[data-test-id="loginBtn"]');

    await page.waitForURL('**/401');
    expect(page.url()).toBe(`${appUrl}/401`);
  });

  test('redirected to `/all-expenses` after successful login', async ({ page }) => {
    await page.goto(appUrl);

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
  });

  test('Go to Settings', async ({ page }) => {
    await page.goto(appUrl);

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
});
