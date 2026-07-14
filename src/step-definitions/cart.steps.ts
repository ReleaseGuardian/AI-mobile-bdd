import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';
import { CustomWorld } from '../support/world';
import { ProductListPage } from '../pages/product-list.page';
import { ProductDetailPage } from '../pages/product-detail.page';
import { CartPage } from '../pages/cart.page';

const productListPage = new ProductListPage();
const productDetailPage = new ProductDetailPage();
const cartPage = new CartPage();

When('I open the product {string}', async function (this: CustomWorld, name: string) {
  await productListPage.openProduct(name);
});

When('I add the product to the cart', async function (this: CustomWorld) {
  await productDetailPage.addToCart();
});

When(
  'I add the following products to the cart:',
  async function (this: CustomWorld, table: DataTable) {
    const productNames = table.raw().map((row) => row[0]);
    for (const name of productNames) {
      await productListPage.openProduct(name);
      await productDetailPage.addToCart();
    }
  },
);

Then(
  'the cart should contain {int} item(s)',
  async function (this: CustomWorld, expectedCount: number) {
    await cartPage.open();
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(expectedCount);
  },
);
