/**
 * iOS capabilities for local execution against a simulator via a local Appium server.
 * All values are overridable through .env so no device/app detail is hardcoded in test code.
 */
export const iosLocalCapabilities = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 14 Simulator',
  'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '16.0',
  'appium:app': process.env.IOS_APP_PATH || './apps/ios/BStackSampleApp.ipa',
  'appium:newCommandTimeout': 240,
  'appium:noReset': false,
  'appium:autoAcceptAlerts': true,
};
