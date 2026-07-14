/**
 * Locators for the BStackSampleApp (Android) product catalog screen.
 * Verify with Appium Inspector before relying on these in CI (see login.locators.ts note).
 */
export const AndroidProductListLocators = {
  screenAnchor: '~Product Store',
  searchIcon: '~Search',
  searchInput: '//android.widget.EditText',
  productName: '//android.widget.TextView[@resource-id="com.browserstack.sampleapp:id/productTV"]',
  productByName: (name: string): string => `//android.widget.TextView[@text="${name}"]`,
};
