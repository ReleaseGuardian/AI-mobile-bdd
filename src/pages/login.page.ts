import { BasePage } from './base.page';
import { AndroidLoginLocators } from '../locators/android/login.locators';
import { IOSLoginLocators } from '../locators/ios/login.locators';

export class LoginPage extends BasePage {
  private get locators() {
    return this.isIOS ? IOSLoginLocators : AndroidLoginLocators;
  }

  async open(): Promise<void> {
    await this.waitForPageLoaded(this.locators.loginScreenAnchor);
  }

  /**
   * BStackSampleApp's login screen sometimes ships with credential fields and
   * sometimes as a one-tap demo sign-in, depending on build. Setting values only when
   * the fields are present keeps this step working across both variants without
   * branching in the step definition.
   */
  async login(username: string, password: string): Promise<void> {
    const { usernameInput, passwordInput, loginButton } = this.locators;

    if (await this.isDisplayed(usernameInput, 3000)) {
      await this.setValue(usernameInput, username);
      await this.setValue(passwordInput, password);
    }

    await this.tap(loginButton);
  }

  async isLoggedIn(): Promise<boolean> {
    return this.isDisplayed(this.locators.homeScreenAnchor, 10000);
  }
}
