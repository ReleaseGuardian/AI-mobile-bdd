import { BasePage } from './base.page';
import { AndroidCartLocators } from '../locators/android/cart.locators';
import { IOSCartLocators } from '../locators/ios/cart.locators';

export class CartPage extends BasePage {
  private get locators() {
    return this.isIOS ? IOSCartLocators : AndroidCartLocators;
  }

  async open(): Promise<void> {
    await this.tap(this.locators.cartIcon);
  }

  async getItemCount(): Promise<number> {
    const items = await this.findElements(this.locators.cartItem);
    return items.length;
  }
}
