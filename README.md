# Mobile BDD Automation Framework

Gherkin + TypeScript + Appium (via WebdriverIO) + BrowserStack App Automate, running the
same feature files and step definitions against both Android and iOS.

Sample app under test: **[BrowserStack's public demo app (BStackSampleApp)](https://github.com/browserstack/mobile-frameworks)**
— a small e-commerce app with login, product search, and cart flows, purpose-built for
App Automate tutorials. Swap it for your own app by changing `ANDROID_APP_PATH` /
`IOS_APP_PATH` / `BROWSERSTACK_ANDROID_APP_ID` / `BROWSERSTACK_IOS_APP_ID` and updating the
locators — no framework code needs to change.

> **Locators note:** the selectors in `src/locators/**` are based on BrowserStack's
> publicly documented sample-app IDs. Third-party app internals can drift between
> versions — before trusting them in CI, open the app in
> [Appium Inspector](https://github.com/appium/appium-inspector) and confirm each
> selector against the exact `.apk`/`.ipa` build you're running.

---

## Stack

| Concern           | Tool                                                                           |
| ----------------- | ------------------------------------------------------------------------------ |
| Language          | TypeScript (strict)                                                            |
| BDD               | Cucumber.js (`@cucumber/cucumber`) via `@wdio/cucumber-framework`              |
| Automation client | Appium, driven through WebdriverIO's Appium service                            |
| Cloud grid        | BrowserStack App Automate (`@wdio/browserstack-service`)                       |
| Local execution   | Android emulator / iOS simulator via local Appium server                       |
| Reporting         | Cucumber JSON → `multiple-cucumber-html-reporter`, plus BrowserStack dashboard |
| Lint/format       | ESLint (flat config) + Prettier                                                |

---

## Folder structure

```
config/                     # everything execution-target/environment/platform related
  environments/              # staging.json, prod.json — timeouts, base URLs, app version
  capabilities/               # android.local / android.browserstack / ios.local / ios.browserstack
  env-loader.ts               # loads config/environments/<TEST_ENV>.json
  wdio.shared.conf.ts         # base WDIO config, common to all runs
  wdio.<platform>.<target>.conf.ts   # deep-merges capabilities/services onto the shared config
  report-generator.ts         # cucumber JSON -> HTML

src/
  features/                   # .feature files (Gherkin)
  step-definitions/           # step implementations, one file per feature + shared common.steps.ts
  pages/                      # Page Object Model, platform-agnostic
  locators/android|ios/       # platform-specific selectors, isolated from step defs and pages
  support/
    world.ts                  # custom Cucumber World (BaseTest / shared scenario context)
    driver-manager.ts          # single point of access to the WDIO-managed driver session
    hooks.ts                   # Before/After/AfterStep — logging, screenshot-on-failure, app reset
  utils/                       # logger, explicit-wait helpers, retry helper

test-data/                   # JSON fixtures (users, products) kept out of feature files/step defs
reports/                     # json/ (raw cucumber output), html/ (generated), logs/
apps/                        # local .apk/.ipa binaries (gitignored)
.github/workflows/           # BrowserStack CI pipeline
```

### How platform independence works

Step definitions and page objects contain **no platform branching**. Each page object
(e.g. `src/pages/login.page.ts`) picks its locator set at runtime via
`this.isIOS ? IOSLoginLocators : AndroidLoginLocators`, where both locator objects expose
the _same keys_ with platform-appropriate selector strategies (accessibility id, iOS
predicate/class-chain, or UiAutomator XPath). A single `.feature` file and step
definition therefore drives both platforms unchanged.

---

## Prerequisites

- Node.js >= 18
- For local runs:
  - **Android:** Android Studio + an AVD emulator, `ANDROID_HOME`/`ANDROID_SDK_ROOT` set
  - **iOS:** Xcode + a simulator (macOS only), `xcrun simctl list` should show devices
  - Appium 2 drivers: `npx appium driver install uiautomator2` and/or
    `npx appium driver install xcuitest`
- For BrowserStack runs: a BrowserStack account with App Automate access

---

## Setup

```bash
git clone <this-repo> && cd mobile-bdd-framework
npm install
cp .env.example .env
# fill in .env — see the comments in that file for what each var does
```

### Getting the sample app

- Android: download `BStackSampleApp.apk` from BrowserStack's App Automate sample-apps
  page and place it at `apps/android/BStackSampleApp.apk`.
- iOS: download `BStackSampleApp.ipa` the same way, place it at `apps/ios/BStackSampleApp.ipa`.
- For BrowserStack runs, upload the same binaries via the REST API (command in
  `.env.example`) and put the returned `bs://<hash>` into `BROWSERSTACK_ANDROID_APP_ID` /
  `BROWSERSTACK_IOS_APP_ID`.

---

## Running the suite

All variables below can also be exported inline instead of edited into `.env`.

| Command                                                                | What it does                                             |
| ---------------------------------------------------------------------- | -------------------------------------------------------- |
| `npm run test:android`                                                 | Android, local emulator, local Appium server             |
| `npm run test:ios`                                                     | iOS, local simulator, local Appium server                |
| `npm run test:android:browserstack`                                    | Android on BrowserStack App Automate                     |
| `npm run test:ios:browserstack`                                        | iOS on BrowserStack App Automate                         |
| `npm run test:staging:android:browserstack`                            | Same, with `TEST_ENV=staging`                            |
| `npm run test:prod:android:browserstack`                               | Same, with `TEST_ENV=prod`                               |
| `npm run test:staging:ios:browserstack` / `test:prod:ios:browserstack` | iOS equivalents                                          |
| `npm run test:local`                                                   | Alias for `test:android`                                 |
| `npm run test:browserstack`                                            | Alias for `test:android:browserstack`                    |
| `npm run report:generate`                                              | Builds `reports/html` from the last run's `reports/json` |

Filter which scenarios run with the `TEST_TAGS` env var (Cucumber tag expression), e.g.:

```bash
TEST_TAGS="@smoke" npm run test:android
TEST_TAGS="@login and not @wip" npm run test:android:browserstack
```

Run more devices/threads in parallel by raising `MAX_INSTANCES` in `.env` and adding more
capability entries to the relevant `config/capabilities/*.ts` file (BrowserStack scales
this automatically per your plan's concurrency limit).

After any run, view the report:

```bash
npm run report:generate
open reports/html/index.html   # or the equivalent on your OS
```

On BrowserStack runs, session recordings/logs/network logs are also visible directly on
the [App Automate dashboard](https://app-automate.browserstack.com/dashboard) —
`buildName`/`sessionName` in `config/capabilities/*.browserstack.ts` control how runs are
grouped there.

---

## Adding a new test

1. **Write the scenario** in a new or existing `.feature` file under `src/features/`,
   reusing existing step phrasing where possible (check `src/step-definitions/*.ts` first
   — steps are meant to be atomic and reusable, not one-off).
2. **Add missing step definitions** in `src/step-definitions/<feature>.steps.ts`. Steps
   should only call page object methods — no raw `$()`/`driver` calls in step files.
3. **Add/extend a page object** in `src/pages/` if the scenario touches a new screen.
   Page objects should only call `BasePage` primitives (`tap`, `setValue`, `getText`,
   `isDisplayed`, `findElements`) plus their own locator lookups — no direct
   `browser`/`driver` access (go through `DriverManager` if you need something `BasePage`
   doesn't expose).
4. **Add matching locators** in both `src/locators/android/<page>.locators.ts` and
   `src/locators/ios/<page>.locators.ts`, using the same key names in both files so the
   page object's `this.isIOS ? ... : ...` selection works.
5. **Verify selectors** with Appium Inspector against the real app build before trusting
   them in CI.
6. Run it: `TEST_TAGS="@yourtag" npm run test:android` (add a tag to your scenario first).

---

## Reliability features

- **No hard sleeps** — all waits go through `src/utils/wait.ts` (`waitForDisplayed`,
  `waitForClickable`, `waitForExist`), which wrap WDIO's built-in polling waits with
  descriptive timeout messages.
- **Retries** — `cucumberOpts.retry` (env: `TEST_RETRY_COUNT`) re-runs a failed scenario
  automatically; `src/utils/retry.ts` is available for wrapping an individual flaky
  action inside a step.
- **Screenshot-on-failure** — `src/support/hooks.ts`'s `AfterStep` hook captures and
  attaches a screenshot to the Cucumber report whenever a step fails.
- **Structured logging** — `src/utils/logger.ts` (Winston) writes to console and
  `reports/logs/test.log` with timestamps and levels; set `LOG_LEVEL` in `.env`.
- **Independent scenarios** — the `After` hook resets app state (`driver.reset()`)
  between scenarios so ordering/state never leaks between tests.
- **Centralized session lifecycle** — the WDIO test runner owns Appium session
  setup/teardown (see `config/wdio.*.conf.ts` + the `appium`/`browserstack` services);
  no test or step ever starts/stops a session itself.

---

## Secrets

`BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY`, and the `BROWSERSTACK_*_APP_ID` values
are read from `.env` (gitignored) locally and from encrypted CI secrets
(`secrets.BROWSERSTACK_USERNAME`, etc. — see `.github/workflows/browserstack.yml`) in CI.
Nothing sensitive is hardcoded in config or test code.

---

## CI

`.github/workflows/browserstack.yml` runs the Android and iOS suites against BrowserStack
in parallel jobs on every push/PR to `main`, plus on manual dispatch with a
`staging`/`prod` choice. It's plain `npm run test:*:browserstack` + artifact upload, so
porting it to another CI system is a matter of translating the job steps — nothing here
is GitHub-Actions-specific beyond the YAML syntax itself.

---

## Linting & formatting

```bash
npm run lint          # ESLint
npm run lint:fix
npm run format         # Prettier, writes changes
npm run format:check
npm run typecheck      # tsc --noEmit, strict mode
```
