/**
 * Locators for the BStackSampleApp (iOS) product catalog screen.
 * Verify with Appium Inspector before relying on these in CI (see login.locators.ts note).
 */
export const IOSProductListLocators = {
  screenAnchor: '~Product Store',
  searchIcon: '~Search',
  searchInput: '-ios class chain:**/XCUIElementTypeSearchField',
  productName: '-ios class chain:**/XCUIElementTypeStaticText',
  productByName: (name: string): string =>
    `-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "${name}"`,
};
