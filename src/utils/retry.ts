import { logger } from './logger';

/**
 * Wraps a flaky async operation (e.g. an action prone to a stale-element race on real
 * devices) with bounded retries. This is for flakiness *within* a step; scenario-level
 * retries are handled separately by cucumberOpts.retry (see config/wdio.shared.conf.ts).
 */
export async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 1000): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      logger.warn(`Attempt ${attempt}/${attempts} failed: ${(err as Error).message}`);
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}
