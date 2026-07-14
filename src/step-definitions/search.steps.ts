import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { CustomWorld } from '../support/world';
import { ProductListPage } from '../pages/product-list.page';

const productListPage = new ProductListPage();

Given('I am on the product list screen', async function (this: CustomWorld) {
  await productListPage.waitForLoaded();
});

When('I search for {string}', async function (this: CustomWorld, term: string) {
  await productListPage.search(term);
});

Then(
  'I should see {string} in the product results',
  async function (this: CustomWorld, expected: string) {
    const names = await productListPage.getResultNames();
    expect(names).toContain(expected);
  },
);

Then('no products should be displayed', async function (this: CustomWorld) {
  const noResults = await productListPage.hasNoResults();
  expect(noResults).toBe(true);
});
