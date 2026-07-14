const defaultTimeout = () => Number(process.env.DEFAULT_TIMEOUT) || 15000;

/**
 * Explicit-wait helpers used by BasePage instead of hard sleeps. Every wait carries a
 * descriptive timeoutMsg so failures point at the element/condition, not a generic timeout.
 */
export async function waitForDisplayed(
  element: WebdriverIO.Element,
  timeout: number = defaultTimeout(),
): Promise<void> {
  await element.waitForDisplayed({
    timeout,
    timeoutMsg: `Element was not displayed after ${timeout}ms`,
  });
}

export async function waitForClickable(
  element: WebdriverIO.Element,
  timeout: number = defaultTimeout(),
): Promise<void> {
  await element.waitForClickable({
    timeout,
    timeoutMsg: `Element was not clickable after ${timeout}ms`,
  });
}

export async function waitForExist(
  element: WebdriverIO.Element,
  timeout: number = defaultTimeout(),
): Promise<void> {
  await element.waitForExist({
    timeout,
    timeoutMsg: `Element did not exist after ${timeout}ms`,
  });
}
