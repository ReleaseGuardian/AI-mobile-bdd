import { DriverManager } from '../support/driver-manager';
import { logger } from '../utils/logger';
import { waitForDisplayed, waitForClickable } from '../utils/wait';

/**
 * Shared behavior for every page object: element lookup, explicit waits, and the basic
 * tap/setValue/getText primitives. Platform branching (`isAndroid`/`isIOS`) belongs in
 * subclasses' locator selection, not here — this class stays platform-agnostic.
 */
export abstract class BasePage {
  protected get driver(): WebdriverIO.Browser {
    return DriverManager.driver;
  }

  protected get isAndroid(): boolean {
    return DriverManager.isAndroid;
  }

  protected get isIOS(): boolean {
    return DriverManager.isIOS;
  }

  protected async findElement(selector: string): Promise<WebdriverIO.Element> {
    const element = await this.driver.$(selector);
    await waitForDisplayed(element);
    return element;
  }

  protected async findElements(selector: string): Promise<WebdriverIO.Element[]> {
    return this.driver.$$(selector) as unknown as WebdriverIO.Element[];
  }

  async tap(selector: string): Promise<void> {
    logger.debug(`Tapping element: ${selector}`);
    const element = await this.findElement(selector);
    await waitForClickable(element);
    await element.click();
  }

  async setValue(selector: string, value: string): Promise<void> {
    logger.debug(`Setting value on: ${selector}`);
    const element = await this.findElement(selector);
    await element.setValue(value);
  }

  async getText(selector: string): Promise<string> {
    const element = await this.findElement(selector);
    return element.getText();
  }

  async isDisplayed(selector: string, timeout?: number): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      return await element.waitForDisplayed({ timeout: timeout ?? 5000 });
    } catch {
      return false;
    }
  }

  async waitForPageLoaded(anchorSelector: string): Promise<void> {
    await this.findElement(anchorSelector);
  }
}
