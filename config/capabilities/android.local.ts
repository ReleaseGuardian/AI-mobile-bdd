/**
 * Android capabilities for local execution against an emulator via a local Appium server.
 * All values are overridable through .env so no device/app detail is hardcoded in test code.
 */
export const androidLocalCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
  'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '13.0',
  'appium:app': process.env.ANDROID_APP_PATH || './apps/android/BStackSampleApp.apk',
  'appium:autoGrantPermissions': true,
  'appium:newCommandTimeout': 240,
  'appium:noReset': false,
};
