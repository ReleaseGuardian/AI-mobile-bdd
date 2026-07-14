import { Before, After, AfterStep, Status, type ITestCaseHookParameter } from '@cucumber/cucumber';
import type { TestStepResult } from '@cucumber/messages';
import { CustomWorld } from './world';
import { DriverManager } from './driver-manager';
import { logger } from '../utils/logger';

/**
 * Centralized scenario lifecycle. The Appium/WebdriverIO session itself is created and
 * torn down by the WDIO test runner (see config/wdio.*.conf.ts) — these hooks only handle
 * cross-cutting per-scenario concerns: logging, screenshot-on-failure, and app state reset.
 */

Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  this.scenarioData = {};
  logger.info(`Starting scenario: ${scenario.pickle.name}`);
});

AfterStep(async function (
  this: CustomWorld,
  step: { result?: TestStepResult; pickleStep: { text: string } },
) {
  if (step.result?.status === Status.FAILED) {
    logger.error(`Step failed: ${step.pickleStep.text}`);
    const screenshot = await DriverManager.takeScreenshot();
    await this.attach(screenshot, 'base64:image/png');
  }
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === Status.FAILED) {
    logger.error(`Scenario failed: ${scenario.pickle.name}`);
  } else {
    logger.info(`Scenario passed: ${scenario.pickle.name}`);
  }

  // Reset app state so scenarios stay independent of each other. `mobile: resetApp` is
  // Appium 2's execute-script replacement for the old JSONWP `reset` endpoint. Some
  // drivers/device farms restrict this command, so a failure here must not fail the
  // scenario itself.
  try {
    await DriverManager.driver.execute('mobile: resetApp');
  } catch (err) {
    logger.warn(`App reset skipped: ${(err as Error).message}`);
  }
});
