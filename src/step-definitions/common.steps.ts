import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/login.page';

const loginPage = new LoginPage();

Given('the app has launched', async function (this: CustomWorld) {
  // The Appium session is already started by the WDIO test runner before this hook fires;
  // this step exists as a readable anchor confirming the launch screen is reachable.
  await loginPage.open();
});

Given(
  'I am logged in as {string} with password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await loginPage.open();
    await loginPage.login(username, password);
  },
);
