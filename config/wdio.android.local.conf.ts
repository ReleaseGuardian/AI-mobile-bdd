import deepmerge from 'deepmerge';
import type { Options } from '@wdio/types';
import { sharedConfig } from './wdio.shared.conf';
import { androidLocalCapabilities } from './capabilities/android.local';

export const config: Options.Testrunner = deepmerge(sharedConfig, {
  capabilities: [androidLocalCapabilities],
  services: [
    [
      'appium',
      {
        command: 'appium',
        args: { relaxedSecurity: true },
      },
    ],
  ],
});
