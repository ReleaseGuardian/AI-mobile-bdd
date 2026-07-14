/**
 * Android capabilities for BrowserStack App Automate.
 * `appium:app` expects a `bs://<hash>` id returned by BrowserStack's app-upload REST API
 * (see .env.example for the upload command). Device/OS/build metadata is env-driven so
 * CI can target different device farms without code changes.
 */
export const androidBrowserstackCapabilities = {
  platformName: 'Android',
  'appium:app': process.env.BROWSERSTACK_ANDROID_APP_ID,
  'appium:automationName': 'UiAutomator2',
  'bstack:options': {
    deviceName: process.env.BROWSERSTACK_ANDROID_DEVICE || 'Google Pixel 7',
    osVersion: process.env.BROWSERSTACK_ANDROID_OS_VERSION || '13.0',
    projectName: 'Mobile BDD Automation Framework',
    buildName:
      process.env.BROWSERSTACK_BUILD_NAME ||
      `android-${process.env.TEST_ENV || 'staging'}-${Date.now()}`,
    sessionName: 'Android Cucumber Suite',
    debug: true,
    networkLogs: true,
    interactiveDebugging: true,
    local: process.env.BROWSERSTACK_LOCAL === 'true',
  },
};
