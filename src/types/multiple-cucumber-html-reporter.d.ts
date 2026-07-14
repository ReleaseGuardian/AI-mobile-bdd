declare module 'multiple-cucumber-html-reporter' {
  interface GenerateOptions {
    jsonDir: string;
    reportPath: string;
    metadata?: Record<string, unknown>;
    customData?: {
      title: string;
      data: Array<{ label: string; value: string }>;
    };
  }

  export function generate(options: GenerateOptions): void;
}
