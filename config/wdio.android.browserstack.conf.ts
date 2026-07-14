import deepmerge from 'deepmerge';
import type { Options } from '@wdio/types';
import { sharedConfig } from './wdio.shared.conf';
import { androidBrowserstackCapabilities } from './capabilities/android.browserstack';

export const config: Options.Testrunner = deepmerge(sharedConfig, {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: 'hub-cloud.browserstack.com',
  capabilities: [androidBrowserstackCapabilities],
  services: [
    [
      'browserstack',
      {
        browserstackLocal: process.env.BROWSERSTACK_LOCAL === 'true',
        testObservability: true,
      },
    ],
  ],
});
