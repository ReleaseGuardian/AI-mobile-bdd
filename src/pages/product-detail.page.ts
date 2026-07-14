import { BasePage } from './base.page';
import { AndroidProductDetailLocators } from '../locators/android/product-detail.locators';
import { IOSProductDetailLocators } from '../locators/ios/product-detail.locators';

export class ProductDetailPage extends BasePage {
  private get locators() {
    return this.isIOS ? IOSProductDetailLocators : AndroidProductDetailLocators;
  }

  async addToCart(): Promise<void> {
    await this.tap(this.locators.addToCartButton);
  }
}
