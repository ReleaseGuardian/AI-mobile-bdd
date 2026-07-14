import deepmerge from 'deepmerge';
import type { Options } from '@wdio/types';
import { sharedConfig } from './wdio.shared.conf';
import { iosLocalCapabilities } from './capabilities/ios.local';

export const config: Options.Testrunner = deepmerge(sharedConfig, {
  capabilities: [iosLocalCapabilities],
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
