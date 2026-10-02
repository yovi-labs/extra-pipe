export type PipeCategory =
  'Text' | 'Numbers' | 'Dates' | 'Localization' | 'Collections' | 'Utilities';
export interface PipeDoc {
  readonly selector: string;
  readonly className: string;
  readonly category: PipeCategory;
  readonly description: string;
  readonly example: string;
  readonly output: string;
  readonly contract: string;
  readonly invalid: string;
  readonly locale: string;
  readonly pure: boolean;
  readonly status: 'stable' | 'preview';
  readonly json?: boolean;
  readonly keyValue?: boolean;
}
export interface PlaygroundSample {
  readonly input: unknown;
  readonly parameters: readonly unknown[];
}
export interface PipeExample extends PipeDoc {
  readonly sample: PlaygroundSample;
  readonly parameterNames: readonly string[];
  readonly localeParameterIndex?: number;
  readonly componentContext?: string;
}
