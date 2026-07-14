/**
 * iOS capabilities for BrowserStack App Automate.
 * `appium:app` expects a `bs://<hash>` id returned by BrowserStack's app-upload REST API
 * (see .env.example for the upload command).
 */
export const iosBrowserstackCapabilities = {
  platformName: 'iOS',
  'appium:app': process.env.BROWSERSTACK_IOS_APP_ID,
  'appium:automationName': 'XCUITest',
  'bstack:options': {
    deviceName: process.env.BROWSERSTACK_IOS_DEVICE || 'iPhone 14',
    osVersion: process.env.BROWSERSTACK_IOS_OS_VERSION || '16',
    projectName: 'Mobile BDD Automation Framework',
    buildName:
      process.env.BROWSERSTACK_BUILD_NAME ||
      `ios-${process.env.TEST_ENV || 'staging'}-${Date.now()}`,
    sessionName: 'iOS Cucumber Suite',
    debug: true,
    networkLogs: true,
    interactiveDebugging: true,
    local: process.env.BROWSERSTACK_LOCAL === 'true',
  },
};
