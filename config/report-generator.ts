import * as report from 'multiple-cucumber-html-reporter';
import os from 'os';

/**
 * Converts the cucumber-messages JSON produced by cucumberOpts.format into a browsable
 * HTML report. Run via `npm run report:generate` after a test run (locally or in CI).
 */
report.generate({
  jsonDir: './reports/json',
  reportPath: './reports/html',
  metadata: {
    browser: {
      name: 'appium',
      version: '2.x',
    },
    device: process.env.BROWSERSTACK_ANDROID_DEVICE || process.env.ANDROID_DEVICE_NAME || 'N/A',
    platform: {
      name: process.env.PLATFORM || os.platform(),
      version: process.env.PLATFORM_VERSION || os.release(),
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Mobile BDD Automation Framework' },
      { label: 'Environment', value: process.env.TEST_ENV || 'staging' },
      { label: 'Execution Target', value: process.env.EXECUTION_TARGET || 'local' },
    ],
  },
});
