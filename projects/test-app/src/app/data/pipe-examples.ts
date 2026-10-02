import { COLLECTIONS_EXAMPLES } from './examples/collections.examples';
import { DATES_EXAMPLES } from './examples/dates.examples';
import { DISPLAY_EXAMPLES } from './examples/display.examples';
import { METRICS_EXAMPLES } from './examples/metrics.examples';
import { NUMBERS_EXAMPLES } from './examples/numbers.examples';
import { OBJECTS_EXAMPLES } from './examples/objects.examples';
import { TEXT_EXAMPLES } from './examples/text.examples';
import type { PipeExample } from './pipe-example.model';

export const PIPE_EXAMPLES = [
  ...COLLECTIONS_EXAMPLES,
  ...DATES_EXAMPLES,
  ...DISPLAY_EXAMPLES,
  ...METRICS_EXAMPLES,
  ...NUMBERS_EXAMPLES,
  ...OBJECTS_EXAMPLES,
  ...TEXT_EXAMPLES,
] as const;
export type PipeSelector = (typeof PIPE_EXAMPLES)[number]['selector'];
export const EXAMPLES_BY_SELECTOR: ReadonlyMap<string, PipeExample> = new Map(
  PIPE_EXAMPLES.map((example) => [example.selector, example]),
);
