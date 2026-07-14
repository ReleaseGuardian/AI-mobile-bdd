import type { Options } from '@wdio/types';
import * as dotenv from 'dotenv';

dotenv.config();

import { loadEnvironmentConfig } from './env-loader';

const envConfig = loadEnvironmentConfig();

/**
 * Base config shared by every platform/target combination. Platform- and target-specific
 * files (wdio.<platform>.<target>.conf.ts) deep-merge their capabilities/services on top
 * of this — keep anything platform-agnostic here so it isn't duplicated four times.
 */
export const sharedConfig: Omit<Options.Testrunner, 'capabilities'> = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },
  specs: ['./src/features/**/*.feature'],
  exclude: [],
  maxInstances: Number(process.env.MAX_INSTANCES) || 1,
  logLevel: (process.env.LOG_LEVEL as Options.Testrunner['logLevel']) || 'info',
  bail: 0,
  waitforTimeout: envConfig.timeouts.waitForTimeout,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 3,
  framework: 'cucumber',
  reporters: ['spec'],
  cucumberOpts: {
    require: ['./src/step-definitions/**/*.ts', './src/support/hooks.ts'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: process.env.TEST_TAGS || '',
    timeout: envConfig.timeouts.stepTimeout,
    ignoreUndefinedDefinitions: false,
    retry: Number(process.env.TEST_RETRY_COUNT) || 0,
    // Standard cucumber-messages JSON, consumed by report:generate (multiple-cucumber-html-reporter)
    format: ['json:./reports/json/cucumber-report.json'],
  },
};
