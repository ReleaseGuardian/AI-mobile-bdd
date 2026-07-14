import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';

/**
 * Custom Cucumber World — this is our BaseTest: the shared context every step definition
 * receives as `this`. Use `scenarioData` to pass state between steps within one scenario
 * (e.g. a searched term) instead of module-level variables, which would leak across
 * scenarios running in parallel workers.
 */
export class CustomWorld extends World {
  scenarioData: Record<string, unknown> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
