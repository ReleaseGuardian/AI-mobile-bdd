import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/login.page';

const loginPage = new LoginPage();

Given('I am on the login screen', async function (this: CustomWorld) {
  await loginPage.open();
});

When(
  'I log in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await loginPage.login(username, password);
  },
);

Then('I should be redirected to the product list screen', async function (this: CustomWorld) {
  const loggedIn = await loginPage.isLoggedIn();
  expect(loggedIn).toBe(true);
});
