import fs from 'fs';
import path from 'path';

export interface EnvironmentConfig {
  env: string;
  timeouts: {
    waitForTimeout: number;
    stepTimeout: number;
  };
  apiBaseUrl: string;
  appVersion: string;
}

/**
 * Loads config/environments/<TEST_ENV>.json. TEST_ENV is the single source of truth
 * for which environment a run targets — set it via .env or CI env vars, never hardcode
 * environment values in test/config code.
 */
export function loadEnvironmentConfig(): EnvironmentConfig {
  const envName = process.env.TEST_ENV || 'staging';
  const filePath = path.resolve(__dirname, 'environments', `${envName}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `No environment config found for TEST_ENV="${envName}" at ${filePath}. ` +
        `Add config/environments/${envName}.json or set TEST_ENV to an existing environment.`,
    );
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as EnvironmentConfig;
}
