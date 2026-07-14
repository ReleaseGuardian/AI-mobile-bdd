import { BasePage } from './base.page';
import { AndroidProductListLocators } from '../locators/android/product-list.locators';
import { IOSProductListLocators } from '../locators/ios/product-list.locators';

export class ProductListPage extends BasePage {
  private get locators() {
    return this.isIOS ? IOSProductListLocators : AndroidProductListLocators;
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForPageLoaded(this.locators.screenAnchor);
  }

  async search(term: string): Promise<void> {
    await this.tap(this.locators.searchIcon);
    await this.setValue(this.locators.searchInput, term);
  }

  async getResultNames(): Promise<string[]> {
    const elements = await this.findElements(this.locators.productName);
    return Promise.all(elements.map((element) => element.getText()));
  }

  async hasNoResults(): Promise<boolean> {
    const names = await this.getResultNames();
    return names.length === 0;
  }

  async openProduct(name: string): Promise<void> {
    await this.tap(this.locators.productByName(name));
  }
}
