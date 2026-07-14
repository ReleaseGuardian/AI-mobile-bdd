/**
 * Thin wrapper around the WDIO-injected global `browser`/`driver`. Centralizing access
 * here (rather than referencing the global directly throughout page objects) keeps
 * session/platform lookups in one place and gives us a single point to extend if the
 * framework ever needs to manage multiple concurrent sessions.
 */
export class DriverManager {
  static get driver(): WebdriverIO.Browser {
    return browser;
  }

  static get isAndroid(): boolean {
    return driver.isAndroid;
  }

  static get isIOS(): boolean {
    return driver.isIOS;
  }

  static async takeScreenshot(): Promise<string> {
    return DriverManager.driver.takeScreenshot();
  }
}
